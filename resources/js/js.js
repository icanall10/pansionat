(function ($) {


    class Page {
        element;
        backgroundPosition;
        textAnimateInterval;
        onPlayComplete;
        onPlayLoaded;

        lottiePlayers = {};
        frameInterval;

        constructor(element) {
            this.element = element;

            this.init();
        }

        async init() {
            this.setBackgroundPosition('right');
            this.go('pay-error');
        }


        isBackgroundPositionLeft() {
            return this.backgroundPosition === 'left';
        }

        toggleBackground() {
            this.isBackgroundPositionLeft() ? this.setBackgroundPosition('right') : this.setBackgroundPosition('left');
        }

        setBackgroundPosition(value) {
            this.backgroundPosition = value;

            this.element.attr('data-background-position', value);
        }

        getPageElements() {
            return this
                .element
                .find('[data-page="' + this.path + '"]');
        }


        textAnimate() {
            if (this.textAnimateInterval !== null) {
                clearInterval(this.textAnimateInterval);
            }

            let $this = this;

            $this.textAnimateItem();

            this.textAnimateInterval = setInterval(function () {
                $this.textAnimateItem();
            }, 80);
        }


        textAnimateItem() {
            let $this = this;

            let items = $this
                .element
                .find('[data-page]')
                .not('[data-page="' + $this.path + '"]')
                .find('[data-text-animate]')
                .filter('.visible');

            if (items.length === 0) {
                items = $this
                    .element
                    .find('[data-page="' + $this.path + '"]')
                    .find('[data-text-animate]')
                    .not('.visible');
            }

            if (items.length === 0) {
                clearInterval($this.textAnimateInterval);
                return;
            }

            let item = items.first();

            item.addClass('animation-enabled');

            if (item.hasClass('visible')) {
                item.removeClass('visible');
                item.addClass('hidden');

                setTimeout(function () {
                    item.removeClass('hidden');
                }, 900);
            } else {
                item.removeClass('hidden');
                item.addClass('visible');
            }
        }


        textAnimateFade() {
            this
                .element
                .find('[data-page]')
                .not('[data-page="' + this.path + '"]')
                .find('[data-text-animate-fade]')
                .addClass('animation-enabled')
                .removeClass('visible');

            this
                .element
                .find('[data-page]')
                .filter('[data-page="' + this.path + '"]')
                .find('[data-text-animate-fade]')
                .addClass('animation-enabled')
                .addClass('visible');
        }


        textAnimateScale() {
            this
                .element
                .find('[data-page]')
                .not('[data-page="' + this.path + '"]')
                .find('[data-text-animate-scale]')
                .addClass('animation-enabled')
                .removeClass('visible');

            this
                .element
                .find('[data-page]')
                .filter('[data-page="' + this.path + '"]')
                .find('[data-text-animate-scale]')
                .addClass('animation-enabled')
                .addClass('visible');
        }


        isPath(path) {
            return this.path === path;
        }

        go(path) {
            let $this = this;

            if ($this.isPath(path)) return;

            let isPathEmpty = ($this.path == null);

            $this.playOut();

            $this.onPlayComplete = function () {
                $this.path = path;
                $this.toggleBackground();
                $this.playIn();
                $this.textAnimate();
                $this.textAnimateFade();
                $this.textAnimateScale();
            };

            if (isPathEmpty) {
                $this.onPlayComplete();
            }
        }


        getLottiePlayer() {
            let $this = this;

            if ($this.path == null) return;

            if ($this.path in $this.lottiePlayers) return $this.lottiePlayers[$this.path];

            let animation = $this.element.find('#animation');

            animation.prepend('<div class="player" data-page="' + $this.path + '"></div>');

            let player = bodymovin.loadAnimation({
                container: animation.find('.player').first()[0],
                renderer: 'svg',
                autoplay: false,
                loop: false,
                path: '/lottie/' + $this.path + '.json'
            });

            player.addEventListener('complete', function () {
                console.log('--complete');

                if ($this.onPlayComplete) {
                    $this.onPlayComplete();
                    $this.onPlayComplete = null;
                }
            });

            player.addEventListener('DOMLoaded', function () {
                if ($this.onPlayLoaded) {
                    $this.onPlayLoaded();
                    $this.onPlayLoaded = null;
                }
            });

            player.loaded = false;

            $this.lottiePlayers[$this.path] = player;

            return player;
        }


        playIn() {
            console.log('--playIn-' + this.path);

            let $this = this;

            if ($this.path == null) return;

            switch ($this.path) {
                case 'qr':
                    $this.onPlayLoaded = function () {
                        console.log('--onPlayLoaded-qr');

                        $this.getLottiePlayer().loaded = true;

                        $this.playSegment(0, 114);

                        $this.onPlayComplete = function () {
                            $this.playSegment(230, 342, true);
                        }
                    };
                    break;

                case 'scan':
                    $this.onPlayLoaded = function () {
                        console.log('--onPlayLoaded-scan');

                        $this.getLottiePlayer().loaded = true;

                        $this.playSegment(0, 100);

                        $this.onPlayComplete = function () {
                            $this.playSegment(100, 300, true);
                        }
                    };
                    break;

                case 'scanned':
                    $this.onPlayLoaded = function () {
                        console.log('--onPlayLoaded-scanned');

                        $this.getLottiePlayer().loaded = true;

                        $this.playSegment(0, 100);
                    };
                    break;

                case 'attach':
                    $this.onPlayLoaded = function () {
                        console.log('--onPlayLoaded-attach');

                        $this.getLottiePlayer().loaded = true;

                        $this.playSegment(0, 30);

                        $this.onPlayComplete = function () {
                            $this.playSegment(30, 220, true);
                        }
                    };
                    break;

                case 'pay-error':
                    $this.onPlayLoaded = function () {
                        console.log('--onPlayLoaded-pay-error');

                        $this.getLottiePlayer().loaded = true;

                        $this.playSegment(0, 40);

                        $this.onPlayComplete = function () {
                            $this.playSegment(40, 220, true);
                        }
                    };
                    break;

                case 'pay-complete':
                    $this.onPlayLoaded = function () {
                        console.log('--onPlayLoaded-pay-complete');

                        $this.getLottiePlayer().loaded = true;

                        $this.playSegment(0, 64);

                        $this.onPlayComplete = function () {
                            $this.playSegment(64, 238, true);
                        }
                    };
                    break;

                case 'not-work':
                    $this.onPlayLoaded = function () {
                        console.log('--onPlayLoaded-pay-not-work');

                        $this.getLottiePlayer().loaded = true;

                        $this.playSegment(0, 40);
                    };
                    break;
            }

            if ($this.onPlayLoaded && $this.getLottiePlayer().loaded) {
                $this.onPlayLoaded();
                $this.onPlayLoaded = null;
            }
        }


        playOut() {
            console.log('--playOut-' + this.path);

            let $this = this;

            if ($this.path == null) return;

            switch ($this.path) {
                case 'qr':
                    $this.playSegment(700, 758);
                    break;

                case 'scan':
                    $this.playSegment(700, 752);
                    break;

                case 'scanned':
                    $this.playSegment(730, 750);
                    break;

                case 'attach':
                    $this.playSegment(722, 756);
                    break;

                case 'pay-error':
                    $this.playSegment(344, 374);
                    break;

                case 'pay-complete':
                    $this.playSegment(348, 370);
                    break;

                case 'not-work':
                    $this.playSegment(725, 750);
                    break;
            }
        }


        playSegment(from, to, loop) {
            loop = loop || false;

            let $this = this;

            clearInterval($this.frameInterval);

            let player = $this.getLottiePlayer();

            player.pause();

            player.goToAndPlay(from, true);

            $this.frameInterval = setInterval(function () {
                // console.log(player.currentFrame);

                if (loop) {
                    if (player.currentFrame < from) {
                        player.setDirection(1);
                    }

                    if (player.currentFrame > to) {
                        player.setDirection(-1);
                    }
                }

                if (!loop && player.currentFrame >= to) {
                    clearInterval($this.frameInterval);

                    player.pause();

                    if ($this.onPlayComplete) {
                        $this.onPlayComplete();
                        $this.onPlayComplete = null;
                    }
                }
            }, 1000 / 30);
        }
    }


    let page = new Page($('#page'));


    $('[data-page-link]')
        .click(function (e) {
            e.preventDefault();

            let path = $(this).attr('data-page-link');

            page.go(path);
        });

})(jQuery);