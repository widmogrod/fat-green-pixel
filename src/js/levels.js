(function() {
  'use strict';

  function Levels() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Levels.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Choose Level' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;
      this.titleTxt.y = this.titleTxt.textHeight;

      var levels = 10;
      var levelsInRow = 3;
      var offsetY = this.titleTxt.y + this.titleTxt.textHeight;

      for (var i = 1; i < levels; i++) {

        var level = this.add.bitmapText(x, y, 'minecraftia', ''+i );
        level.align = 'center';
        this.game.width / 2 - level.textWidth / 2;
        var position = this.game.width / levelsInRow - level.textWidth / 2;
        position = position + (position * ((i-1) % levelsInRow ))
        level.x =  position - this.game.width / levelsInRow / 2;
         if((i-1) % levelsInRow  === 0){
          offsetY += level.textHeight;
         }
        level.y = offsetY;
        level.inputEnabled = true;
        level.input.useHandCursor = true;
        level.events.onInputDown.add(this.onDown, this);
     }

      //this.input.onDown.add(this.onDown, this);
      //this.input.onTap.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function (levelText) {

      console.log(levelText);
      this.game.state.start('level'+levelText.text);
    },
    render: function(){
       //this.game.debug.inputInfo(32, 32);
    }
  };

  window['fat-green-pixel'] = window['fat-green-pixel'] || {};
  window['fat-green-pixel'].Levels = Levels;

}());