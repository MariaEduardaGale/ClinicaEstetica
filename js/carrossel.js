/* Javascript utilizando Jquery*/

$(document).ready(function(){
    $('.carrossel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    infinite: true,
    speed: 1500,
    autoplayspeed: 300,
    dots: true,

    })
});

