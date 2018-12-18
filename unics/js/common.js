$(function() {
    contentEffect()
    //Функция переключения меню
    // показ/скрытие меню
    function openMenu() {
        saveScrollTop();
        $('html').addClass('open-menu');
    }

    function closeMenu() {
        $('html').removeClass('open-menu');
        setScrollTop();
    }

    // для модальных окон на мобильных устройствах
    // восстановление значения скролла после закрытия мод.окон
    // запоминаем текущую позицию скролла
    function saveScrollTop() {
        if ($(window).width() * 1 <= 1000) {
            if ($(window).scrollTop() > 0) {
                $('body').attr('data-scrolltop', $(window).scrollTop());
            }
        }
    }
    // установка позиции скролла
    function setScrollTop() {
        if ($(window).width() * 1 <= 1000) {
            if ($('body').attr('data-scrolltop') * 1 > 0) {
                $(window).scrollTop($('body').attr('data-scrolltop'));
            }
        }
    }
    //Переключение моб меню
    $('#menu_button').on('click', function() {
        if ($('html').hasClass('open-menu')) {
            closeMenu();

        } else {
            openMenu();
        }

        return false;
    });

    //Часы
    $('#clock').countdown("2018/12/20", function(event) {
        var totalHours = event.offset.totalDays * 24 + event.offset.hours;
        $(this).html(event.strftime('<div class="item">' + totalHours + '<span>Часов</span></div><div class="divider">:</div><div class="item">%M<span>Минут</span></div><div class="divider">:</div><div class="item">%S<span>Секунд</span></div>'));
    });

    //Переключение FAQ
    if ('.faq'.length) {
        $('.items .item .arrow').on('click', function() {
            var itemBlock = $(this).parent().parent();
            if (itemBlock.hasClass('closed')) {
                itemBlock.removeClass('closed').addClass('opened');
            } else {
                itemBlock.removeClass('opened').addClass('closed');
            }
        });
    }

    //Слайдер партнеры
    if ($('#partner-slider').length) {
        var mySwiper = new Swiper('#partner-slider', {
            // Optional parameters
            loop: false,
            slidesPerView: 4,
            spaceBetween: 20,
            freeMode: false,
            grabCursor: true,
            allowTouchMove: false,
            navigation: {
                nextEl: '#partner-slider .slider-buttons-next',
                prevEl: '#partner-slider .slider-buttons-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                575: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                }

            },
            on: {
                reachEnd: function() {
                    $('#partner-slider .slider-buttons-next').hide();
                    $('#partner-slider .slider-buttons-prev').show();
                },
                reachBeginning: function() {
                    $('#partner-slider .slider-buttons-prev').hide();
                    $('#partner-slider .slider-buttons-next').show();
                }
            }
        })
    }
    //Слайдер дорожной карты
    if ($('#roadmap_slider').length) {
        $(window).on('resize', function() {
            if ($(window).width() <= 575) {
                console.log(1);
                $('#roadmap_slider').removeClass('swiper-container-horizontal').addClass('swiper-container-vertical');
            } else {
                $('#roadmap_slider').removeClass('swiper-container-vertical').addClass('swiper-container-horizontal');
            }
        });


        var roadMapSlider = new Swiper('#roadmap_slider', {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 25,
            observer: true,
            direction: 'horizontal',
            freeMode: false,
            grabCursor: false,
            allowTouchMove: false,
            navigation: {
                nextEl: '#roadmap_slider .slider-buttons-next',
                prevEl: '#roadmap_slider .slider-buttons-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,

                },
                575: {
                    direction: 'vertical',
                    slidesPerView: 3,
                    spaceBetween: 5,
                }

            },


        });


    }
    //Форма в футере
    if ($('#footer_form_2').length) {
        function initFooterForm() {
            var $form = $('#footer_form_2');
            $form.on('change', '.validate', function() {
                validateField($(this));
            });

            var $success = $form.find('.success-form');

            $('#footer_submit').on('click', function() {
                console.log(1);
                if (validateForm($form)) {
                    console.log(2);
                    var data = $form.serialize();
                    $.ajax({
                        url: '#',
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                        success: function(data) {
                            successForm();
                        },
                        error: function(data) {
                            successForm();
                        },
                        timeout: 60000
                    });
                }
                return false;
            });


            function successForm() {
                console.log(3);
                $success.show('fade');

                setTimeout(function() {
                    clearForm($form);
                    $success.hide('fade');
                }, 3000);
            }
        }
        initFooterForm();

    }
    //Форма в контенте
    if ($('#email_form_1').length) {


        function initFeedbackForm() {
            var $form = $('#email_form_1');
            $form.on('change', '.validate', function() {
                validateField($(this));
            });

            var $success = $form.find('.success-form');

            $('#email_submit').on('click', function() {
                if (validateForm($form)) {
                    var data = $form.serialize();
                    $.ajax({
                        url: '#',
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                        success: function(data) {
                            successForm();
                        },
                        error: function(data) {
                            successForm();
                        },
                        timeout: 60000
                    });
                }
                return false;
            });


            function successForm() {
                $success.show('fade');

                setTimeout(function() {
                    clearForm($form);
                    $success.hide('fade');
                }, 3000);
            }
        }
        initFeedbackForm();

    }
    //Функция для плейсхолдера из form.js
    initPlaceholders();

    var timeoutVideo;
    $('.video').on('click', function() {

        clearTimeout(timeoutVideo);
        var youtubeID = $(this).attr('data-youtube');
        var frameHTML = '';
        if (youtubeID != undefined && youtubeID != '') {

            frameHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + youtubeID + '?border=0&showinfo=0&showsearch=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
        }

        if (frameHTML != '') {
            timeoutVideo = setTimeout(function() {
                $('#modal_video_frame').html(frameHTML);
            }, 500);
            $('#modal_video').addClass('show');
            $('html').addClass('show-video');
            saveScrollTop();
        }

        return false;
    });

    $('#close_video').on('click', function() {
        clearTimeout(timeoutVideo);
        $('#modal_video').removeClass('show');
        $('#modal_video_frame').html('');
        $('html').removeClass('show-video');
        setScrollTop();
        return false;
    });


    /*контентные эффекты*/
    function contentEffect() {
        var offset = 100;
        if ($('html').hasClass('touch')) {
            offset = 0;
        }

        //обертка для эффектов
        if ($('.contentEffect').length) {
            $('.contentEffect').viewportChecker({
                classToAdd: 'effectShow',
                offset: offset,
                callbackFunction: function(elem, action) {}
            });
        }
    }


    var margin = 120; // переменная для контроля докрутки
    $(".item[href^='#']").click(function() { // тут пишите условия, для всех ссылок или для конкретных
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - margin + "px" // .top+margin - ставьте минус, если хотите увеличить отступ
        }, {
            duration: 1600, // тут можно контролировать скорость
            easing: "swing"
        });

        if ($(window).width() <= 575) { closeMenu(); }

        return false;
    });

});