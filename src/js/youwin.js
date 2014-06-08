(function() {
  'use strict';

  function YouWin() {
    this.explanationTxt = null;
    this.explanationTxt = null;
    this.startTxt = null;
    this.score = 0;
    this.bestScore = 0;
    this.beatScore = false;
  }

  YouWin.prototype = {
    init: function(score) {
        this.score = score;
        this.beatScore = false;
        if (score > this.bestScore) {
            this.beatScore = true;
            this.bestScore = score;
        }
    },
    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'YOUR BEST SCORE: ' + this.bestScore);
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      var hintY = this.game.height / 4;
      this.explanationTxt = this.add.bitmapText(x, hintY, 'minecraftia', 'Tap to beat you record!' );
      this.explanationTxt.align = 'center';
      this.explanationTxt.x = this.game.width / 2 - this.explanationTxt.textWidth / 2;

      if (this.beatScore) {
          this.explanationTxt.text = 'You beat your record!!';
          this.explanationTxt.tint = 0xff33cc;
      } else {
          this.explanationTxt.text = 'You neet to try harder\nColected: ' + this.score;
      }

      y = y + this.explanationTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'You win');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['fat-green-pixel'] = window['fat-green-pixel'] || {};
  window['fat-green-pixel'].YouWin = YouWin;

}());

