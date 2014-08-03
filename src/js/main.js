window.onload = function () {
  'use strict';

  var game
    , ns = window['fat-green-pixel']
    , ratio = window.devicePixelRatio || 1
    , width = window.innerWidth * ratio
    , height = window.innerHeight * ratio;

  // Ensure that if we play on desktop our canvas has resonable size
  if (width > 640) {
      width = 640;
      height = 800;
  }

  game = new Phaser.Game(width, height, Phaser.AUTO, 'fat-green-pixel-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('levels', ns.Levels);
  game.state.add('menu', ns.Menu);
  game.state.add('level1', ns.Level1);
  game.state.add('level2', ns.Level2);
  game.state.add('level9', ns.GameDebug);
  game.state.add('gameover', ns.GameOver);
  game.state.add('you-win', ns.YouWin);

  game.state.start('boot');
};
