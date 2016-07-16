$(document).ready(function() {

  $(".glyphicon.glyphicon-heart").on("click", function(event) {
    event.preventDefault();
    let favoritedItem = $(this).serialize();
    console.log(favoritedItem);
    if ($(this).hasClass("favorited")) {
        $.ajax({
        url: '/favorites/' + $('footer').data('mapid'),
        data: favoritedItem,
        dataType: "json",
        method: 'DELETE',
        success: function() {
          $(this).removeClass("favorited")
        }
      });
    } else {
      $.ajax({
        url: '/favorites/' + $('footer').data('mapid'),
        method: 'POST',
        data: favoritedItem,
        dataType: "json",
        success: function() {
          $(this).addClass("favorited")
        }
      });
    }
  });
});
