$(document).ready( function(){

  $("#tab1").hide();
  $("#tab2").hide();
  $("#tab3").hide();

  getCreatedMaps();
  getFavoritedMaps();
  getEditedMaps();

  $(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    $(this).removeClass("btn-default").addClass("btn-primary");
  });

  $("#created").on("click", function () {
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tab1").toggle("slow");
  }

  $("#favorited").on("click", function () {
    $("#tab1").hide();
    $("#tab3").hide();
    $("#tab2").toggle("slow");
  }

  $("#edited").on("click", function () {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").toggle("slow");
  }

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


function getCreatedMaps() {

  $.ajax({
    method: 'GET',
    url: '/users/' + $('body').attr('data-userid') + '/maps/created',
  }).done((results) => {

    addMapsToPage(results);
  });
}

function getEditedMaps() {

  $.ajax({
    method: "GET",
    url: "users/" + $('body').attr('data-userid') + "/maps/edited",
  }).done((results) => {

    addMapsToPage(results);
  });

}


function getFavoritedMaps() {

  $.ajax({
    method: "GET",
    url: "users/" + $('body').attr('data-userid') + "/maps/favorited",
    }).done((results) => {
    addMapsToPage(results);
  });
}
