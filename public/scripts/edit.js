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
      
      var contentString = '<div id="content">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                      '<div id="bodyContent">'+
                      "<img src='https://s-media-cache-ak0.pinimg.com/564x/f3/c5/08/f3c508ea5071061c9d90d9f49fdc3c13.jpg'>" +
                      '<p>' + pins[key].description + '</p>'+
                      '<p>Attribution:'+ pins[key].title +" <a href='" + pins[key].url +'>'+
                       pins[key].url + '</a> '+
                      '(last visited June 22, 2009).</p>'+
                      '</div>'+
                      '</div>'


      var infowindow = new google.maps.InfoWindow({
      		content : contentString
      });
      
      var pin = new google.maps.Marker({
        position: {lat: pins[key].latitude, lng: pins[key].longitude},
        title: pins[key].title
      });

      pin.setMap(map);

      console.log(pins[key]);

      // $.ajax({
      // 	url: '/api/maps/' + pins[key].map_id + '/pins/' + pins[key].id, 
      // 	method: "GET"
      // }).done((pin) => {
      	


      // })

      pin.addListener('click', function() {
      	infowindow.open(map, this);
      });
    
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








    




    pin.addListener('double-click', function(){

    })
    
  }



}