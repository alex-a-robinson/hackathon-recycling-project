$(document).ready(function() {

  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (user) {
      window.user = user
      firebase.database().ref(`/${user.uid}/history`).on('child_added', add_history);
    } else {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      window.user = null;
    }
  });
});

function add_history(snap) {
  if (!snap.val()) return;

  console.log(snap.val());
}

function add_new_item() {
  var item_name = $('#new_item').val();

  if (!item_name) return;

  if (!window.user) {
    console.warn('no user!')
    return;
  }

  $('#new_item').val('');

  var data = {
    item_name: item_name,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }

  firebase.database().ref(`/${window.user.uid}/history`).push(data);
}
