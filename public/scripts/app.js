$(() => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });;
});

$(document).ready( function(){

  initMap();

});

 

  function initMap() {

    var vancouver = {lat: 49.2827, lng: -123.1207};

    var mapOptions = {

        center: vancouver,
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

    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, mapOptions);

    var marker = new google.maps.Marker({
        position: {lat: 49.2827, lng: -123.1207},
        map: map,
        title: 'Hello World!'
    });

    marker.setMap(map);

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

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    
    marker.addListener('click', function(){
      infowindow.open(map, marker);
    })

  }

