(function () {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        preload: function () {
            this.load.image('preloader', 'assets/preloader.gif');
        },

        create: function () {
            this.game.input.addPointer();

            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            } else {
                this.game.scale.setMaximum();
                this.game.scale.setSize();
            }

            this.game.state.start('preloader');
        }
    };

    window['fat-green-pixel'] = window['fat-green-pixel'] || {};
    window['fat-green-pixel'].Boot = Boot;

}());

