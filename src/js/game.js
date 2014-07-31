(function(undefined) {
    'use strict';

    function Game() {
        this.player = null;
        this.tilemap = null;
        this.layer = null;
        this.scoreText = null;
        this.score = null;
    }

    Game.prototype = {

        create: function () {
            var x = this.game.width / 2
                , y = this.game.height / 2;

            this.player = this.add.sprite(x, y, 'player');
            this.player.anchor.setTo(0.5, 0.5);
            this.player.debug = true;
            this.player.scale.x = 4;
            this.player.scale.y = 4;
            this.player.scaleGrowthSpeed = 1.05;
            this.player.scaleShrinkSpeed = 0.98;
            this.player.scaleAcceleration = 1;
            this.player.minScaleToDie = 0.1;
            this.player.movingSpeed = -280;
            this.player.movingAcceleration = 1.0006;

            this.game.camera.follow(this.player);

            // Enable physics on player
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.player.body.collideWorldBounds = true;

            //  The 'mario' key here is the Loader key given in game.load.tilemap
            this.tilemap = this.add.tilemap('sides-map');
            this.tilemap.setCollision([9, 20]);
            this.tilemap.setTileIndexCallback(121, this.onCoinCollision.bind(this));
            this.tilemap.setTileIndexCallback(23, this.onReachTheEnd.bind(this));

            //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
            //  The second parameter maps this name to the Phaser.Cache key 'tiles'
            this.tilemap.addTilesetImage('fantasy-tileset', 'tiles');

            //diamonds based on:
            //EXAMPLE: http://examples.phaser.io/_site/view_full.html?d=tilemaps&f=create+from+objects.js&t=create%20from%20objects
            //this.tilemap.addTilesetImage('diamond');
            //  Here we create our coins group
            this.diamonds = this.add.group();
            this.diamonds.enableBody = true;
            //  And now we convert all of the Tiled objects with an ID of 135 into sprites within the coins group
            this.tilemap.createFromObjects('Picks Layer', 135, 'diamond', 0, true, false, this.diamonds);

            //  Creates a layer from the World1 layer in the map data.
            //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
            this.layer = this.tilemap.createLayer('box-sides-layer');
            //this.layer.debug = true;
            //this.layer.fixedToCamera = true;
            //  This resizes the game world to match the layer dimensions
            this.layer.resizeWorld();

            this.player.position.y = this.tilemap.heightInPixels - 100;
            this.game.camera.y =  this.tilemap.heightInPixels - 100;

            this.score = 0;

            this.scoreText = this.add.bitmapText(0, 0, 'minecraftia', this.scoreTextLabel());
            this.scoreText.align = 'center';
            this.scoreText.fixedToCamera = true;
            this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;
        },

        onCoinCollision: function(player, tile) {
            this.tilemap.removeTile(tile.x, tile.y, 'box-sides-layer');
            this.newPoint();
        },

        newPoint: function(){
            ++this.score;
            this.scoreText.text = this.scoreTextLabel();
        },

        onReachTheEnd: function(player, tile) {
            this.game.state.start('you-win', undefined, undefined, this.score);
        },

        scoreTextLabel: function() {
            return 'Score: ' + this.score;
        },

        update: function () {
            var that = this;
            this.game.physics.arcade.collide(this.player, this.layer, function(player, tile){
                //TODO: buggy probably because of scale on player
                //what about player body?
                that.game.state.start('menu');
            });
            this.game.physics.arcade.overlap(this.player, this.diamonds, function(player, diamond){
                diamond.kill();
                that.newPoint();
             }, null, this);

           this.player.body.velocity.y = this.player.movingSpeed;
           this.player.movingSpeed *= this.player.movingAcceleration;

            //this.game.camera.y -= 2;

            //TODO: scale & velocity vs collistions....
            ///this.player.y = this.game.camera.y + 50;

            //TODO: check time diff!!!!!

            if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown ){
                this.player.scale.x *= this.player.scaleGrowthSpeed;
                this.player.scale.y *= this.player.scaleGrowthSpeed;
            } else {
                this.player.scale.x *= this.player.scaleShrinkSpeed;
                this.player.scale.y *= this.player.scaleShrinkSpeed;
            }
            if(this.player.scale.x < this.player.minScaleToDie){
                this.game.state.start('gameover');
            }
            this.player.scaleGrowthSpeed *= this.player.scaleAcceleration;
            //this.player.scaleShrinkSpeed *= this.player.scaleAcceleration;
        },

        render: function(){
            //this.game.debug.body(this.player);
        }

    };

    window['fat-green-pixel'] = window['fat-green-pixel'] || {};
    window['fat-green-pixel'].Game = Game;

}());
