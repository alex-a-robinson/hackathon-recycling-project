$(document).ready(function() {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.user = user
      table = $('#tablelocation').DataTable();
      get_leaderboard()
    } else {
      window.user = null;
    }
  });
});

function get_leaderboard() {
  var number_of_records = 10;
  firebase.database().ref("/").orderByChild("item_count").limitToLast(number_of_records).once("value").then(snap => {
    leaders = snap.val();
    create_table(leaders);
  });
  
  firebase.database().ref("/").once("value").then(snap => {
    users = snap.val();
  
  showMap({lat: 51.5027773, lng: -0.0198934});
  
  console.log('map');

  for (var uid in users) {
    var user = users[uid];
    for (var item_id in user.history) {
      var item = user.history[item_id];
    if (!item.latlng) continue;
    show_on_map(item.latlng);
    }
  } 
  });
}

// function get_leaderboard() {


//   var number_of_records = 10;
//   firebase.database().ref("/").orderByChild("item_count").limitToLast(number_of_records).once("value").then(snap => {
//     leaders = snap.val();
//     create_table(leaders);
//   });
// }


function create_table(leaders) {
  for (var key in leaders) {
      var element = leaders[key];
      table.row.add([element.name || '', (element.item_count || 0) * -1]).draw();
    }
}


