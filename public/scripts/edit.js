$(document).ready(function(){
  
  $.ajax({
  method: 'GET',
  url: '/api/maps/' + $('body').data('id') 
  }).done((map) => {
    initMap(map, $('body').data('id'))
    console.log(map)
  });

})

function addPinsToMap(gmap, map, pins){


//  '<p>Attribution:'+ pins[key].title +" </p> <a href='" + pins[key].url +'>'+ pins[key].url + '</a> '+
//                        '<p>(last visitd June 22, 2009).</p>'+

    for(let key in pins){

      //debugger;     
      let contentString = $("<div id='content'>" +
        "<h1>" + pins[key].title + "</h1>" +
          "<p>" + pins[key].description + "</p>" +
            "<div class='delete-pin' data-mapid='" + map.id + "' data-pinid='" + pins[key].id +"' >" +
            "<form method='POST' action='/api/maps/" + map.id + "/pins/" + pins[key].id + "?_method=DELETE'>" +
            "<button class='btn btn-danger' type='submit'>Delete Pin</button>" +
            "</form>" +
          "</div>" +
      "</div>");

      

      // '<div id="content">'+
      //                     '<div id="siteNotice">'+
      //                   '</div>'+
      //                   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      //                   '<div id="bodyContent">'+
      //                     "<img src='https://s-media-cache-ak0.pinimg.com/564x/f3/c5/08/f3c508ea5071061c9d90d9f49fdc3c13.jpg'>" +
      //                     '<p>' + pins[key].description + '</p>'+
      //                   '</div>'+
      //                   "<div class='delete-pin' data-mapid='" + map.id + "' data-pinid='" + pins[key].id +"' >" +
      //                   "<form method='POST' action='/api/maps/" + map.id + "/pins/" + pins[key].id + "?_method=DELETE'>" +
      //                     "<button class='btn btn-danger' type='submit'>Delete Pin</button>" +
      //                   "</form>" +
      //                   "</div>"



      let infowindow = new google.maps.InfoWindow({
          content : contentString[0]
      });

      let image = typeOfPin(pins[key]);
      
      let pin = new google.maps.Marker({
        position: {lat: pins[key].latitude, lng: pins[key].longitude},
        title: pins[key].title,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: image
      });

      //console.log(pins[key]);
      
      pin.setMap(gmap);

      pin.addListener('click', function(event) {
        
        infowindow.open(gmap, this);
      });

      contentString.on('click', '.btn.btn-danger', (event) => {
        event.preventDefault();
        console.log($('.delete-pin').data('pinid'));
      console.log($('.delete-pin').data('mapid'));
    $.ajax({
      method: 'DELETE',
      url: '/api/maps/' + $('.delete-pin').data('mapid')  + '/pins/' + $('.delete-pin').data('pinid'),
      success: () => {  }
    }).done(() => {
      console.log("Im happy");
      getPins(gmap, map);
      pin.setMap(null);
      
    });
      });

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

function getPins(gmap, map) {
  console.log(map)
  $.ajax({
    method: "GET",
    url: "/api/maps/"+ map.id + "/pins",
  }).done((results) => {
    addPinsToMap(gmap, map, results)
  });

}

function addPinAndWindow(gmap, map, mapid){
  google.maps.event.addListener(gmap, 'click', function(event) {

    var $panel = "<article class='pin-info'>" +
                  "<form method='POST' action='/api/maps/" + mapid + "/pins'>" +
                  "<h4> Title </h4>" +
                  "<input class='pin-title' value='' name='title'></input>" +
                  "<br>" +
                  "<h4>Type</h4>" +
            
                  
                          "<select id='select-type'>" +
                              "<option >Restaurant</option>" +
                              "<option >Bar</option>" +
                              "<option >Shop</option>" +
                              "<option >Other user</option>" +
                              "<option >Home </option>" +
                              "<option >Other </option>" +
                          "</select>" +
                      
                "<br>" +
                "<h4> Description </h4>" +
                "<textarea class='pin-description' value='' name= description> </textarea>" +
                "<br><br>" +
              "<button class='btn btn-info' type='submit'>Click here to create new pin</button> " +
                 "</form>" +
                 "<br>" +
                 "<br>" +
                 "<button class='btn btn-warning' type='submit'>Delete Pin</button>" + 
                "</article>"

    var infowindow = new google.maps.InfoWindow();
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    var pin = new google.maps.Marker({
      position: event.latLng,
      label: labels[labelIndex++ % labels.length],
      map: gmap,
      draggable: true
      
    });

    
    var infowindow = new google.maps.InfoWindow({
        content : $panel,
        maxWidth : 300,
        maxHeigth : 400,
        width: 400,
        height: 400                      
    });

    pin.addListener('click', function() {
        infowindow.open(gmap, this);
    });

    //place this pin in the database:
    var pinObj = { latitude: event.latLng.lat(),
                   longitude: event.latLng.lng(),
                   map_id: mapid };

    $("#article-edit").on('click', ".btn.btn-info", function(event){
      event.preventDefault();
      
      pinObj.title = $('.pin-title').val();
      pinObj.group = $('#select-type').val();
      pinObj.description = $('.pin-description').val(); 

     
      console.log("jesus", gmap, map);

      infowindow.close();
      $.ajax({
        url: '/api/maps/' + mapid + '/pins',
        method: 'POST',
        data: pinObj,
        success: () => {  }
      }).done(() => {
        console.log("jesus", gmap, map);
        getPins(gmap, map);
      });

    });

    $("#article-edit").on("click", ".btn.btn-warning", (event) => {
      event.preventDefault();
      pin.setMap(null);
    }); 

      
    
  });

};


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
  console.log(map)
  getPins(gmap, map);
  addPinAndWindow(gmap, map, mapid);

}

