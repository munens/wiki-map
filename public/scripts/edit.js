$(document).ready(function(){
	
	$.ajax({
	method: 'GET',
	url: '/api/maps/' + $('body').data('id') 
	}).done((map) => {
		initMap(map, $('body').data('id'))
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
        title: pins[key].title,
        draggable: false
      });

      pin.setMap(map);

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


function initMap(map, mapid){

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
      //addPin(event.latLng, gmap)

      var $panel = "<article>" +
	    			"<form method='POST' action='/api/maps/" + mapid + "/pins'" +
	    				"<h4> Title </h4>" +
	    			 		"<input class='title' value='' name='title'></input>" +
	    			 		"<br>" +
	    			 	"<h4> Description </h4>" +
	    			 		"<textarea class='description' value='' name= description> </textarea>" +
	    			 		"<br><br>" +
	    			 	"<button class='btn btn-info' type='submit'>Click here to create new pin</button> " +
	            	 "</form>" +
	            	 "<br>" +
	            	 "<br>" +
	            	 "<button class='btn btn-danger' type='submit'>Delete Pin</button>" + 
	              "</article>"

  	var infowindow = new google.maps.InfoWindow();

  	var pin = new google.maps.Marker({
      position: event.latLng,
      label: labels[labelIndex++ % labels.length],
      map: gmap,
      draggable: true
      
    });

    
    var infowindow = new google.maps.InfoWindow({
      	content : $panel,

    });

    pin.addListener('click', function() {
      	infowindow.open(gmap, this);
    });

    var pinObj = { latitude: event.latLng.lat(),
    			   longitude: event.latLng.lng(),
				   map_id: mapid };

    $("#article-edit").on('click', ".btn.btn-info", function(event){
    	event.preventDefault();

    	pinObj.title = $('.title').val();
		pinObj.description = $('.description').val();	

    	$.ajax({
    		url: '/api/maps/' + mapid + '/pins',
    		method: 'POST',
    		data: pinObj,
    		success: () => { console.log('u know'); }
    	});

    });
    
    
  });
  

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
 
  function addPin(location, map) {
 	
  	
  }


}




