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
    $('#update').click(function() {
      location.reload();
    });
  });
  //   (function() {
  //     var min = 200,
  //       max = 300,
  //       pad_right = 5,
  //       input = document.getElementsByClassName('form-control');

  //     input.style.width = min + 'px';
  //     input.onkeypress = input.onkeydown = input.onkeyup = function() {
  //       var input = this;
  //       setTimeout(function() {
  //         var tmp = document.createElement('div');
  //         tmp.style.padding = '0';
  //         if (getComputedStyle)
  //           tmp.style.cssText = getComputedStyle(input, null).cssText;
  //         if (input.currentStyle) tmp.style.cssText = input.currentStyle.cssText;
  //         tmp.style.width = '';
  //         tmp.style.position = 'absolute';
  //         tmp.innerHTML = input.value
  //           .replace(/&/g, '&amp;')
  //           .replace(/</g, '&lt;')
  //           .replace(/>/g, '&gt;')
  //           .replace(/"/g, '&quot;')
  //           .replace(/'/g, '&#039;')
  //           .replace(/ /g, '&nbsp;');
  //         input.parentNode.appendChild(tmp);
  //         var width = tmp.clientWidth + pad_right + 1;
  //         tmp.parentNode.removeChild(tmp);
  //         if (min <= width && width <= max) input.style.width = width + 'px';
  //       }, 1);
  //     };
  //   })();
});

// window.location.reload(true);
