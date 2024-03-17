// Wait for the document to be ready
$(document).ready(function() {
    // Set to store checked amenities
    const checkedAmenities = new Set();

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        const name = $(this).attr('data-name'); // Assuming data-name is used for Amenity name

        if ($(this).is(':checked')) {
            // If checkbox is checked, add Amenity name to the set
            checkedAmenities.add(name);
        } else {
            // If checkbox is unchecked, remove Amenity name from the set
            checkedAmenities.delete(name);
        }

        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        updateAmenities();
    });

    // Function to update the h4 tag with the list of Amenities checked
    function updateAmenities() {
        const amenityList = Array.from(checkedAmenities).join(', ');

        // Update the h4 tag
        $('DIV.amenities > h4').text(amenityList);
    }
});

