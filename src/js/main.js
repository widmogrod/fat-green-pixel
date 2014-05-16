window.onload = function () {
  'use strict';

  var game
    , ns = window['fat-green-pixel'];

  game = new Phaser.Game(640, 800, Phaser.AUTO, 'fat-green-pixel-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  game.state.add('gameover', ns.GameOver);

  game.state.start('boot');
  this.game = game;
};
