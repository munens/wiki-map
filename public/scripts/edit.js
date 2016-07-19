$(document).ready(function(){
  
  $.ajax({
  method: 'GET',
  url: '/api/maps/' + $('body').data('id') 
  }).done((map) => {
    initMap(map, $('body').data('id'))
    console.log(map)
  });

});

let pins = [];

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

      addToTable(pins[key]);

      pins.push(pin);
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
          
          setMapOnAll(null);
          pins = [];
          
          getPins(gmap, map);
          pin.setMap(null);
          
        });
      });

    }

    console.log(pins)

}

function addToTable(pin){
  if(pin.group == 'Restaurant'){

    let $pin = "<button id=" + pin.id + " data-map-id=" + pin.map_id + " id='restaurant' data-id=" + pin.id + " class='list-group-item'>" + pin.title + "</button>"
    $('#pin-restaurant').append($($pin));

  } else if (pin.group == 'Bar') {

    let $pin = "<button data-map-id=" + pin.map_id + " data-id=" + pin.id + " class='list-group-item'>" + pin.title + "</button>"
    $('#pin-bar').append($($pin));

  } else if (pin.group == 'Home'){
    
    let $pin = "<button data-map-id=" + pin.map_id + " data-id=" + pin.id + " class='list-group-item'>" + pin.title + "</button>"
    $('#pin-home').append($($pin));

  } else if (pin.group == 'Shop'){

    let $pin = "<button data-map-id="+ pin.map_id + " data-id=" + pin.id + " class='list-group-item'>" + pin.title + "</button>"
    $('#pin-shop').append($($pin));
    
  } else if (pin.group == 'Other user'){

    let $pin = "<button data-map-id=" + pin.map_id + " data-id=" + pin.id + " class='list-group-item'>" + pin.title + "</button>"
    $('#pin-other-user').append($($pin));
    
  } else {
    
    let $pin = "<button data-map-id=" + pin.map_id + " data-id=" + pin.id + " class='list-group-item'>" + pin.title + "</button>"
    $('#pin-other').append($($pin));
  }
}


function setMapOnAll(map) {
  for (var i = 0; i < pins.length; i++) {
    pins[i].setMap(map);
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
  setMapOnAll(null);
  pins = [];
  
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

     
      console.log(" 1 , jesus", gmap, map);
      
      infowindow.close();
      
      $.ajax({
        url: '/api/maps/' + mapid + '/pins',
        method: 'POST',
        data: pinObj,
        success: () => {  }
      }).done(() => {
        


        getPins(gmap, map);
      });
        setMapOnAll(null);
        pins = [];
        event.preventDefault();
       getPins(gmap, map);
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

  // $("<div class='list-group'>" +
  //   "<a href='#' class='list-group-item'>Restaurant</a>" +
  //   "<a href='#' class='list-group-item'>Bars</a>" +
  //   "<a href='#' class='list-group-item'>Home</a>" +
  //   "<a href='#' class='list-group-item'>Other users</a>" +
  //   "<a href='#' class='list-group-item'>Other</a>" +
  //   "</div>").appendTo('#article-edit');




  $('.list-group').on('click', ".list-group-item", (event) => {
      console.log($('.list-group-item').data('id'));
      console.log(event);

       // $.ajax({
       //    method: "GET",
       //    url: "/api/maps/"+ map.id + "/pins",
       //  }).done((results) => {
       //    for(var key in results){
       //      if(results[key].id == )
       //    }
       //  });




  })

  $('.container').on('click', '.list-group-item', (event) => {
    console.log($('#resturant').data('id'));

  })

  // $("button[data-mapid=" + mapid + "]").on('click', (event) => {

  //   console.log($('button').data('id'));
  // })



  //gmap.map.setCenter(new google.maps.LatLng( 45, 19 ) );


}

