function initMap() {
        console.log('initMap function called');
        // Your map initialization code here
    
    // Create a map centered at the user's current location
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        const map = new google.maps.Map(document.getElementById('map'), {
            center: userLatLng,
            zoom: 15, // Adjust the initial zoom level as needed
        });

        // Optionally, you can add a marker at the user's location
        const marker = new google.maps.Marker({
            position: userLatLng,
            map: map,
            title: 'Your Location',
        });

        // You can add additional map customizations and functionality here
    }, function() {
        // Handle geolocation errors here (e.g., user denied location access)
        console.error('Error: The Geolocation service failed or is disabled.');
    });
}