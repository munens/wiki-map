$(document).ready(function(){
	
	$.ajax({
	method: 'GET',
	url: '/api/maps/' + $('body').data('id') 
	}).done((map) => {
		initMap(map)
	});

})

function addPinsToMap(map, pins){
    
	
		var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
  


    for(var key in pins){

      

      var pin = new google.maps.Marker({
        position: {lat: pins[key].latitude, lng: pins[key].longitude},
        title: pins[key].title
      });

      pin.setMap(map);

      pin.addListener('click', function(e) {
      	var infowindow = new google.maps.InfoWindow({
      		content : contentString
     	 })
      	infowindow.open(map, this);
      })
    
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








    // var infowindow = new google.maps.InfoWindow({
    //   content:
    // });




    pin.addListener('double click', function(){

    })
    
  }



}