const priceMultiplier = 1.20;
var showMousePumpkin = false;

function playSound(source){
    var audio = document.createElement("audio");
    audio.src = source;
    audio.addEventListener("ended", function() {
        if (this.parentNode == document) {
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
        $("#store-items").append(($("<li class=\"store-item\">").append($("<div class=\"store-item-wrapper\">").append("<img src=\"" + item.imgUrl + "\">"))
            .append($("<span class=\"item-name\">").append(item.name + " (You have " +  item.boughtCount +")"))
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
                    item.boughtCount++;
                    $(this).find(".item-name").html(item.name + " (You have " +  item.boughtCount +")");
                    $(this).find(".price-tag").html("Price: &#127875; " + item.price.toString());
                    profileRef.child(loggedUser.id).update(loggedUser);
                } else {
                    alert("You do not have enough pumpkins to purchase this item");
                }
            })));
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

function updatePumpkinfetti(totalFloored) {
    if (totalFloored == 0) {
        $(".confetti").hide();
    } else {
        if (totalFloored >= 1 && totalFloored < 5) {
            $(".confetti1").show();
        }
        if (totalFloored >= 5 && totalFloored < 10) {
            $(".confetti2").show();
            $(".confetti3").show();
            $(".confetti4").show();
        }
        if (totalFloored >= 10 && totalFloored < 20) {
            $(".confetti5").show();
            $(".confetti6").show();
            $(".confetti7").show();
        }
        if (totalFloored >= 20 && totalFloored < 30) {
            $(".confetti8").show();
            $(".confetti9").show();
            $(".confetti10").show();
        }
        if (totalFloored >= 30 && totalFloored < 40) {
            $(".confetti11").show();
            $(".confetti12").show();
            $(".confetti13").show();
        }
        if (totalFloored >= 40 && totalFloored < 50) {
            $(".confetti14").show();
            $(".confetti15").show();
            $(".confetti16").show();
        }
        if (totalFloored >= 50 && totalFloored < 60) {
            $(".confetti17").show();
            $(".confetti18").show();
            $(".confetti19").show();
        }
        if (totalFloored >= 60 && totalFloored < 70) {
            $(".confetti20").show();
            $(".confetti21").show();
        }
    }
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

    updatePumpkinfetti(totalFloored);

    profileRef.child(loggedUser.id).update(loggedUser);
}

function setPumpkinsPerClick(newAmount) {
    loggedUser.pumpkinsPerClick = newAmount;
    profileRef.child(loggedUser.id).update(loggedUser);
}

function setPumpkinsPerSecond(newAmount) {
    loggedUser.pumpkinsPerSecond = newAmount;

    $("#pumpkins-per-sec").html("(at " + newAmount.toString() + "&#127875;/s)");

    profileRef.child(loggedUser.id).update(loggedUser);
}
