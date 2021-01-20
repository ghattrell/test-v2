const apiHost = 'http://localhost:4000'; // used for docker
// const apiHost = 'http://bark-recruit-api.local'; // used for vagrant
$(document).ready(function(){

    $('.js-autocomplete-services').autoComplete({
        resolverSettings: {
            url: `${apiHost}/api/services`
        }
    });

    $('.js-autocomplete-location').autoComplete({
        resolverSettings: {
            url: `${apiHost}/api/locations`
        }
    });

    $('.js-submit-lead').submit(function(e) {
        e.preventDefault();

        var data = $(this).serialize();
        $(this).trigger('reset');

        $.post(
            `${apiHost}/api/leads`,
            data,
            function( data ) {
                $('#new-lead-success').modal('show');
            }
        );
        return false;
    });

});
