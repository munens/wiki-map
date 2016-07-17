$(document).ready(function() {

  $(".glyphicon.glyphicon-heart").on("click", function(event) {
    event.preventDefault();
    console.log($(this));
    let favoritedItem = $(this).serialize();
    console.log(favoritedItem);
    if ($(this).hasClass("favorited")) {
        $.ajax({
        url: '/favorites/' + $('footer').data('mapid'),
        data: favoritedItem,
        dataType: "json",
        method: 'DELETE',
        success: function() {
          $(".glyphicon.glyphicon-heart").removeClass("favorited")
        }
      });
    } else {
      $.ajax({
        url: '/favorites/' + $('footer').data('mapid'),
        method: 'POST',
        data: favoritedItem,
        dataType: "json",
        success: function() {
          $(".glyphicon.glyphicon-heart").addClass("favorited")
        }
      });
    }
  });
});
