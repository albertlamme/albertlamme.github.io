$(document).ready(function(){
    $(".nav__toggle").click(function(){
        event.preventDefault();
        $('.nav__list').toggleClass('nav--open');
    });
});
