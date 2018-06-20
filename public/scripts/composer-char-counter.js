$(document).ready(function () {

    $(".new-tweet textarea[name = 'text']").on("keyup", function () {
        var charRemaining = 140 - $(this).val().length
        console.log(charRemaining);
        var counter = $(this).parent().find('.counter')
        counter.text(charRemaining);

        if (charRemaining < 0) {
            counter.addClass('counterError');
        } else {
            counter.removeClass('counterError');
        }
    });
    

})
