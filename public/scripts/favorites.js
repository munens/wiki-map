$(document).ready(function() {

 $.ajax({
      url: '/favorites',
      method: 'GET',
      success: function(){
        console.log("success!")
      }
  });

  $("footer").on("click", ".glyphicon-heart-empty", function(event) {
    event.preventDefault();
    let favoritedItem = $(this).serialize();
    let item = this;
      $.ajax({
        url: '/favorites/' + $('footer').data('mapid'),
        method: 'POST',
        data: favoritedItem,
        dataType: "json",
        success: function() {
          $(item).removeClass("glyphicon-heart-empty")
          $(item).addClass("glyphicon-heart")
        }
      });
    });

 $("footer").on("click", ".glyphicon-heart", function(event) {
    event.preventDefault();
    let favoritedItem = $(this).serialize();
        $.ajax({
        url: '/favorites/' + $('footer').data('mapid'),
        data: favoritedItem,
        dataType: "json",
        method: 'DELETE',
        success: function() {
          $(item).removeClass("glyphicon-heart");
          $(item).addClass("glyphicon-heart-empty")
        }
      });
    });

});
