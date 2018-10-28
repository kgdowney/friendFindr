// 4. Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
var path = require("path");
var friends = require("../app/data/friends.js")

// Exporting API routes
module.exports = function (app) {

    // Get list of friend entries
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // ---------------------------------------------------------------------------
    //adding new friend post entry
    app.post("/api/friends", function (req, res) {
        var userInput = req.body;

        var userResponses = userInput.scores;

        // To find the best match for a bff:
        var matchName = "";
        var matchImage = "";
        var totalDiff = 10000;

        //Looking at all current friends in list
        for (var i = 0; i < friends.lenght; i++) {

            //computing the differences for questions
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }
            //If the difference is lowest, record the match
            if (diff < totalDiff) {
                totalDiff = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }
        //adding a new user
        friends.push(userInput);

        //send json response
        res.json({ status: "OK", matchName: matchName, matchImage: matchImage });
    });
};