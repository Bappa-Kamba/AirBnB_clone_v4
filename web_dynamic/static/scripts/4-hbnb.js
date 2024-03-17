$(document).ready(function () {
  const apiUrl = 'http://localhost:5001/api/v1/places_search/';
  const usersUrl = 'http://localhost:5001/api/v1/users/';
  const placesSection = $('section.places');
  const checkedAmenities = new Set();
  const checkedAmenitiesIds = new Set();
  const userDate = "";

  // Function to create an article tag representing a Place
  function createPlaceArticle(place, userData) {
    const article = $('<article></article>').html(`<div class="title_box">
                                                     <h2>${place.name}</h2>
                                                     <div class="price_by_night">$${place.price_by_night}</div>
                                                   </div>
                                                   <div class="information">
                                                     <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                                     <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                                     <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                                   </div>
                                                   <div class="user">
                                                     <strong>Owner:</strong> ${userData.first_name} ${userData.last_name}
                                                   </div>
                                                   <div class="description">${place.description}</div>`);
    placesSection.append(article);
  }

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');

    if ($(this).is(':checked')) {
      checkedAmenities.add(name);
      checkedAmenitiesIds.add(id);
    } else {
      checkedAmenities.delete(name);
      checkedAmenitiesIds.delete(id);
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

  // Find the search button
  $("button").click(function () {
    const amenityList = Array.from(checkedAmenitiesIds);

    // Make a POST request to places_search with the list of checked amenities
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: apiUrl,
      data: JSON.stringify({ amenities: amenityList }),
      success: function (response) {
		placesSection.empty();
		for (const place of response) {
        	createPlaceArticle(place, userData);
		}
		console.log('Finished filtering ...');
      },
      error: function (error) {
        console.error('Error making amenities POST request:', error);
      }
    });
  });

  // Make a POST request to get places data
  $.ajax({
    type: 'POST',
    url: apiUrl,
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (placesResponse) {
      // Extract user ids from places data
      const userIds = placesResponse.map(place => place.user_id);

      // Make a single GET request to fetch all user data
      $.ajax({
        type: 'GET',
        url: usersUrl,
        success: function (usersData) {
          // Map user data to the corresponding user ids in places data
          for (const place of placesResponse) {
            userData = usersData.find(user => user.id === place.user_id);
            createPlaceArticle(place, userData);
          }
        },
        error: function (usersError) {
          console.error('Error making users GET request:', usersError);
        }
      });
    },
    error: function (placesError) {
      console.error('Error making places POST request:', placesError);
    }
  });
});

