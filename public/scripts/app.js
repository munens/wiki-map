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

    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
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


    });

    var marker = new google.maps.Marker({
        position: {lat: 49.2827, lng: -123.1207},
        map: map,
        title: 'Hello World!'
    });




  }

