(function(undefined) {
    'use strict';

    function GameDebug() {
        this.player = null;
        this.tilemap = null;
        this.layer = null;
        this.scoreText = null;
        this.score = null;
        this.diamonds = null;
        this.polyline = null;
    }

    GameDebug.prototype = {

        init: function() {
            this.position = 0;
        },
        create: function () {
            var x = this.game.width / 2
                , y = this.game.height / 2,
                game = this.game;

            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.backgroundColor = '#787878';

            this.tilemap = this.add.tilemap('level-debug');
            this.tilemap.addTilesetImage('fantasy-tileset', 'tiles');
            this.tilemap.setCollision(9);

            this.layer = this.tilemap.createLayer('box-sides-layer');

            //DEBUG ALL THE THINGS
           this.layer.debug = true;

            this.layer.resizeWorld();

            this.player = this.add.sprite(x, y, 'player');
            this.player.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.gravity.y = -250;

            this.game.camera.follow(this.player);

            // Enable physics on player
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.player.body.collideWorldBounds = true;
            this.player.position.y = this.tilemap.heightInPixels - 100;
            this.game.camera.y =  this.tilemap.heightInPixels - 100;

        },

        update: function () {
            var log = function(type){
                return function(){
                    console.log(type)
                }
            }
            this.game.physics.arcade.collide(this.layer, this.player, log('collide'));

            this.game.physics.arcade.overlap(this.layer, this.player, log('overlap'));

            this.position -= 0.4;
            this.player.body.velocity.y = -200;
            this.player.body.velocity.x = -1;
            this.player.scale.x += 0.01;
            //this.player.body.setSize(150, 50, this.position, 25);
        },

        render: function(){
           //bug in phaser?
           if(this.layer.debug === true){
                this.game.debug.body(this.player, false);
                //this.game.debug.bodyInfo(this.player, 'rgb(55,55,55)');
            }
        }

    };

    window['fat-green-pixel'] = window['fat-green-pixel'] || {};
    window['fat-green-pixel'].GameDebug = GameDebug;

}());
