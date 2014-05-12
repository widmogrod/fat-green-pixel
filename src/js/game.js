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
