var pumpkinsPerSecond = 0;
var pumpkinsPerClick = 1;
var totalPumpkins = 0;

$(document).ready(function() {
    // TODO: load previous user data from firebase

    // set up click event for main pumpkin
    $("#main-pumpkin").click(function() {
        setTotalPumpkins(totalPumpkins + pumpkinsPerClick);
    });

    // set up main timer
    setInterval(function() {
        if (pumpkinsPerSecond > 0) {
            setTotalPumpkins(totalPumpkins + pumpkinsPerSecond);
        }
    }, 1000);
});

function setTotalPumpkins(newTotal) {
    totalPumpkins = newTotal;
    console.log("totalPumpkins set to: " + JSON.stringify(totalPumpkins).toString());
    // TODO: update data in firebase
}

function setPumpkinsPerClick(newAmount) {
    pumpkinsPerClick = newAmount;
    // TODO: update data in firebase
}

function setPumpkinsPerSecond(newAmount) {
    pumpkinsPerSecond = newAmount;
    // TODO: update data in firebase
}
