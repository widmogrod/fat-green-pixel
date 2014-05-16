(function () {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        preload: function () {
            this.load.image('preloader', 'assets/preloader.gif');
        },

        create: function () {
            // this.game.input.maxPointers = 1;
            this.game.input.addPointer();
            //

            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            } else {
                // this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                // this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
                // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                // this.game.scale.minWidth =  480;
                // this.game.scale.minHeight = 260;
                // this.game.scale.maxWidth = 640;
                // this.game.scale.maxHeight = 480;
                // this.game.scale.setMaximum();
                // this.game.scale.setShowAll();
                // this.game.scale.setScreenSize();
                // this.game.scale.refresh();
            }
            this.game.state.start('preloader');
        }
    };

    window['fat-green-pixel'] = window['fat-green-pixel'] || {};
    window['fat-green-pixel'].Boot = Boot;

}());

