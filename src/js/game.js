(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);



    //  The 'mario' key here is the Loader key given in game.load.tilemap
    var map = this.add.tilemap('sides-map');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('fantasy-tileset', 'tiles');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    var layer = map.createLayer('box-sides-layer');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();


    },

    update: function () {

      //TODO: check time diff!!!!!
      var speed = 0.005;
      if (this.game.input.mousePointer.isDown){
          this.player.scale.x *= 1 + speed;
          this.player.scale.y *= 1 + speed;
      }else{
          this.player.scale.x *= 1 - speed;
          this.player.scale.y *= 1 - speed;
      }
    }

  };

  window['fat-green-pixel'] = window['fat-green-pixel'] || {};
  window['fat-green-pixel'].Game = Game;

}());
