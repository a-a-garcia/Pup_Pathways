function initMap() {
        console.log('initMap function called');
        // Your map initialization code here
    
    // Create a map centered at the user's current location
    navigator.geolocation.getCurrentPosition(
        function(position) { //Success Callback
            const userLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            const map = new google.maps.Map( //Google Map constructor. takes in 2 args 1-html element where map will be drawn. 2- options object that will configure initial state of map. will have 2 props - center: specifies the initial center of map, zoom: intial zoom level of map. higher val->zoom in, lower val->zoom out
                document.getElementById('map'), 
                { 
                    center: userLatLng,
                    zoom: 19 
                }
            );

            // Optionally, you can add a marker at the user's location
            const marker = new google.maps.Marker({
                position: userLatLng,
                map: map,
                title: 'Your Location',
            });

            const drawingManager = new google.maps.drawing.DrawingManager({ //initialize
                drawingControlOptions: { //configures appearance/position of drawing controls
                    position: google.maps.ControlPosition.TOP_CENTER, //sets position of controls
                    drawingModes: [google.maps.drawing.OverlayType.POLYLINE], //sets the allowable types of shapes to draw (only want lines in this case)
                },
                polylineOptions: {
                    editable: true,  // Allow users to edit the path
                    strokeColor: '#FF0000', // Set the stroke color here (e.g., red)
                    strokeOpacity: 1.0,     // Opacity (1.0 is fully opaque)
                    strokeWeight: 5         // Width of the line
                },
            });
            
            // Add the DrawingManager to the map
            drawingManager.setMap(map);
            console.log("drawingManager loaded.")
            // Listen for path completion event

            let drawingModeEnabled = true;

            const toggleDrawingModeButton = document.getElementById('toggleDrawingMode');

            toggleDrawingModeButton.addEventListener("click", function() {
                //toggle drawing mode state - starts out as disabled
                drawingModeEnabled = !drawingModeEnabled

                //Enable or disable drawing mode based on the state
                if (drawingModeEnabled) {
                    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
                    toggleDrawingModeButton.textContent = 'Disable Drawing Mode';
                    toggleDrawingModeButton.style.backgroundColor = '#dc3545';
                } else {
                    drawingManager.setDrawingMode(null); //disable drawing mode
                    toggleDrawingModeButton.textContent = 'Enable Drawing Mode';
                    toggleDrawingModeButton.style.backgroundColor = '#198754';
                }
            });

            google.maps.event.addListener(drawingManager, 'polylinecomplete', function(polyline) {
                const path = polyline.getPath(); // Get the path of the completed polyline
                
                path.forEach(function(point, index) {
                console.log(`Point ${index + 1} - Latitude: ${point.lat()}, Longitude: ${point.lng()}`);
                });
            });
            
            // You can add additional map customizations and functionality here
        }, 
        function() { //failure callback
        // Handle geolocation errors here (e.g., user denied location access)
        console.error('Error: The Geolocation service failed or is disabled.');
    });
}

