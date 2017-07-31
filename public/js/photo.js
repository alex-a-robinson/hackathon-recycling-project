function send(b64EncodingImage) {
	var json = {
		"requests": [
			{
				"image": {
    				"content": b64EncodingImage
  				},
  				"features": [  {
      							"type": "LABEL_DETECTION",
								"maxResults": 100,
    							} ]
    		}
		]
	}
    $.ajax({
	    type: 'POST',
	    url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBEIZqIEqrfWAHPKttG4_iuLDS-ES1zgO8",
	    dataType: 'json',
	    data:  JSON.stringify(json),
	    //Include headers, otherwise you get an odd 400 error.
	    headers: {
	      "Content-Type": "application/json",
	    },

	    success: function(data, textStatus, jqXHR) {
	    var recycable_items = ["newspapers", "paper", "magazines", "glass", "glass bottles", "jar", "glass jar", "plastic bottle", "bottle", "aluminium", "steel cans", "cans", "can", "aluminium cans", "plastic bags", "plastic wrap", "wrap", "shredded paper", "paper", "clothes", "toys", "furniture", "sharps", "cup"]
			var results_summary = [];
			var results = data.responses[0].labelAnnotations;
			var found = false;
	      	for (var i=0; !found && i < results.length; ++i) {
	      		var obj = results[i].description;
	      		results_summary.push(JSON.stringify(obj));
	      		for (var j = 0; !found && j <= recycable_items.length; ++j) {
	      			var robj = recycable_items[j];
	      			if (robj == obj) {
								console.log(robj)
	      				add_item_to_db(robj, 1, true);
	      				// found = true;
	      			}
	      		}

	      	}
	      	setTimeout(function() {alert("Your points have been updated!");}, 100);
	    	console.log(results_summary);
	      	console.log(found);
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	      console.log('ERRORS: ' + textStatus + ' ' + errorThrown + JSON.stringify(jqXHR));
	    }
	  });
}
