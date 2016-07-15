$(document).ready(function(){
	
	$.ajax({
	method: 'GET',
	url: '/api/maps/' + $('body').data('id') 
	}).done((map) => {
		initMap(map)
	});

})

function addPinsToMap(map, pins){
    
    for(var key in pins){

      var pin = new google.maps.Marker({
        position: {lat: pins[key].latitude, lng: pins[key].longitude},
        title: pins[key].title
      });

      pin.setMap(map);
    }
}

function getPins(gmap, map) {
 
  $.ajax({
    method: "GET",
    url: "/api/maps/"+ map.id + "/pins",
  }).done((results) => {
    addPinsToMap(gmap, results)
  });

}


function initMap(map){
	console.log(map)

	var mapOptions = {

      center: {lat: map.latitude, lng: map.longitude},
      zoom: 13,
      zoomControl: true,
      scaleControl: true,

      //map type:
      mapTypeId: google.maps.MapTypeId.SATELLITE,

      // map type controls:
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_CENTER
      },

      //map zoom controls:
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },

  }
  
  var mapDiv = document.getElementById('map-edit');
  var gmap = new google.maps.Map(mapDiv, mapOptions);

  getPins(gmap, map);


  google.maps.event.addListener(gmap, 'click', function(event) {
     // infoWindow.setContent(formElement);
     // infoWindow.setPosition(event.latLong);
     // infoWindow,open(map);
    addPin(event.latLng, gmap);
  });
  

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
 
  function addPin(location, map) {
 
    var pin = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map
    });


    
  }



}