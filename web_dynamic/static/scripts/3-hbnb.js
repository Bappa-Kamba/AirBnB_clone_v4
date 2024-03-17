$(document).ready(function () {
  const apiUrl = 'http://localhost:5001/api/v1/places_search/';
  const usersUrl = 'http://localhost:5001/api/v1/users/';
  const placesSection = $('section.places');

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
            const userData = usersData.find(user => user.id === place.user_id);
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

