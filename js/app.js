
var loggedUser = {};
var database;
var profileRef;

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

    database = new firebase.database();
    profileRef = database.ref('/profiles');

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

                    setupGame();
				} else {
					// iterate through the object, and determine if the
					// profile is present
					var keys = Object.keys(snapshotValue);
					var found = false;
					for (var i = 0; i < keys.length; i++) {

						// accessing objects:
						// way 1: objectname.objectvalue
						// way 2: objectname['objectvalue']
						if (snapshotValue[keys[i]].uid == result.user.uid) {
							// found the profile, access it
							loggedUser = snapshotValue[keys[i]];
							loggedUser.id = keys[i];
							found = true;

                            setupGame();
						}
					}
					// profile is not found, add a new one
					if (!found) {
						loggedUser = addNewUser(result, profileRef);

                        setupGame();
					}
				}

			});
		}, function(error) {
			console.log("Oops! There was an error");
			console.log(error);
		});
	});
// the following end the document.ready
});

// function to add a new user
// (this isn't in document ready because it doesn't need to be initialized)
function addNewUser(result, ref) {
	var user = {
		name: result.user.displayName,
		uid: result.user.uid,
        // set loggedUser's score variables to default.
        totalPumpkins: 0,
        pumpkinsPerClick: 1,
        pumpkinsPerSecond: 0,

        storeItems: [
            {
                name: "Banana Rob",
                imgUrl: "img/bananarob.jpg",
                description: "Hire banana Rob to help harvest your pumpkins. +1 pumpkin per second.",
                price: 100,
                boughtCount: 0,
                pumpkinsPerSecUpgrade: 1,
                pumpkinsPerClickUpgrade: 0,
            },
              {
                name: "Dwarf Eric",
                imgUrl: "img/Dwarf Eric.jpg",
                description: "+1 pumpkins per click. ",
                price: 250,
                boughtCount: 0,
                pumpkinsPerSecUpgrade: 0,
                pumpkinsPerClickUpgrade: 1,
            },
            {
                name: "Banana Beard",
                imgUrl: "img/bananabeard.jpg",
                description: "Banana Rob with Eric's beard. +1 pumpkins per click, +1 pumpkin per second ",
                price: 1000,
                boughtCount: 0,
                pumpkinsPerSecUpgrade: 1,
                pumpkinsPerClickUpgrade: 1,
            },
            {
                name: "Pizza Matt",
                imgUrl: "img/pizza_matt_100x100.jpg",
                description: "+5 pumpkins per second. ",
                price: 2000,
                boughtCount: 0,
                pumpkinsPerSecUpgrade: 5,
                pumpkinsPerClickUpgrade: 0,
            },
            {
                name: "Heather the champ",
                imgUrl: "img/heather_trophy.jpg",
                description: "Win everything everytime. +5 pumpkins per second, +5 pumpkins per click. ",
                price: 5000,
                boughtCount: 0,
                pumpkinsPerSecUpgrade: 5,
                pumpkinsPerClickUpgrade: 5,
            },
            {
                name: "Mike o' Lantern",
                imgUrl: "img/pumpkin_mike.jpg",
                description: "Clicking pumpkins like a boss. +10 pumpkins per click",
                price: 10000,
                boughtCount: 0,
                pumpkinsPerSecUpgrade: 0,
                pumpkinsPerClickUpgrade: 10,
            },
        ]
	};

    console.log(user.storeItems);

	var newUser = ref.push(user);
	user.id = newUser.key;
	return user;
}
