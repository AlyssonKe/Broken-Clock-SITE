$(function() {
    $(".menu-button").on( "click", function() {
        alert( "Handler for `click` called." );
        $(".header .menu").toggleClass("active");
        $(".menu-button li").toggleClass("active");
    });
});

$(function() {
    $(".test").on( "click", function() {
        alert( "Handler for `click` called." );
        $(".header .menu").toggleClass("active");
        $(".menu-button li").toggleClass("active");
    });
});