$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCeG6zY4XN32mKKSPIF0JCMv1UyKZOCe08",
        authDomain: "train-schedule-1a18e.firebaseapp.com",
        databaseURL: "https://train-schedule-1a18e.firebaseio.com",
        projectId: "train-schedule-1a18e",
        storageBucket: "train-schedule-1a18e.appspot.com",
        messagingSenderId: "348423046700"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#addTrainBtn").on("click", function () {
        event.preventDefault();

        var trainName = $("#nameInput").val().trim();
        var destination = $("#placeInput").val().trim();
        var time = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequency = $("#frequency").val().trim();

        database.ref().set({
            name: trainName,
            destination: destination,
            time: time,
            frquency: frequency,
        });

        console.log(trainName);
        console.log(destination);
        console.log(time);
        console.log(frequency);

        $("#nameInput").val("");
        $("#placeInput").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

        return false;

    });

});
