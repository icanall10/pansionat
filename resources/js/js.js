(function ($) {

    function behaviors() {

        $('.slider-block .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                dots: true,
                margin: 30,
                navText: [
                    '<div class="i i-arrow"></div>',
                    '<div class="i i-arrow"></div>'
                ],
                responsive: {
                    0: {
                        nav: false,
                    },
                    960: {
                        nav: false,
                    },
                    1400: {
                        nav: true,
                    }
                }
            });


        $('.services-block .owl-carousel')
            .once()
            .owlCarousel({
                margin: 30,
                navText: [
                    '<div class="i i-arrow-bold"></div>',
                    '<div class="i i-arrow-bold"></div>'
                ],
                responsive: {
                    0: {
                        items: 1,
                        dots: true,
                        nav: false,
                    },
                    500: {
                        items: 2,
                        dots: true,
                        nav: false,
                    },
                    768: {
                        items: 3,
                        dots: true,
                        nav: false,
                    },
                    1280: {
                        items: 4,
                        dots: false,
                        nav: true,
                    },
                    1366: {
                        items: 5,
                        dots: false,
                        nav: true,
                    }
                }
            });


        $('[data-contact-form-rules-confirm]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('[data-modal]')
                    .dialog('close');

                $('input[name="rules"]').prop('checked', true);
            });


        $('[data-contact-form-rules-cancel]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('[data-modal]')
                    .dialog('close');

                $('input[name="rules"]').prop('checked', false);
            });


        $('.tabs-block .toggle a')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('ul')
                    .toggleClass('open');
            });


        $('[data-selectbox]')
            .once('selectbox')
            .on('updateSelected', function () {
                let $this = $(this);

                let names = [];

                $this.find('input[type="checkbox"]:checked + label').each(function () {
                    names.push(
                        $(this).text()
                    );
                });

                $this
                    .find('[data-selectbox-value]')
                    .html(names.join(', ') || 'Все');
            })
            .on('updateValues', function () {
                let $this = $(this);
                let values = ($this.attr('data-values') || '').split(',');

                values.forEach(function (value) {
                    $this
                        .find('input[type="checkbox"][value="' + value + '"]')
                        .prop('checked', true);
                });
            })
            .trigger('updateValues')
            .trigger('updateSelected');


        $('[data-selectbox] input[type="checkbox"]')
            .once('selectbox-checkbox')
            .change(function () {
                $(this)
                    .closest('[data-selectbox]')
                    .trigger('updateSelected');
            });


        $('[data-selectbox-selected]')
            .once('selectbox-selected')
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('[data-selectbox]')
                    .toggleClass('open');
            });


        $('input[data-daterangepicker]')
            .once()
            .daterangepicker({
                "autoApply": true,
                "opens": "left",
                "locale": {
                    "format": "MM.DD.YYYY",
                    "separator": " - ",
                    "daysOfWeek": [
                        "Вс",
                        "Пн",
                        "Вт",
                        "Ср",
                        "Чт",
                        "Пт",
                        "Сб"
                    ],
                    "monthNames": [
                        "Январь",
                        "Февраль",
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь"
                    ],
                    "firstDay": 1
                },
                "startDate": new Date(),
                "endDate": new Date().addDays(7)
            });


        $('.schedule-list .owl-carousel')
            .once(function () {
                let $this = $(this);
                let date = formatDate(new Date());
                let index = $this.find('.item[data-date="' + date + '"]').index() || 0;

                $this.owlCarousel({
                    dots: false,
                    nav: true,
                    margin: 1,
                    responsive: {
                        0: {
                            items: 2,
                            startPosition: index
                        },
                        500: {
                            items: 3,
                            startPosition: index
                        },
                        700: {
                            items: 4,
                            startPosition: index
                        },
                        900: {
                            items: 5,
                            startPosition: index
                        },
                        1200: {
                            items: 7,
                        }
                    }
                });
            });


        $('[data-map]')
            .once(function () {
                let $this = $(this);

                $.getScript('https://api-maps.yandex.ru/2.1.79?lang=ru_RU&apikey=4690a633-05cf-41e7-a869-27ee1e695319', function () {
                    ymaps.ready(function () {
                        let markers = $this.find('.marker');
                        let placemark = null;

                        let center = [
                            $this.data('latitude'),
                            $this.data('longitude')
                        ];
                        let hint = $this.data('hint') ? $this.data('hint') : '';
                        let zoom = $this.data('zoom') ? $this.data('zoom') : 14;

                        let map = new ymaps.Map(
                            $this[0],
                            {
                                center: center,
                                zoom: zoom
                            },
                            {
                                suppressMapOpenBlock: true
                            }
                        );

                        map.behaviors.disable('scrollZoom');

                        if (markers.length > 0) {
                            markers.each(function () {
                                let marker = $(this);

                                placemark = new ymaps.Placemark(
                                    [
                                        marker.data('latitude'), marker.data('longitude')
                                    ],
                                    {
                                        iconCaption: marker.data('hint') || ''
                                    },
                                    {
                                        preset: 'islands#greenDotIconWithCaption',
                                        iconColor: '#87A756'
                                    }
                                );

                                markers.remove();

                                map.geoObjects.add(placemark);
                            });
                        } else {
                            placemark = new ymaps.Placemark(
                                center,
                                {
                                    iconCaption: hint
                                },
                                {
                                    preset: 'islands#greenDotIconWithCaption',
                                    iconColor: '#87A756'
                                }
                            );

                            map.geoObjects.add(placemark);
                        }
                    });
                });
            });


        $('.slider-block-2 .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                responsive: {
                    0: {
                        nav: false,
                        dots: true,
                    },
                    960: {
                        nav: false,
                        dots: true,
                    },
                    1400: {
                        nav: true,
                        dots: false,
                    }
                }
            });


        $('.employees-list.owl-carousel')
            .once()
            .owlCarousel({
                margin: 30,
                navText: [
                    '<div class="i i-arrow-bold"></div>',
                    '<div class="i i-arrow-bold"></div>'
                ],
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        dots: true,
                    },
                    481: {
                        items: 2,
                        nav: false,
                        dots: true,

                    },
                    768: {
                        items: 3,
                        nav: false,
                        dots: true,
                    },
                    1000: {
                        items: 4,
                        nav: true,
                        dots: false,
                    }
                }
            });


        $('.employees-block .employees-list:not(.owl-carousel)')
            .once('mobile-owl-carousel', function () {
                if (!is_mobile()) return;

                $(this)
                    .addClass('owl-carousel')
                    .owlCarousel({
                        margin: 30,
                        navText: [
                            '<div class="i i-arrow-bold"></div>',
                            '<div class="i i-arrow-bold"></div>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                nav: false,
                                dots: true,
                            },
                            481: {
                                items: 2,
                                nav: false,
                                dots: true,

                            },
                            768: {
                                items: 3,
                                nav: false,
                                dots: true,
                            },
                            1000: {
                                items: 4,
                                nav: true,
                                dots: false,
                            }
                        }
                    });
            });


        $('.menu-link')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('.header-block')
                    .toggleClass('menu-open');
            });


        $('.links-block .items')
            .once(function () {
                if (!is_mobile()) {
                    return;
                }

                $(this)
                    .addClass('owl-carousel')
                    .owlCarousel({
                        nav: false,
                        dots: true,
                        margin: 20,
                        responsive: {
                            0: {
                                items: 2,
                            },
                            500: {
                                items: 3,
                            },
                            700: {
                                items: 4,
                            },
                            800: {
                                items: 5,
                            }
                        }
                    })
            });


        $('.news-block .items')
            .once(function () {
                if (!is_mobile()) {
                    return;
                }

                $(this)
                    .addClass('owl-carousel')
                    .owlCarousel({
                        nav: false,
                        dots: true,
                        margin: 30,
                        responsive: {
                            0: {
                                items: 1,
                            },
                            600: {
                                items: 2,
                            }
                        }
                    })
            });


        $('.gallery-block .items')
            .once(function () {
                if (!is_mobile()) {
                    return;
                }

                $(this)
                    .addClass('owl-carousel')
                    .owlCarousel({
                        nav: false,
                        dots: true,
                        margin: 8,
                        responsive: {
                            0: {
                                items: 1,
                            },
                            400: {
                                items: 2,
                            },
                            768: {
                                items: 3,
                            },
                            1000: {
                                items: 4,
                            }
                        }
                    })
            });


        $('.header-block .menu li.has-dropdown > a')
            .once()
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let li = $this.closest('li');

                li.toggleClass('open');

                $this
                    .closest('.menu')
                    .find('li')
                    .not(li)
                    .removeClass('open');
            });


        $('.sidebar-menu-block .block-title')
            .once()
            .click(function () {
                $(this)
                    .closest('.sidebar-menu-block')
                    .toggleClass('open');
            });

    }

    Date.prototype.addDays = function (dias) {
        let date = new Date(this.valueOf());

        date.setDate(parseInt(date.getDate()) + parseInt(dias));

        return date;
    };

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('.');
    }


    $(document).click(function (event) {
        let selectors = '[data-selectbox]';

        let $target = $(event.target);

        if (!$target.closest(selectors).length && $(selectors).is(":visible")) {
            $(selectors).removeClass('open');
        }
    });


    $(document).click(function (event) {
        let selectors = '.header-block';

        let $target = $(event.target);

        if (!$target.closest(selectors).length && $(selectors).is(":visible")) {
            $(selectors).removeClass('menu-open');
        }
    });


    $(document).click(function (event) {
        let selectors = '.header-block .menu li.has-dropdown';

        let $target = $(event.target);

        if (!$target.closest(selectors).length && $(selectors).is(":visible")) {
            $(selectors)
                .closest('li')
                .removeClass('open');
        }
    });


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);