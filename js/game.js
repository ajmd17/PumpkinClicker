

$(document).ready(function() {
    // TODO: load previous user data from firebase

    // set up click event for main pumpkin
    $("#main-pumpkin").click(function() {
        setTotalPumpkins(loggedUser.totalPumpkins + loggedUser.pumpkinsPerClick);
    });

    // set up main timer
    setInterval(function() {
        if (loggedUser.pumpkinsPerSecond > 0) {
            setTotalPumpkins(loggedUser.totalPumpkins + loggedUser.pumpkinsPerSecond);
        }
    }, 1000);
});

function setTotalPumpkins(newTotal) {
    loggedUser.totalPumpkins = newTotal;
    console.log("loggedUser.totalPumpkins set to: " + JSON.stringify(loggedUser.totalPumpkins).toString());
    // TODO: update data in firebase
}

function setPumpkinsPerClick(newAmount) {
    loggedUser.pumpkinsPerClick = newAmount;
    // TODO: update data in firebase
}

function setPumpkinsPerSecond(newAmount) {
    loggedUser.pumpkinsPerSecond = newAmount;
    // TODO: update data in firebase
}
