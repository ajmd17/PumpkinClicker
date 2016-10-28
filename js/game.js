const priceMultiplier = 1.20;
var showMousePumpkin = false;

function setupGame() {

    $(document).mousemove(function(e) {
        $("#pumpkin-mouse").css({left:e.pageX, top:e.pageY});
        $("#pumpkin-mouse").css({"display": "visible"});
    });

    // set up click event for main pumpkin
    $("#main-pumpkin").click(function() {
        setTotalPumpkins(loggedUser.totalPumpkins + loggedUser.pumpkinsPerClick);
        $("#pumpkin-mouse-text").html("+ " + loggedUser.pumpkinsPerClick.toString());
        showMousePumpkin = true;
    });


    // set up store items
    for (var i = 0; i < loggedUser.storeItems.length; i++) {
        let item = loggedUser.storeItems[i];
        $("#store-items").append($("<li class=\"store-item\">").append("<img src=\"" + item.imgUrl + "\">")
            .append($("<span class=\"item-name\">").append(item.name))
            .append("<br>")
            .append($("<span class=\"item-desc\">").append(item.description))
            .append("<br>")
            .append($("<span class=\"price-tag\">").append("Price: " + item.price.toString() + " pumpkins"))
            .click(function() {
                if (item.price <= loggedUser.totalPumpkins) {
                    let priceRounded = Math.round(item.price);
                    setTotalPumpkins(loggedUser.totalPumpkins - priceRounded);
                    $("#pumpkin-mouse-text").html("- " + priceRounded);
                    showMousePumpkin = true;
                    // increase item price.
                    item.price *= priceMultiplier;
                    item.price = Math.round(item.price);
                    $(this).find(".price-tag").html("Price: " + item.price.toString() + " pumpkins");
                    profileRef.child(loggedUser.id).update(loggedUser);
                } else {
                    alert("You do not have enough pumpkins to purchase this item");
                }
            }));
    }
    $("#banana-rob").click(function() {
        setPumpkinsPerSecond(loggedUser.pumpkinsPerSecond + 1);
    });

    // set up main timer
    setInterval(function() {
        if (loggedUser.pumpkinsPerSecond > 0) {
            setTotalPumpkins(loggedUser.totalPumpkins + loggedUser.pumpkinsPerSecond);
        }
        if (showMousePumpkin) {
            console.log($("#pumpkin-mouse").css("opacity"));
            if ($("#pumpkin-mouse").css("opacity") == 1) {
                showMousePumpkin = false;
            } else {
                $("#pumpkin-mouse").css({"opacity": 1});
            }
        } else {
            if ($("#pumpkin-mouse").css("opacity") == 1) {
                $("#pumpkin-mouse").css({"opacity": 0});
            } else {
            }
        }

    }, 1000);
}

function setTotalPumpkins(newTotal) {
    loggedUser.totalPumpkins = newTotal;
    $("#total-pumpkins").html(Math.floor(loggedUser.totalPumpkins).toString() + " Total Pumpkins");
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
