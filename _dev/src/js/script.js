$(document).ready(function(){
    $(".nav__toggle").click(function(event){
        event.preventDefault();
        $('.nav__list').toggleClass('nav--open');
    });
});


