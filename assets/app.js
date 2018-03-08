$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyCeG6zY4XN32mKKSPIF0JCMv1UyKZOCe08',
    authDomain: 'train-schedule-1a18e.firebaseapp.com',
    databaseURL: 'https://train-schedule-1a18e.firebaseio.com',
    projectId: 'train-schedule-1a18e',
    storageBucket: 'train-schedule-1a18e.appspot.com',
    messagingSenderId: '348423046700'
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $('#addTrainBtn').on('click', function() {
    event.preventDefault();

    var trainName = $('#nameInput')
      .val()
      .trim();
    var destination = $('#placeInput')
      .val()
      .trim();
    var time = moment(
      $('#firstTrain')
        .val()
        .trim(),
      'HH:mm'
    )
      .subtract(10, 'years')
      .format('X');
    var frequency = $('#frequency')
      .val()
      .trim();

    database.ref().push({
      name: trainName,
      destination: destination,
      time: time,
      frequency: frequency
    });

    // console.log(trainName);
    // console.log(destination);
    // console.log(time);
    // console.log(frequency);

    $('#nameInput').val('');
    $('#placeInput').val('');
    $('#firstTrain').val('');
    $('#frequency').val('');

    return false;
  });

  database.ref().on('child_added', function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var firebaseName = childSnapshot.val().name;
    var firebaseDestination = childSnapshot.val().destination;
    var firebaseTime = childSnapshot.val().time;
    var firebaseFrequency = childSnapshot.val().frequency;

    var timeRemainder =
      moment().diff(moment.unix(firebaseTime), 'minutes') % firebaseFrequency;
    var minutes = firebaseFrequency - timeRemainder;

    var nextTrain = moment()
      .add(minutes, 'm')
      .format('hh:mm A');

    $('#trainTable > tbody').append(
      '<tr><td>' +
        firebaseName +
        '</td><td>' +
        firebaseDestination +
        '</td><td>' +
        firebaseFrequency +
        ' minutes' +
        '</td><td>' +
        nextTrain +
        '</td><td>' +
        minutes +
        '</td></tr>'
    );
  });
});

// window.location.reload(true);
