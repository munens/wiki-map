$(document).ready( function(){

  initMap();

});

function addMapsToPage(maps){

  var mapOptions = {

      center: {lat: 49.2827, lng: -123.1207},
      zoom: 13,
      zoomControl: false,
      scaleControl: false,

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


      var image = typeOfPin(pins[key]);

      var pin = new google.maps.Marker({
        position: {lat: pins[key].latitude, lng: pins[key].longitude},
        title: pins[key].title,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: image
      });

      pin.setMap(map);
    }

}

function typeOfPin(pin){
  
  let resturant = 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/48/Restaurant-icon.png';
  let bar = 'http://icons.iconarchive.com/icons/graphicloads/food-drink/48/drink-3-icon.png';
  let home = 'http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/48/red-home-icon.png';
  let shop = 'http://icons.iconarchive.com/icons/uiconstock/50-free-christmas/48/shopping-2-icon.png'
  let otherHome = 'http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/48/blue-home-icon.png'
  let other = 'http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/48/Maps-Pin-Place-icon.png'

  if(pin.group == 'Restaurant'){
    return resturant;
  } else if (pin.group == 'Bar') {
    return bar;
  } else if (pin.group == 'Home'){
    return home;
  } else if (pin.group == 'Shop'){
    return shop;
  } else if (pin.group == 'Other user'){
    return otherHome;
  } else {
    return other;
  }

};

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

  getMaps();

}