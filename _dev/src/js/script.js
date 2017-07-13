$(document).ready(function(){

    var headerHeight = $("header").outerHeight();
    var galleryNav = 120;
    var slowAnimation = 200;
    var normalAnimation = 1000;

    // Responsive menu
    $(".nav__toggle").click(function(event){
        event.preventDefault();
        $('.nav__list').toggleClass('nav--open');
    });


    // Gallery
    $(function(){
        $('#Gallery').maximage({
            cssBackgroundSize: false,
            backgroundSize: function($item){
                // Contain portrait but cover landscape
                if ($item.data('h') > $item.data('w')) {
                    if ($.Window.data('w') / $.Window.data('h') < $item.data('ar')) {
                        $item
                            .height(($.Window.data('w') / $item.data('ar')).toFixed(0))
                            .width($.Window.data('w'));
                    } else {
                        $item
                            .height($.Window.data('h'))
                            .width(($.Window.data('h') * $item.data('ar')).toFixed(0));
                    }
                } else {
                    if ($.Window.data('w') / $.Window.data('h') < $item.data('ar')) {
                        $item
                            .height($.Window.data('h'))
                            .width(($.Window.data('h') * $item.data('ar')).toFixed(0));
                    } else {
                        $item
                            .height(($.Window.data('w') / $item.data('ar')).toFixed(0))
                            .width($.Window.data('w'));
                    }
                }
            },
            cycleOptions: {
                fx:'scrollHorz',
                speed: 400,
                timeout: 0,
                prev: '.icon-leftArrow',
                next: '.icon-rightArrow',
                pager: '.gallery__nav ul',
                pagerAnchorBuilder: function(idx, slide) {
                    var imgsrc = $.Slides[idx].url;
                    return '<li><a href="#" rel="nofollow"><img src=' + imgsrc + ' width="50" /></a></li>';
                }
            },
            onFirstImageLoaded: function(){
                $('#Gallery').fadeIn();
            }
        });
    });


    // Show specific elements only at the start of the page
    setTimeout(function() {
        $("header").animate({top: "-" + headerHeight + "px"}, normalAnimation);
    },2000);

    setTimeout(function() {
        $(".gallery__nav").animate({bottom: "-" + galleryNav + "px"}, normalAnimation);
    },2000);


    // Show and hide elements on hover state
    function showAndHide (setHeight,trigger,element,positionBottom,positionTop,topMinus,bottomMinus,startTop,startBottom ){
        $(trigger).mouseenter(function(event){
            event.preventDefault();
            if (setHeight < 0) {
                $(element).stop().animate({
                    top: positionTop,
                    bottom: positionBottom
                },normalAnimation);
            } else {
                $(element).stop().animate({
                    top: positionTop,
                    bottom: 0
                }, normalAnimation);
            }
        }).mouseleave(function(event){
            event.preventDefault();
            $(element).stop().animate({
                top: topMinus + startTop,
                bottom: bottomMinus + startBottom
            }, normalAnimation);
        });
    }

    showAndHide(galleryNav,'.activation__nav','.gallery__nav',120, 'auto',"","-","auto",120);
    showAndHide(headerHeight,'.activation','header','auto', 0, "-", "", 120, "auto");


    // Navigation slider
    $(".gallery__arrow").animate({opacity: 0.1}, slowAnimation);

    // Show Arrows on hover state
    $(".gallery__arrow").hover(function(){
        $(this).animate({opacity: 0.8}, slowAnimation);
    }, function(){
        $(this).animate({opacity: 0.1}, slowAnimation);
    });

    $('.gallery__navArrow').click(function(event){
        event.preventDefault();
        if ($(this).hasClass("icon-navLeftArrow")) {
            movingThumbs(normalAnimation, '+');
        }
        else {
            movingThumbs(normalAnimation, '-');
        }
    });




    // Navigation in the thumbs
    function movingThumbs(speed, direction){
        var currentLeft = $('.gallery__nav ul').position().left;
        var thumbwidth =  $('.gallery__nav ul li').width();
        if (direction == '+' && currentLeft != 0) {
            $('.gallery__nav ul').animate({
                left: '+=' + thumbwidth
            }, speed);
        } else {
            $('.gallery__nav ul').animate({
                left: '+='+direction + thumbwidth
            }, speed);
        }
    }
});