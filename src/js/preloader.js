(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {

        preload: function () {
            this.asset = this.add.sprite(320, 240, 'preloader');
            this.asset.anchor.setTo(0.5, 0.5);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);
            this.load.image('player', 'assets/player.png');
            this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');


            //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file)
            //  and the tileset/s used to render the map.

            //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

            //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
            //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
            //  the JSON object as the 3rd parameter.

            //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
            //  This could be Phaser.Tilemap.CSV too.

            this.load.tilemap('sides-map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('level-debug', 'assets/level-debug.json', null, Phaser.Tilemap.TILED_JSON);

            //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

            this.load.image('tiles', 'assets/fantasy-tileset.png');

            this.game.load.spritesheet('diamond', 'assets/diamond-sprite.png', 32, 32);


        },

        create: function () {
            this.asset.cropEnabled = false;
        },

        update: function () {
            if (!!this.ready) {
                //this.game.state.start('level1');
                this.game.state.start('menu');
            }
        },

        onLoadComplete: function () {
            this.ready = true;
        }
    };

    window['fat-green-pixel'] = window['fat-green-pixel'] || {};
    window['fat-green-pixel'].Preloader = Preloader;

}());
