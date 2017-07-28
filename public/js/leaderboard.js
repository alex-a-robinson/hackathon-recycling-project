$(document).ready(function() {

  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (user) {
      window.user = user
      //firebase.database().ref(`/${user.uid}/history`).on('child_added', add_history);
    } else {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      window.user = null;
    }
  });
});

function create_table(leaders, number_of_records) {
  var table = $('<table style=\"border: 1px solid black\"></table>') // .addClass('foo');
  for (var key in leaders) {
    var element = leaders[key];
    row = $('<tr></tr>');
    row.append($('<td style=\"border: 1px solid black\"></td>').text(element.name));//.addClass('bar')
    row.append($('<td style=\"border: 1px solid black\"></td>').text(element.item_count));//.addClass('bar')
    table.append(row);
  }
  return table;
}


function get_leaderboard() {
  if (window.user != undefined) {
    return;
  }
  // Find all dinosaurs whose names come before Pterodactyl lexicographically.
  number_of_records = 2;
  var ref = firebase.database().ref("/").orderByChild("item_count").limitToLast(number_of_records).once("value").then(snap => {
    leaders = snap.val();
    console.log(leaders);
    console.log(create_table(leaders, number_of_records));
    $('body').html(create_table(leaders, number_of_records));
  });

}
