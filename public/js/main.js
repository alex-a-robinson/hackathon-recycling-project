$(document).ready(function() {

  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (user) {
      window.user = user
      // firebase.database().ref(`/${user.uid}/history`).on('child_added', add_history);
      // firebase.database().ref(`/${window.user.uid}/name`).once("value").then((snap) => {
      //   if (snap.val() == null) {
      //     firebase.database().ref(`/${window.user.uid}/name`).set(user.displayName);
      //   }
      // });
      //firebase.database().ref(`/${user.uid}/history`).on('child_added', add_history);
    } else {
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
  firebase.database().ref(`/${window.user.uid}/item_count`).once("value").then((snap) => {
    if (snap.val() == null) {
      firebase.database().ref(`/${window.user.uid}/item_count`).push(0);
    }
    firebase.database().ref(`/${window.user.uid}/item_count`).set(snap.val() - 1);
  });
}

function sign_in() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}