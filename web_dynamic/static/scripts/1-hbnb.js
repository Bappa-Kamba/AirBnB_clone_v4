// Wait for the document to be ready
$(document).ready(function() {
    // Find <input> tage
    const input = $('INPUT');

    // Check if the <input> is found
    if (input.length > 0){
        // Check if checkbox is checked
        input.click(function() {
            if ($(this).is(':checked')) {
                // If checked, add data-id to a list
                $('UL.popover > li > input').each(function() {
                    $(this).prop('checked', true);
                    const id = $(this).attr('data-id');
                    if (id) {
                        const idList = $('DIV.amenities > h4');
                        if (idList.length > 0) {
                            idList.append(' ' + id);
                        } else {
                            $('DIV.amenities').append('<h4></h4>').append(id);
                        }
                    }
                });
            } else {
                // If unchecked, remove data-id from a list
                $('UL.popover > li > input').each(function() {
                    $(this).prop('checked', false);
                    const id = $(this).attr('data-id');
                    if (id) {
                        const idList = $('DIV.amenities > h4');
                        if (idList.length > 0) {
                            idList.remove(id);
                        }
                    }
                });
            }
        });
    }

});