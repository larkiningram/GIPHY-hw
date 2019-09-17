var topics = ["cats", "dogs", "pigs", "cows"];
// var gifs = []
function createButtons() {
    for (i in topics) {

        $(".put-buttons").append("\t <button class='topicButtons btn btn-md btn-info " + topics[i] + "' data-topic=" + topics[i] + ">" + topics[i] + "</button> \t");
        $(this).attr("data-topic", topics[i]);

    };
    displayGifs();
};
createButtons();


$("#submit").on("click", function (event) {
    event.preventDefault();
    $(".put-buttons").empty();

    // console.log("click");
    var newButton = $("#newButton").val();


    topics.push(newButton);
    createButtons();
});


function displayGifs() {
    $(".topicButtons").on("click", function () {
        $("#insert-here").html("");


        var topic = $(this).attr("data-topic");
        console.log(topic);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (i in results) {
                var topicDiv = $("<div>");
                var p = $("<p>");
                var rating = results[i].rating;
                var stillURL = results[i].images.fixed_height_still.url;
                var moveURL = results[i].images.fixed_height.url;

                p.text("Rating: " + rating);

                var topicImage = $("<img>");
                topicImage.attr("src", stillURL);
                topicImage.attr("data-state", "still");
                topicImage.addClass("gif");
                topicImage.attr("data-still", stillURL);
                topicImage.attr("data-animate", moveURL);

                topicDiv.append(p);
                topicDiv.append(topicImage);


                $("#insert-here").prepend(topicDiv);

            };

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                };
            });
        });

    });
}


