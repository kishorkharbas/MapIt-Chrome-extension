function initAutoComplete() {


  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  var places_changed_listener = function() {
    console.log("in func_listener, input value is - "+input.value)
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      console.log("searchBox.getPlaces() returned 0 results");
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

  var bounds = new google.maps.LatLngBounds();

  // Along with searched places, we want a marker for user's location
  /*console.log("Adding marker for user's location")
  var pos;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
                                        console.log("Position is "+position.coords.latitude+", "+position.coords.longitude)
                                        pos = position;
                                        
                                        var image = {
                                          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                                          size: new google.maps.Size(20, 32),
                                          origin: new google.maps.Point(0, 0),
                                        };

                                        var pos_marker = new google.maps.Marker({
                                          map: map,
                                          icon: image,
                                          title: "Your location",
                                          position: pos
                                        });
                                        markers.push(pos_marker);
                                        bounds.extend(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                                    })
  }
  console.log("Position is "+pos.coords.latitude+", "+pos.coords.longitude)*/
  

    //add_marker_for_current_location(map, function(new_marker) {
    //  markers.push(new_marker);
    //});

    // For each place, get the icon, name and location.
    places.forEach(function(place)  {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    //alert("Here - "+input.value)
  }

  //func_listener();
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', places_changed_listener);

  /*input.addEventListener('click', function() {
      google.maps.event.trigger(input, 'focus')
      google.maps.event.trigger(input, 'keydown', { keyCode: 13});
    } 
  );*/

  chrome.tabs.query( {active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
      function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, 
          function(response){
            console.log("getSelection method returned - " + response.data)
            //alert("response received is " + response.data);
            var input = document.getElementById('pac-input');
            $('#pac-input').val(response.data)
            //input.value = response.data;
            //google.maps.event.trigger(input, 'input')
            google.maps.event.trigger(input, 'focus')
            google.maps.event.trigger(input, 'keydown', { keyCode: 13});
            google.maps.event.trigger(searchBox, 'places_changed');
    });
  });


}
