var topics = ["cats", "dogs", "pigs", "cows"];

for (i in topics) {

    $(".put-buttons").append("<button class=" + topics[i] + " data-topic=" + topics[i] + ">" + topics[i] + "</button>");
    $(this).attr("data-topic", topics[i]);

};

$("button").on("click", function () {
    $("#insert-here").html("");

    var topic = $(this).attr("data-topic");
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
            var stillURL = results[i].images.fixed_height_still.url
            var moveURL = results[i].images.fixed_height.url

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
            }
        });
    });

});

