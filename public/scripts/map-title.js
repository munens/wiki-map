$(document).ready(function() {

  $(".map-title").on("submit", function(event) {
    event.preventDefault();
    let newTitle = $(this).serialize();
    $.ajax({
      url: '/api/maps/' + $('body').data('id'),
      method: 'PUT',
      data: newTitle,
      dataType: "json",
      success: function(){
        console.log("success!")
      }
    });
  });
});
