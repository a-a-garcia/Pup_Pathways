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

        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYLINE,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYLINE],
            },
            polylineOptions: {
                editable: true,  // Allow users to edit the path
            },
        });
        
        // Add the DrawingManager to the map
        drawingManager.setMap(map);
        console.log("drawingManager loaded.")
        // Listen for path completion event
        google.maps.event.addListener(drawingManager, 'polylinecomplete', function(polyline) {
            // Do something with the completed polyline (path)
        });

        // You can add additional map customizations and functionality here
    }, function() {
        // Handle geolocation errors here (e.g., user denied location access)
        console.error('Error: The Geolocation service failed or is disabled.');
    });
}

