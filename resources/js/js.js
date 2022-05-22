(function ($) {

    function behaviors() {

        $('.slider-block .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                nav: true,
                dots: true,
                margin: 30,
                navText: [
                    '<div class="i i-arrow"></div>',
                    '<div class="i i-arrow"></div>'
                ]
            });


        $('.services-block .owl-carousel')
            .once()
            .owlCarousel({
                items: 5,
                nav: true,
                dots: false,
                margin: 30,
                navText: [
                    '<div class="i i-arrow-bold"></div>',
                    '<div class="i i-arrow-bold"></div>'
                ]
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
            .once()
            .owlCarousel({
                items: 7,
                dots: false,
                nav: true,
                margin: 1
            });


        $('[data-map]')
            .once(function () {
                let $this = $(this);

                $.getScript('https://api-maps.yandex.ru/2.1.79?lang=ru_RU&apikey=4690a633-05cf-41e7-a869-27ee1e695319', function () {
                    ymaps.ready(function () {
                        let coords = [
                            $this.data('latitude'),
                            $this.data('longitude')
                        ];
                        let hint = $this.data('hint') ? $this.data('hint') : '';
                        let zoom = $this.data('zoom') ? $this.data('zoom') : 14;

                        console.log(coords);

                        let map = new ymaps.Map(
                            $this[0],
                            {
                                center: coords,
                                zoom: zoom
                            },
                            {
                                suppressMapOpenBlock: true
                            }
                        );

                        map.behaviors.disable('scrollZoom');

                        let placemark = new ymaps.Placemark(coords, {
                            iconCaption: hint
                        }, {
                            preset: 'islands#greenDotIconWithCaption',
                            iconColor: '#87A756'
                        });

                        map.geoObjects.add(placemark)
                    });
                });
            });


        $('.slider-block-2 .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                dots: false,
                nav: true
            });


        $('.employees-list.owl-carousel')
            .once()
            .owlCarousel({
                items: 5,
                nav: true,
                dots: false,
                margin: 30,
                navText: [
                    '<div class="i i-arrow-bold"></div>',
                    '<div class="i i-arrow-bold"></div>'
                ]
            });


    }

    Date.prototype.addDays = function (dias) {

        var date = new Date(this.valueOf());
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


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);