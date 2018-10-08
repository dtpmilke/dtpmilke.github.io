$(function() {
    $('.burger').on('click', function() {
        $(this).toggleClass('active');
        $('.mobile-nav').toggleClass('active');
        $('body').toggleClass('fixed');
        $('html').toggleClass('fixed');
    });

    $('input[type="tel"]').mask("+7 (999) 999 99 99");

    $('input[type="tel"]').focusin(function() {
        $('.placeholder').addClass('focus');

    }).focusout(function() {

        var $this = $(this),
            val = $this.val();

        if (val.length <= 1) {
            $('.placeholder').removeClass('focus');
        }

    });




    $('.feedback-btn').on('click', function() {
        $('.feedback-modal').fadeIn('fast');
        $('body').toggleClass('fixed');
        $('html').toggleClass('fixed');
        return false;
    });

    $('.feedback-modal .exit, button.close').on('click', function() {
        $('.feedback-modal').fadeOut('fast');
        $('body').toggleClass('fixed');
        $('html').toggleClass('fixed');
        return false;
    });





    if ($('#callback').length) {

        var $this = $('.input-field');


        function initCallbackForm() {
            var $form = $('#callback');
            var url = $form.attr('action');
            var data = $form.serialize();

            $form.on('change', '.validate', function() {
                validateField($(this));
            });

            var $success = $form.find('.success-form');

            $('#callback button').on('click', function() {
                if (validateForm($form)) {
                    var phone = $('#callback').find('input[name="phone"]').val();
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                        timeout: 60000,
                        success: function(res) {
                            successForm();
                        },
                        error: function() {

                            setTimeout(function() {
                                 successForm();
                                clearForm($form);

                                $('.placeholder').removeClass('focus');
                            }, 1000);
                        }
                    });
                }
                return false;
            });

            function successForm() {
                $success.fadeIn('fast');

                setTimeout(function() {
                    clearForm($form);

                        $('.placeholder').removeClass('focus');
                    
                    // $success.fadeOut('fast');
                    // $('.feedback-modal').fadeOut('fast');
                }, 3000);
            }

        }
        initCallbackForm();

    }



     /*слайдер галереи*/
    if ($('.gallery-wrap').length) {

        $('.gallery-wrap').each(function(i){

            var $slider, $previewSlider;
            var $this = $(this);


            $this.find('.our-works-image').each(function(i){

                $(this).attr('data-slide', i);
            });

            $this.find('.our-works-image').on('click', function() {
                $('body').toggleClass('fixed');
                $('html').toggleClass('fixed');
                var thisImage = $(this);
                var initialSlide = thisImage.attr('data-slide')*1;

                $('#modal_main_slider2 .slider, #modal_preview_slider2 .slider').html('');

                var slidesHTML = '<div class="swiper-wrapper">';
                // var description;

                $this.find('.our-works-image').each(function(i) {

                    var activeClass = '';

                    if (i == initialSlide){
                        activeClass = 'active';
                    }

                   // var description = $(this).find('.description').text();

                    

                    slidesHTML += '<div class="swiper-slide"><div class="photo '+activeClass+'" data-slide="'+i+'" style="background-image: url('+$(this).attr('data-photo')+');"></div></div>';

                });

                slidesHTML += '</div>';


                $('#modal_main_slider2 .slider').html(slidesHTML);

                initModalGallery(initialSlide);



                
                function initModalGallery(initialSlide) {

                    var count = ($('.main-slider2').find('.swiper-slide').length*1);
                    $('.modal-gallery2').find('.count').html(count);

                    $('.modal-gallery2').find('.active-num').html(initialSlide+1);



                    $slider = new Swiper('#modal_main_slider2 .slider', {
                        slidesPerView: 1,
                        loop: true,
                        grabCursor: true,
                        initialSlide: initialSlide,
                        onSlideChangeStart: function(slider) {
                            changeSlide(slider.activeLoopIndex);
                            var activeNum = $('.main-slider2').find('.swiper-slide-active .photo').attr('data-slide');
                            $('.modal-gallery2').find('.active-num').html(parseInt(activeNum)+1);
                        }

                    });

                    

                    function changeSlide(slide) {

                        $previewSlider.swipeTo(slide);
                        $('#modal_preview_slider2 .photo').removeClass('active');
                        $('#modal_preview_slider2 .photo[data-slide="'+slide+'"]').addClass('active');
                    }

                    $('#modal_gallery2').addClass('show');

                    
                    


                }


            });

            $('#modal_gallery2 .close-gallery2').on('click', function(){
                $('#modal_gallery2').removeClass('show');
                $('body').toggleClass('fixed');
                $('html').toggleClass('fixed');
                return false;
            });
        });


}
/*END слайдер галереи*/


});

$(document).ready(function() {
    $('.review-slider').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 100,
        swipeToSlide: true,
        edgeFriction: 0.3,
        nextArrow: '<div class="slick-next"><i class="icon icon-arrow"></i></div>',
        prevArrow: '<div class="slick-prev"><i class="icon icon-arrow-left"></i></div>',
        infinite: false
    });

    ymaps.ready(init);

    function init() {
        // Создание карты.    
        var myMap = new ymaps.Map("map", {
            center: [53.211740, 50.210847],
            zoom: 16,
            controls: []
        });

        var myPlacemark = new ymaps.Placemark([53.211721, 50.214088], {
            balloonContent: 'Самарский Водопроводчик',
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/img/plumber.svg',
            iconImageSize: [44, 44]

        });

        myMap.geoObjects.add(myPlacemark);
    }
});
