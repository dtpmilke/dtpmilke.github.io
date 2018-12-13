$(function() {

    $('#clock').countdown("2018/12/18", function(event) {
        var totalHours = event.offset.totalDays * 24 + event.offset.hours;
        $(this).html(event.strftime('<div class="item">' + totalHours + '<span>Часов</span></div><div class="divider">:</div><div class="item">%M<span>Минут</span></div><div class="divider">:</div><div class="item">%S<span>Секунд</span></div>'));
    });

    if ($('#partner-slider').length) {
        var mySwiper = new Swiper('#partner-slider', {
            // Optional parameters
            loop: false,
            slidesPerView: 4,
            spaceBetween: 20,
            freeMode: false,
            grabCursor: true,
            allowTouchMove:false,
            navigation: {
                nextEl: '#partner-slider .slider-buttons-next',
                prevEl: '#partner-slider .slider-buttons-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,
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

     if ($('#roadmap_slider').length) {
        var roadMapSlider = new Swiper('#roadmap_slider', {
            // Optional parameters
            loop: false,
            slidesPerView: 4,
            spaceBetween: 25,
            freeMode: false,
            grabCursor: false,
            allowTouchMove:false,
            navigation: {
                nextEl: '#roadmap_slider .slider-buttons-next',
                prevEl: '#roadmap_slider .slider-buttons-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                }

            },
            // on: {
            //     reachEnd: function() {
            //         $('.slider-buttons-next').hide();
            //         $('.slider-buttons-prev').show();
            //     },
            //     reachBeginning: function() {
            //         $('.slider-buttons-prev').hide();
            //         $('.slider-buttons-next').show();
            //     }
            // }
        })
    }





});