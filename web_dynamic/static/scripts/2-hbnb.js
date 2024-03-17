// Wait for the document to be ready
$(document).ready(function() {
    // Function to update the API status
    function updateApiStatus() {
        // Find the div#api_status
        const apiStatusDiv = $('HEADER DIV#api_status');

        // Check if div was found
        if (apiStatusDiv.length > 0) {
			console.log("DIV Found");
            // Make a GET request to the API endpoint
            $.ajax({
                type: 'GET',
                url: 'http://localhost:5001/api/v1/status/',
                success: function(response) {
                    // Check the status in the response
                    if (response.status === 'OK') {
						console.log("Server is OK");
                        // If status is "OK", add the class 'available'
                        apiStatusDiv.addClass('available');
                    } else {
						console.log("Server is not OK!");
                        // If status is not "OK", remove the class 'available'
                        apiStatusDiv.removeClass('available');
                    }
                },
                error: function(error) {
					console.log("Server is not available");
                    // Handle errors if needed
                    console.error('Error fetching API status:', error);
                }
            });
        }
    }

    // Call the updateApiStatus function initially
    updateApiStatus();

    // Set an interval to periodically update the API status
    setInterval(updateApiStatus, 8000); // Update every 5 seconds (adjust as needed)
});

