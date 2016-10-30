const priceMultiplier = 1.20;
var showMousePumpkin = false;

function playSound(source){
    var audio = document.createElement("audio");
    audio.src = source;
    audio.addEventListener("ended", function() {
        if (document.hasChild(this)) {
            document.removeChild(this);
        }
    }, false);
    audio.play();
}

function setupGame() {

    // set up pumpkin counter
    setTotalPumpkins(loggedUser.totalPumpkins);

    $(document).mousemove(function(e) {
        $("#pumpkin-mouse").css({left:e.pageX, top:e.pageY});
        $("#pumpkin-mouse").css({"display": "visible"});
    });

    // set up click event for main pumpkin
    $("#main-pumpkin").click(function() {
        setTotalPumpkins(loggedUser.totalPumpkins + loggedUser.pumpkinsPerClick);
        $("#pumpkin-mouse-text").html("+ " + loggedUser.pumpkinsPerClick.toString());
        showMousePumpkin = true;

        // play click sound.
        playSound("sound/click.mp3");
    });


    // set up store items
    for (var i = 0; i < loggedUser.storeItems.length; i++) {
        let item = loggedUser.storeItems[i];
        $("#store-items").append($("<li class=\"store-item\">").append("<img src=\"" + item.imgUrl + "\">")
            .append($("<span class=\"item-name\">").append(item.name))
            .append("<br>")
            .append($("<span class=\"item-desc\">").append(item.description))
            .append("<br>")
            .append($("<span class=\"price-tag\">").append("Price: &#127875; " + item.price.toString()))
            .click(function() {
                if (item.price <= loggedUser.totalPumpkins) {
                    // decrease the user's amount of pumpkins.
                    let priceRounded = Math.round(item.price);
                    setTotalPumpkins(loggedUser.totalPumpkins - priceRounded);
                    $("#pumpkin-mouse-text").html("- " + priceRounded);
                    showMousePumpkin = true;

                    // perform the upgrade.
                    setPumpkinsPerSecond(loggedUser.pumpkinsPerSecond + item.pumpkinsPerSecUpgrade);
                    setPumpkinsPerClick(loggedUser.pumpkinsPerClick + item.pumpkinsPerClickUpgrade);

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
    var totalFloored = Math.floor(newTotal);
    loggedUser.totalPumpkins = totalFloored;
    if (totalFloored == 0) {
        $("#total-pumpkins").html("No Pumpkins");
    } else if (totalFloored == 1) {
        $("#total-pumpkins").html("1 Pumpkin");
    } else {
        $("#total-pumpkins").html(totalFloored.toString() + " Pumpkins");
    }
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
