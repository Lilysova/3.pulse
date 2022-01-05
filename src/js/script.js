$(document).ready(function(){
    $('.carousel__inner').slick({
            speed: 1000,
            adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_solid.png"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="icons/right_solid.png"></button>',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        dots: true
                      }
                }
            ]
        });
//табы для перелистывания контента с товаром
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
             .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
             .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
     });
//перелисывание подробнее/назад 
     function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
//модальные окна показываем скрытые
$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
});
//скрываем принажатии на крестик
$('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

});
//при нажатии на кнопку показывается  определенный выбранный товар
$('.button_mini').each(function(i){
    $(this).on('click',function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    });
//валидация через файл jqueryvalidate.min.js

function valideForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Введите {0} символа!")
              },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
        }
    });   
};
valideForms ('#consultation-form');
valideForms ('#consultation form');
valideForms ('#order form');

//маска валидации 
$('input[name=phone]').mask("+38 (999) 999-99-99");

//mailer отправка форм 
$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;//отправка формы и возврат в состояние
 });

 //скрол страницы 
 $(window).scroll(function() {
 if ($(this).scrollTop() > 1600) {
     $('.pageup').fadeIn();
  } else {
     $('.pageup').fadeOut();
  }
 });
 //прокрутка плавная по сайту 
 $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
 });
 
 new WOW().init();
});
