$(document).ready(function() {

  $("footer").on("click", ".glyphicon-heart-empty", function(event) {
    event.preventDefault();
    let favoritedItem = $(this).serialize();
      $.ajax({
        url: '/favorites/' + $('footer').data('mapid'),
        method: 'POST',
        data: favoritedItem,
        dataType: "json",
        success: function() {
          $(".glyphicon.glyphicon-heart-empty").removeClass("glyphicon-heart-empty")
          $(".glyphicon").addClass("glyphicon-heart")
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
          $(".glyphicon.glyphicon-heart").removeClass("glyphicon-heart");
          $(".glyphicon").addClass("glyphicon-heart-empty")
        }
      });
    });

});
