(function() {
  'use strict';

  function GameOver() {
    this.explanationTxt = null;
    this.explanationTxt = null;
    this.startTxt = null;
  }

  GameOver.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'TRY AGAIN' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      var hintY = this.game.height / 4;
      this.explanationTxt = this.add.bitmapText(x, hintY, 'minecraftia', 'TIP: Tap and hold to grow!' );
      this.explanationTxt.align = 'center';
      this.explanationTxt.x = this.game.width / 2 - this.explanationTxt.textWidth / 2;

      y = y + this.explanationTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'You died.');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('level1');
    }
  };

  window['fat-green-pixel'] = window['fat-green-pixel'] || {};
  window['fat-green-pixel'].GameOver = GameOver;

}());
