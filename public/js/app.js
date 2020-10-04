$(function () {

    console.log("page loaded!");

    $(".eat-burger").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
    
        var newState = {
          devoured: true
        };
    
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: newState
        }).then(
          function() {
            console.log("Burger eaten!");
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });

    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        var newBurger = {
          burger_name: $("#burger-name").val().trim()
        };
    
        // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new Burger!");
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });

});