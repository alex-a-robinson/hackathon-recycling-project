document.addEventListener('DOMContentLoaded', function() {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.user = user
      //firebase.database().ref(`/${user.uid}/history`).on('child_added', add_history);
    } else {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      window.user = null;
    }
  });
});

function add_history(snap) {
  console.log(snap.val());
}
