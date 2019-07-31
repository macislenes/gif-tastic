
// On document.ready you are going to load an array of strings called animals and it's going load the following animals
$(document).ready(function() {
  // declaring our variables under animals
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  // this is a function we are going to use to create buttons 
  // it takes in arrayToUse, classToAdd, areToAddTo as paramaters 
    // arrayToUse is being used to store the current array
    // classToAdd is being used to store the name of the css and styling class
    // areaToAddTo is being used to store where we are going to display the animals array as buttons
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    // here we are going to empty the areaToAddTo Div so we don't just keep adding to the same space
    $(areaToAddTo).empty();

    // using a for loop we are going to loop over our array of animals
    for (var i = 0; i < arrayToUse.length; i++) {
      // declaring a new variable and assinging it an html button
      var a = $("<button>");
      // using .addClass() to assign the class we will pass through the function
      a.addClass(classToAdd);
      // we are adding a .attr() assinging a "data-type" for the button and giving it the value of the animal in the array
      a.attr("data-type", arrayToUse[i]);
      // adding .text() to the button 
      // assigns the text based on the name as it iterates through the loop
      a.text(arrayToUse[i]);
      // .append() the button to the area within the page
      $(areaToAddTo).append(a);
    }

  }
// here is our .on("click", function(){}) inside this we are listening for a click on the buttons with the ".animal-button" class that we dynamically created 
  $(document).on("click", ".animal-button", function() {
    // taking the "#animals" section in the html and removing any existing content
    $("#animals").empty();
    // select all of the ".animal-button" and .removeClass the "active" attribute
    // that way anything that was previously highlighted will no longer be
    $(".animal-button").removeClass("active");
    // $()this represents the html element that triggered the event
    // in this case the even is a "click"
    // we are going to .addClass named "active"
    // giving it the highlighted box surrounding the selected button
    $(this).addClass("active");
    // declaring a new variable with the value of $(this) and assigning it the .attr of our "data-type"
    // that way we can later use that type to search within gyphy for that specific elemet name
    var type = $(this).attr("data-type");
    // declaring a new variable and assining it the giphy url we want to hit with an ajax call
    // building the url by feeding the parameter q with the type
    // the type is the "data-type" of the button which was assined the animal name
    // the api_key which is our api key 
    // limit which we have set to 10 ==> telling the api to return 10 reults
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // here is the call to our ajax
    // asynchronous javascript and xml
    $.ajax({
      // we are passing the queryURL through the url in ajax
      url: queryURL,
      // we are going to be using the method called "GET"
      // this will retreive information from the api for us to display
      method: "GET"
    })
    // the promise to our ajax call 
    // we will passing the (response) from the api through our funcion 
      .then(function(response) {
        // declaring a new variable and asinging it the .data from within our response
        var results = response.data;
        // looping through the new  results array we have created from the response to the api call
        for (var i = 0; i < results.length; i++) {
          // dynamically creating a new div called "animal-item" and assining it to animalDiv
          var animalDiv = $("<div class=\"animal-item\">");
          // declaring a new variable called rating and assinging it the value of the .rating return from within theresults[i] as it loop 
          var rating = results[i].rating;
          // dynamically creating a new <p> tag and assinging the text as the rating of the gif
          var p = $("<p>").text("Rating: " + rating);

          // assinging a new animated variable as the .images.fixed.heigh.url from within the results returned from the api
          var animated = results[i].images.fixed_height.url;
          // assinging a new still variable as the .images.fixed.heigh_still.url from within the results
          var still = results[i].images.fixed_height_still.url;
          // dynamically creating a new <img> element 
          var animalImage = $("<img>");
          // assinging varirous data values we will need to show the still and moving images
          //  .attr of "src" , "data-still", and "data-state" set to "still" 
          // still was declared as the still image from the api return
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          //  .attr of "data-animate" set to "animated" 
          // animated has been declared as the animated version of the gif within our api return
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          // .addClass called "animal-image"
          animalImage.addClass("animal-image");
          // .append the rating (p) to the animalDiv
          animalDiv.append(p);
          // .append the animalImage to the animalDiv
          animalDiv.append(animalImage);
          // $("#animals") is looking for our element in the html with the id of "animals"
          // using .append() to append the dynamically created animalDiv
          $("#animals").append(animalDiv);
        }
      });
  });

// here is our .on("click", function(){}) inside this we are listening for a click on the images with the ".animal-image" class that we dynamically created 
$(document).on("click", ".animal-image", function() {

  // declaring a new variable called state and assinging it the return of the "data-state".attr  of the item clicked using $(this) 
    var state = $(this).attr("data-state");
    // an if() statement saying if the return of the state is "still" run this code within the {}
    if (state === "still") {
      // assinging a new .attr to the item clicked using $(this)
      // we are assinging a new source as "data-animate" 
      // "data-animate" was assined when we dynamicalled created the elements
      // "data-animate" contains the api link to the animated version of the gif
      $(this).attr("src", $(this).attr("data-animate"));
      // setting a new .attr to the "data-state" as "animate"
      $(this).attr("data-state", "animate");
    }
    // if the above statement is not true run this code
    else {
      // assinging a new .attr to the item clicked using $(this)
      // we are assinging a new source as "data-still" 
      // "data-still" was assined when we dynamicalled created the elements
      // "data-still" contains the api link to the still version of the gif
      $(this).attr("src", $(this).attr("data-still"));
      // setting a new .attr to the "data-state" as "still"
      $(this).attr("data-state", "still");
    }
  });
  
// here is our .on("click", function(){}) inside this we are listening for a click on the images with the ".add-animal" class
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // declaring a new variable based on it's .eq(0) position of the element in the jQueary object
    var newAnimal = $("input").eq(0).val();
    // our if() statement saying if our newAnimal length is > 2 we will run the code within
    if (newAnimal.length > 2) {
      // .push the newAnimal to the animals Array
      animals.push(newAnimal);
    }
    // here is the call to the populateButtons() 
      // passing animals through the arrayToUse
      // "animal-button" as the classToAdd 
      // "#animal-buttons" id of the html element for areaToAddTo
    populateButtons(animals, "animal-button", "#animal-buttons");

  });
    // here is the call to the populateButtons() 
      // passing animals through the arrayToUse
      // "animal-button" as the classToAdd 
      // "#animal-buttons" id of the html element for areaToAddTo
  populateButtons(animals, "animal-button", "#animal-buttons");
});
