var storeItems = [
    {
        name: "Banana Rob",
        imgUrl: "img/bananarob.jpg",
        description: "Hire banana Rob to help harvest your pumpkins.",
        price: 100
    },
];

$(document).ready(function() {
    // set up click event for main pumpkin
    $("#main-pumpkin").click(function() {
        setTotalPumpkins(loggedUser.totalPumpkins + loggedUser.pumpkinsPerClick);
    });


    // set up store items
    for (var i = 0; i < storeItems.length; i++) {
        let item = storeItems[i];
        $("#store-items").append($("<li class=\"store-item\">").append("<img src=\"" + item.imgUrl + "\">")
            .append($("<span class=\"item-name\">").append(item.name))
            .append("<br>")
            .append($("<span class=\"item-desc\">").append(item.description))
            .append("<br>")
            .append($("<span>").append("Price: " + item.price.toString() + " pumpkins")));
    }
    $("#banana-rob").click(function() {
        setPumpkinsPerSecond(loggedUser.pumpkinsPerSecond + 1);
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
    $("#total-pumpkins").html(loggedUser.totalPumpkins.toString() + " Total Pumpkins");
    profileRef.child(loggedUser.id).update(loggedUser);
}

function setPumpkinsPerClick(newAmount) {
    loggedUser.pumpkinsPerClick = newAmount;
    profileRef.child(loggedUser.id).update(loggedUser);
}

function setPumpkinsPerSecond(newAmount) {
    loggedUser.pumpkinsPerSecond = newAmount;
    profileRef.child(loggedUser.id).update(loggedUser);
}
