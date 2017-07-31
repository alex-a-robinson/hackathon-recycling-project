var table;

$(document).ready(function() {

  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (user) {
      window.user = user
      table = $('#history').DataTable({'searching':false, 'paging':false, "bDestroy": true});
      firebase.database().ref(`/${user.uid}/history`).off()
      firebase.database().ref(`/${user.uid}/history`).on('child_added', add_history);
    } else {
      window.user = null;
    }
  });
});

function add_history(snap) {


  console.log(snap.val())
  if (!snap.val()) return;
  var value = snap.val();

  var date = new Date(value.timestamp).toISOString().slice(0, 16).replace('T', ' ')

  table.row.add([value.item_name, date, value.quantity || 0, value.location || '']).draw();
}

function add_item_to_db(item_name, quantity=1) {
  if (!window.user) {
    console.warn('no user!')
    return;
  }

  getLocation(function(location) {
    console.log('in location')
    if (!item_name) return;
    if(!quantity) return;

    var data = {
      item_name: item_name,
      quantity: quantity,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      location: location
    }
    firebase.database().ref(`/${window.user.uid}/history`).push(data);
    firebase.database().ref(`/${window.user.uid}/item_count`).once("value").then((snap) => {
      if (snap.val() == null) {
        firebase.database().ref(`/${window.user.uid}/item_count`).push(-Math.abs(quantity));
      }
      firebase.database().ref(`/${window.user.uid}/item_count`).set(snap.val() - quantity);
    });
    $('#new_item').val('');
    $('#quantity').val('');
  })
}

function add_manually(  ){
  if (!window.user) {
    console.warn('no user!')
    return;
  }

  var item_name = $("#new_item").val()
  var quantity = $("#quantity").val()
  if( !quantity ){
    quantity = 1

  }

  getLocation(function(location) {
    console.log('in location')
    if (!item_name) return;
    if(!quantity) return;

    var data = {
      item_name: item_name,
      quantity: quantity,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      location: location
    }
    firebase.database().ref(`/${window.user.uid}/history`).push(data);
    firebase.database().ref(`/${window.user.uid}/item_count`).once("value").then((snap) => {
      if (snap.val() == null) {
        firebase.database().ref(`/${window.user.uid}/item_count`).push(-Math.abs(quantity));
      }
      firebase.database().ref(`/${window.user.uid}/item_count`).set(snap.val() - quantity);
    });
    $('#new_item').val('');
    $('#quantity').val('');
  })


}

function change_status() {
  var status = $('#status').is(':checked')

  if (!window.user) {
    console.warn('no user!')
    return;
  }

  firebase.database().ref(`/${window.user.uid}/status`).once("value").then((snap) => {
    firebase.database().ref(`/${window.user.uid}/status`).set(status);
  });
}

function sign_in() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function add_new_item() {
  var item_name = $('#new_item').val();

  if (!item_name) return;

  if (!window.user) {
    console.warn('no user!')
    return;
  }

  $('#new_item').val('');

  add_item_to_db(item_name);
}

function open_desktop_webcam(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#photoWindow').html('<input id="myFileInput" type="file" accept="image/*;capture=camera">');

    var myInput = document.getElementById('myFileInput');

    function sendPic() {
        var file = myInput.files[0];
        reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (evt) {
            send(evt.target.result.split(',')[1]);
        }

        // Send file here either by adding it to a `FormData` object
        // and sending that via XHR, or by simply passing the file into
        // the `send` method of an XHR instance.
    }

    myInput.addEventListener('change', sendPic, false);
  } else {
    $('#photoWindow').html('<video id="video" width="550px" height="480" margin="0 auto" autoplay></video> <canvas style="display: none" id="canvas" max-width="640" height="480"></canvas>');
    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
    // Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
      context.drawImage(video, 0, 0, 640, 480);
      send(canvas.toDataURL().split(',')[1]);
    });
  }
}
