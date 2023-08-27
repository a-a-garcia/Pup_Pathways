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

            refreshLocationButton.addEventListener('click', function() {
                // Request the user's location when the button is clicked
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const userLatLng = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
        
                        // Update the map or perform any other actions with the new location data
                        const map = new google.maps.Map(
                            document.getElementById('map'),
                            {
                                center: userLatLng,
                                zoom: 19,
                            }
                        );
        
                        // Optionally, update the marker or perform other actions as needed
                        const marker = new google.maps.Marker({
                            position: userLatLng,
                            map: map,
                            title: 'Your Location',
                        });
                    },
                    function() {
                        // Handle geolocation errors here if needed
                        console.error('Error: The Geolocation service failed or is disabled.');
                    }
                );
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

            const confirmationModal = document.getElementById('confirmationModal');
            const confirmButton = document.getElementById('confirmButton');
            const cancelButton = document.getElementById('cancelButton');
            const pathCoordinatesInput = document.getElementById('pathCoordinatesInput')

            let pendingPath = null //store pending polyline
            google.maps.event.addListener(drawingManager, 'polylinecomplete', function(polyline) { //when polyline finishes drawing...
                pendingPath = polyline;

                confirmationModal.style.display = "block";
            });

            confirmButton.addEventListener('click', function() {
                confirmationModal.style.display = "none";
                if (pendingPath) {
                    const pathCoordinates = pendingPath.getPath().getArray(); // Get the path of the completed polyline
                    //set/ update value of hidden input field (it's initially nothing) with JSON string of path coorindates
                    pathCoordinatesInput.value = JSON.stringify(pathCoordinates)
                    console.log(JSON.stringify(pathCoordinates))
                    //submit form
                    document.getElementById('pathForm').submit();
                }
            })

            cancelButton.addEventListener('click', function () {
                // User clicked "Cancel"
                
                // Close the modal
                confirmationModal.style.display = 'none';
            
                // Remove the pending polyline from the map
                if (pendingPath) {
                    pendingPath.setMap(null);
                }
            });
            // You can add additional map customizations and functionality here
            
            //accepts a map to draw on and the paths data to be passed in
            function fetchCurrentPaths(map, paths_data) {
                paths_data.forEach(pathEntry => {
                    const coordinates = pathEntry.coordinates; // No need for JSON.parse
                    console.log(pathEntry)
                    // create the polylines
                    const path_line = new google.maps.Polyline({
                        path: coordinates, // Directly use coordinates
                        geodesic: true,
                        strokeColor: '#0000FF', // Adjust the color as needed
                        strokeOpacity: 1.0,
                        strokeWeight: 5, // Adjust the weight as needed
                        map: map,
                    });
                    
                    //fetch user information for path
                    const userId = pathEntry.user_id;
                    console.log(`USERID FOR THIS PATH: ${userId}`)
                    fetch(`/get_user_info/${userId}`)
                        .then(response => response.json())
                        .then(user => {
                            //once we have user info, we can display it when path is clicked
                            path_line.addListener('click', function() {
                                console.log('IM CLICKED!')
                                console.log(`${user.first_name}, ${pathEntry.created_at}`)
                                const infoWindow = new google.maps.InfoWindow({
                                    content: `Created by: ${user.first_name}<br>Created at: ${pathEntry.created_at}`,
                                    maxWidth: 200
                                });
                                infoWindow.open(map, path_line)
                            });
                        })
                });
            }
            fetchCurrentPaths(map, all_paths_data)
        }, 
        function() { //failure callback
        // Handle geolocation errors here (e.g., user denied location access)
        console.error('Error: The Geolocation service failed or is disabled.');
        
    });
}


