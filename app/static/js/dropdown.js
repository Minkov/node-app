$(function () {
    $('.has-dropdown .toggle').click(function (ev) {
        console.log(' --- Clicked --- ');
        $(this).next('.dropdown').toggleClass('hidden');
        
        ev.preventDefault();
        return false;
    });
}());