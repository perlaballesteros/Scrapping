$(document).on("click", "#scrape", function(){
  $.get("/scrape");
  
});

//Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the blog
    $.ajax({
      method: "GET",
      url: "/blogs/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2 class='articleTitle'>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<label for='title'>Title:</label><br><input id='titleinput' name='title' ><br>");
        // A textarea to add a new note body
        $("#notes").append("<label for='note'>Note:</label><br><textarea id='bodyinput' name='body'></textarea><br>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
        $("#notesModal").modal("show");
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/blogs/" + thisId,
      data: {
        article:$(".articleTitle").text(),
        articleid:thisId,
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
    $("#notesModal").modal("hide");
  });
  
  $(document).on("click", ".deleteNote", function() {
    var noteId=$(this).attr("data-id");
  
   $.get("/deleteblogs/"+noteId);
    setTimeout(function() {
      location.reload();
    }, 500);
   
  })