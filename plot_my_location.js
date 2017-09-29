// Along with places searched, we want a marker for user's location
function add_marker_for_current_location(map, callback) {

	var pos;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
 	   console.log("Position is "+position.coords.latitude+", "+position.coords.longitude)
      pos = position;
	  })
	}
	else {
	  console.log("Location is unavailable")
	  return;
	}

  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
  };
	    /*var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };*/

  var marker = new google.maps.Marker({
    map: map,
    icon: image,
    title: "Your location",
    position: pos
  });

  callback(marker)
}