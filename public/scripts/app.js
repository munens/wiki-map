$(document).ready( function(){

  initMap();

});

function addMapsToPage(maps){

  var mapOptions = {

      center: {lat: 49.2827, lng: -123.1207},
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

  for(var key in maps){

      console.log(maps[key]);

      var id = maps[key].id;
      var mapDiv = document.getElementById(`map-${id}`);
      var gmap = new google.maps.Map(mapDiv, mapOptions);

      getPins(gmap, maps[key]);

  }

}

function addPinsToMap(map, pins){


    for (var key in pins){

      var pin = new google.maps.Marker({
        position: {lat: pins[key].latitude, lng: pins[key].longitude},
        title: pins[key].title
      });

      pin.setMap(map);
    }

}

function getUsers(){
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
}


function getPins(gmap, map) {

  $.ajax({
    method: "GET",
    url: "/api/maps/"+ map.id + "/pins",
  }).done((results) => {
    addPinsToMap(gmap, results)
  });

}


function getMaps() {

  $.ajax({
    method: "GET",
    url: "/api/maps",
  }).done((results) => {

    addMapsToPage(results);
  });

}



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


  //var mapDiv = document.getElementById('map');
  //var map = new google.maps.Map(mapDiv, mapOptions);



  getMaps();


  function addWindow(pin){

    var infowindow = new google.maps.InfoWindow({
            content : '<div id="content">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                      '<div id="bodyContent">'+
                      "<img src='https://s-media-cache-ak0.pinimg.com/564x/f3/c5/08/f3c508ea5071061c9d90d9f49fdc3c13.jpg'>" +
                      '<p>' + pin.description + '</p>'+
                      '<p>Attribution:'+ pin.title +" <a href='" + pin.url +'>'+
                       pin.url + '</a> '+
                      '(last visited June 22, 2009).</p>'+
                      '</div>'+
                      '</div>'
        });

  };



  var pinContent = {

    latLong : {lat: 49.2823, lng: -123.1107},
    title: 'Uluru',
    locationImage : 'https://s-media-cache-ak0.pinimg.com/564x/f3/c5/08/f3c508ea5071061c9d90d9f49fdc3c13.jpg',
    description : 'Uluru, also referred to as Ayers Rock, is a large ' +
                  'sandstone rock formation in the southern part of the '+
                  'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                  'south west of the nearest large town, Alice Springs; 450&#160;km '+
                  '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                  'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                  'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                  'Aboriginal people of the area. It has many springs, waterholes, '+
                  'rock caves and ancient paintings. Uluru is listed as a World '+
                  'Heritage Site.',
            url : "https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194"
  };

}





  /**************************************************************************/

  //add marker on page; also add form on new markers added to the page that can
  //then be posted in database:

  /*
  




  var formElement = "<input type='text' id='text4mrkr' value='marker text' />" +
                    "<input type='button' value='submit' onclick='addPlace();' />"
  var infoWindow = new google.maps.InfoWindow();


  google.maps.event.addListener(map, 'click', function(event) {

    /*

    infoWindow.setContent(formElement);
    infoWindow.setPosition(event.latLong);
    infoWindow,open(map);
    
    addPin(event.latLng, map);


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

  //google.maps.event.addDomListener(window, 'load');

*/



/*
    var infowindow1 = new google.maps.InfoWindow({
      content: content[0]
    });

    var infowindow2 = new google.maps.InfoWindow({
      content: content[1]
    });

    pin2.addListener('click', function(){
      infowindow2.open(map, pin2)
    })

    pin1.addListener('click', function(){
      infowindow1.open(map, pin1);
    })
*/
