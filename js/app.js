
var loggedUser = {};

$(document).ready(function() {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0L6HCDw3WNrnwxXkNRdwZ5ClvKZz8TKU",
    authDomain: "pumpkinclicker.firebaseapp.com",
    databaseURL: "https://pumpkinclicker.firebaseio.com",
    storageBucket: "pumpkinclicker.appspot.com",
    messagingSenderId: "102965890181"
};
firebase.initializeApp(config);

var auth = new firebase.auth();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

var database = new firebase.database();
var profileRef = database.ref('/profiles');





// BUTTONS

	// event listener for the facebook login button
	$("#btn-login").click(function() {
		// sign in via popup
		// PRO TIP: remember, .then usually indicates a promise!
		auth.signInWithPopup(facebookProvider).then(function(result) {
			$("#window-login").hide();
			$("#window-main").show();
			// check for your profile
			profileRef.once("value").then(function(snapshot) {
				// get the snapshot value
				var snapshotValue = snapshot.val();
				console.log(snapshotValue);
				// if no values present, just add the user
				if (snapshotValue == undefined || snapshotValue == null) {
					loggedUser = addNewUser(result, profileRef);
				}
				else {
					// iterate through the object, and determine if the
					// profile is present
					var keys = Object.keys(snapshotValue);
					var found = false;
					for (var i = 0; i < keys.length; i++) {

						// accessing objects:
						// way 1: objectname.objectvalue
						// way 2: objectname['objectvalue']
						if (snapshotValue[keys[i]].email == result.user.email) {
							
							// found the profile, access it
							loggedUser = snapshotValue[keys[i]];
							loggedUser.id = keys[i];
							found = true;
						}
					}
					// profile is not found, add a new one
					if (!found) {
						loggedUser = addNewUser(result, profileRef);
					}
				}
				loadtopics(conversationRef, database);
				loadmyconversations(userconvsref);
			});
		}, function(error) {
			console.log("Oops! There was an error");
			console.log(error);
		});
	});




// the following end the document.ready
})





// function to add a new user
// (this isn't in document ready because it doesn't need to be initialized)
function addNewUser(result, ref) {
	var user = {
		name: result.user.displayName,
		email: result.user.email
	};

	var newUser = ref.push(user);
	user.id = newUser.key;
	return user;
}