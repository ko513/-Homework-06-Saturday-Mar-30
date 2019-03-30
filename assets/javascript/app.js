

      var
        subjects = ["animals", "plants", "football", "baseball", "architecture", "photography", "action movies", "art paintings", "nascar", "indy car", "sports car racing", "formula1", "art paintings", "nascar", "indy car", "sports car racing", "formula1"];

      $( document ).ready(function() {

        //  =====  CREATE INITIAL SUBJECT BUTTONS  =====  //
        for ( i = 0; i < subjects.length;  i++) {
          var gifButtonDiv = $('<div>', { "class": "col-md-1" })
  
          var gifButton = $('<button>', {
            "id": subjects[i],
            "class": "gifButton",
            "text": subjects[i]
          })

          $(gifButtonDiv).append(gifButton);
          $('#subject-buttons').append(gifButtonDiv);
        }


        //  When the Submit button is clicked, pass the user input subject to displayGifs()
        $(document).on("click", ".gifButton", function() {
          //  Clear the user text box just in case it was used
          $("#user-subject").val("");

          var subject = $(this).attr('id');
          displayGifs(subject);
        })



        //  =====  CREATE USER SUBJECT BUTTON  =====  //
        var userSubjectDiv = $('<div>', { "class": "col-md-1" })
        var userSubjectButton = $('<button>', {
          "id": "userSubjectButton",
          "text": "Submit"
        })

        userSubjectDiv.append(userSubjectButton);
        $('#user-input').append(userSubjectDiv);

        //  When user enters a subject, parse it & pass it to displayGifs()
        $('#userSubjectButton').on("click", function() {
          var subject = $("#user-subject").val().trim();
          displayGifs(subject);


          //  Also, create a new button for the new subject
          var newSubjectButtonDiv = $('<div>', { "class": "col-md-1" })
          var newButton = $('<button>', {
            "id": subject,
            "class": "gifButton",
            "text": subject
          })

          $(newSubjectButtonDiv).append(newButton);
          $('#subject-buttons').append(newSubjectButtonDiv);

          //  Add new subject to the subjects[] array
          subjects.push(subject);
        })



        //  =====  CREATE STOP ALL BUTTON  =====  //
        var stopButton = $('<button>', {
          "id": "stopButton",
          "text": "Stop All"
        })
        var stopButtonDiv = $('<div>', { "class": "col-md-1" })
        stopButtonDiv.append(stopButton);
        $('#user-input').prepend(stopButtonDiv);


        $('#stopButton').on("click", function() {
          $.each($(".gif"), function(index, image) {
            $(image).attr("data-state", "still")
            $(image).attr("src", $(image).attr("data-still"))
          })
        })

      })  //  document.ready()



      //  Display images; subject = the id of the button clicked
      function displayGifs(subject) {
        $('#gifs').empty();

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&limit=100&apikey=BYNJwvSaWfHMF4s6mnevA3bU8hZYmfPw";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          var imgCount = 10;
          var imgRow = $('<div>', {
            "class": "row"
          })

          for (i = 0; i < imgCount; i++) {

            var imgDiv = $('<div>', {
              "class": "col-md-2"
            })
  
            var imgFigure = $('<figure>', {
              "class": "figure"
            })

            var imgTag = $('<img>', {
              "id": response.data[i].id,
              "src": response.data[i].images.fixed_height_still.url,
              "alt": response.data[i].title,
              "data-still": response.data[i].images.fixed_height_still.url,
              "data-animate": response.data[i].images.fixed_width.url,
              "data-state": 'still',
              "class": 'gif figure-img img-fluid'
            })

            var imgRating = "Rated " + response.data[i].rating;
            var imgCaption = $('<figcaption>', {
              "class": "figure-caption",
              "text": imgRating
            })

            $(imgFigure).append(imgTag);
            $(imgFigure).append(imgCaption);
            $(imgDiv).append(imgFigure);
            $(imgRow).append(imgDiv);
          }  //  Display images loop

          $('#gifs').append($(imgRow));
        })  //  ajax
		  }  //  displayGifs()



      //  When an image is clicked, flip its state
      $(document).on("click", ".gif", function() {
        var state = $(this).attr('data-state')
        var animate = $(this).attr('data-animate')
        var still = $(this).attr('data-still')

        if(state === "still") {
          $(this).attr("src", animate)
          $(this).attr("data-state", "animate")
        } else {
          $(this).attr("src", still)
          $(this).attr("data-state", "still")
        }
      })

