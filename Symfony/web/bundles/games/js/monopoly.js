var numPlayers = 2;
var test = 0;

$(function() {
    var eContainer = $('#content');

    createBoard(eContainer);
    createMenu();
});
/****************************************************************************** CREATE BOARD */
function createBoard(container) {
    var eBoard = $('<div id="board" class="board"></div>');
    var eTopBar = $('<div id="topBar" class="horBar"></div>');
    var eLeftBar = $('<div id="leftBar" class="verBar"></div>');
    var eCenter = $('<div id="center" class="center"></div>');
    var eRightBar = $('<div id="rightBar" class="verBar"></div>');
    var eBottomBar = $('<div id="bottomBar" class="horBar"></div>');
    
    $(container).append(eBoard);
    $(eBoard).append(eTopBar);
    $(eBoard).append(eLeftBar);
    $(eBoard).append(eCenter);
    $(eBoard).append(eRightBar);
    $(eBoard).append(eBottomBar);
/********************************* TOP ROW */
    var eStart = $('<div id="tile0" class="corner start"></div>');
    $(eTopBar).append(eStart);
    var eStartAvatarBox = $('<div id="avatarBox0" class="avatarBox topAvatarBox leftAvatarBox"></div>');
    $(eStart).append(eStartAvatarBox);

    for (var i = 1; i <= 9; i++) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getValue(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');
        
        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox topAvatarBox"></div>');
        var eHorAssetBox = $('<div id="assetBox' + i + '" class="horAssetBox"></div>');

        $(eTopBar).append(eHorTile);
        $(eHorTile).append(eTileBody);
        $(eHorTile).append(eHorAssetBox);
        $(eHorTile).append(eAvatarBox);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);
    }
    
    var eJail = $('<div id="tile10" class="corner jail"></div>');
    $(eTopBar).append(eJail);
    var eJailAvatarBox = $('<div id="avatarBox10" class="avatarBox topAvatarBox"></div>');
    $(eJail).append(eJailAvatarBox);
/********************************* RIGHT ROW */
    for (var i = 11; i <= 19; i++) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileRight ' + getValue(aoTiles[i].type) + ' ' + getValue(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox"></div>');
        var eVerAssetBox = $('<div id="assetBox' + i + '" class="verAssetBox rightAssetBox"></div>');

        $(eRightBar).append(eVerTile);
        $(eVerTile).append(eTileBody);
        $(eVerTile).append(eAvatarBox);
        $(eVerTile).append(eVerAssetBox);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);    
    }
/********************************* BOTTOM ROW */
    var eCop = $('<div id="tile30" class="corner cop"></div>');
    $(eBottomBar).append(eCop);
    var eCopAvatarBox = $('<div id="avatarBox30" class="avatarBox leftAvatarBox"></div>');
    $(eCop).append(eCopAvatarBox);


    for (var i = 29; i >= 21; i--) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileBottom ' + getValue(aoTiles[i].type) + ' ' + getValue(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox"></div>');
        var eHorAssetBox = $('<div id="assetBox' + i + '" class="horAssetBox bottomAssetBox"></div>');

        $(eBottomBar).append(eHorTile);
        $(eHorTile).append(eTileBody);
        $(eHorTile).append(eAvatarBox);
        $(eHorTile).append(eHorAssetBox);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);
    }
    
    var ePark = $('<div id="tile20" class="corner park"></div>');
    $(eBottomBar).append(ePark);
    var eParkAvatarBox = $('<div id="avatarBox20" class="avatarBox"></div>');
    $(ePark).append(eParkAvatarBox);
    
/********************************* LEFT ROW */
    for (var i = 39; i >= 31; i--) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getValue(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox leftAvatarBox"></div>');
        var eVerAssetBox = $('<div id="assetBox' + i + '" class="verAssetBox"></div>');

        $(eLeftBar).append(eVerTile);
        $(eVerTile).append(eTileBody);
        $(eVerTile).append(eVerAssetBox);
        $(eVerTile).append(eAvatarBox);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);
    }
}
/****************************************************************************** CREATE MENU */
function createMenu() {
    var eCenter = $('#center');
    var eMenu = $('<div id="menu" class="menu"></div>');
    eCenter.append(eMenu);
    
    var eDice = $('<div id="dice" class="dice" title="Throw dice"></div>');
    var eDieOne = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    
    eMenu.append(eDice);
    eDice.append(eDieOne);
    eDice.append(eDieTwo);
    
    var eAction = $('<div id="action" class="action"></div>');
    var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Start Game</button>');
    eMenu.append(eAction);
    eAction.append(eActionButton);
    
    $(eActionButton).click(function() {
        startGame();
    });
    
    var ePlayers = $('<div id="players" class="players"></div>');
    eMenu.append(ePlayers);
}
/****************************************************************************** START GAME */
function startGame() {
    var eStartAvatarBox = $('#avatarBox0');
    var eCenter = $('#center');
    var eInfo = $('<div id="info" class="info"></div>');
    eCenter.append(eInfo);
    
    for (var i = 0; i < numPlayers; i++) {
        var sAvatar = aoPlayers[i].avatar;
        var eAvatar = $('<div id="player' + i + '" class="avatar ' + sAvatar + '"></div>');
        eStartAvatarBox.append(eAvatar);
    }
    
    showDialog('It\'s ' + aoPlayers[0].name + '\'s turn!');
    playTurn(0, 0, 0, 0);
}
/****************************************************************************** PLAY TURN */
function playTurn(player, phase, roll, due) {
    var eAction = $('#action');
    var nLocation = aoPlayers[player].location;
    var nPay = checkPay(nLocation, player, phase, roll);
/********************************* EVENT LISTENER */  
    $("div[id^='tile']").click(function() {
        showInfo(this.id.match(/\d+/)[0], player, phase, roll);
    }); ; 

    showInfo(nLocation, player, phase, roll);

    if (phase == 1 || phase == 2) {
        if (aoTiles[nLocation].type == "chest") {
            drawChestCard(player, phase, roll);
        }
        if (aoTiles[nLocation].type == "chance") {
            drawChanceCard(player, phase, roll);
        }
    }

    if (phase == 0) {
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            throwDice(player);
        });
    }
    
    if (phase == 1) {
        if (!isNaN(nPay) || due > 0) {
            var nTotal = 0;
            if (!isNaN(nPay)) { nTotal += nPay; }
            nTotal += due;
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + Math.abs(nTotal) +  '</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                payThis(Math.abs(nTotal), nLocation, player, phase);
            });
        }
    }
    
    if (phase == 2) {
        if (isNaN(nPay) && due == 0) {
            playTurn(player, 3, roll, 0);
        }
        else {
            var nTotal = 0;
            if (!isNaN(nPay)) { nTotal += nPay; }
            nTotal += due;
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + Math.abs(nTotal) + '</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                payThis(Math.abs(nTotal), nLocation, player, phase);
                
            });
        }
    }
    
    if (phase == 3) {
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Next player</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            nextPlayer(player);
        });
    }
    showPlayers(player);
}
/****************************************************************************** THROW DICE */
function throwDice(player) {
    var eDice = $('#dice');
    var nDieOne = Math.floor(Math.random() * 6 + 1);
    var nDieTwo = Math.floor(Math.random() * 6 + 1);
    var nTotal = nDieOne + nDieTwo;
    var eDieOne = $('<div id="dieOne" class="die die-' + nDieOne + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + nDieTwo + '"></div>');

    eDice.empty();
    eDice.append(eDieOne);
    eDice.append(eDieTwo);

    var nLocation = aoPlayers[player].location;
    
    if(nLocation + nTotal >= 40) {// pass "GO"
        aoPlayers[player].credits = aoPlayers[player].credits + 200;
    }
    aoPlayers[player].location = (nLocation + nTotal) % 40;
    
    if (nDieOne == nDieTwo) {   
        showDialog('You have rolled doubles, throw again!');
        playTurn(player, 1, nTotal, 0);
    }
    else {
        playTurn(player, 2, nTotal, 0);
    }
}
/****************************************************************************** CHECK IF PLAYER CAN BUY */
function checkBuy(id, player, phase) {
    var nLocation = aoPlayers[player].location;
    if (isNaN(aoTiles[id].owner) && aoTiles[id].price > 0 && id == nLocation && phase > 0) {
        return "yes";
    }
}
/****************************************************************************** CHECK IF PLAYER HAS MONOPOLY ON TILE */
function checkMonopoly(id, player) {
    var nPlayerHas = 0;
    var nMonopolyHas = 0;
    var nMortgages = 0;
    var sType = aoTiles[id].type;
    var sColor = aoTiles[id].color;

    if (sType == "street") {
        for (var i = 0; i < aoTiles.length; i++) {
            if (aoTiles[i].color == sColor) {
                nMonopolyHas += 1;//number of tiles in monopoly of that color
                if (aoTiles[i].owner == player) { nPlayerHas += 1; }//number of tiles of that color owner has
                if (aoTiles[i].mortgage == "yes") { nMortgages += 1; }//number of tiles of that color owner has
            }
        }

        if (nMonopolyHas == nPlayerHas) {
            if (nMortgages == 0) { return "yes"; }
            else { return "but"; }
        }
    }
    
    if (aoTiles[id].type == "train" || aoTiles[id].type == "utility") {
        var sType = aoTiles[id].type;
        for (var i = 0; i < aoTiles.length; i++) {
            if (aoTiles[i].type == sType) {
                if (aoTiles[i].owner == player) { nPlayerHas += 1; }//number of tiles of that color owner has
            }
        }
        return nPlayerHas;
    }
}
/****************************************************************************** CHECK WHAT PLAYER HAS TO PAY */
function checkPay(id, player, phase, roll) {
    var nOwner = aoTiles[id].owner;
    var nPrice = aoTiles[id].price;
    var sType = aoTiles[id].type;
    var nAssets = aoTiles[id].assets;
    var nLocation = aoPlayers[player].location;
    var sMortgage = aoTiles[id].mortgage;
    
    if (!isNaN(nOwner) && nOwner != player && id == nLocation && sMortgage != "yes" && (phase == 1 || phase == 2)) {
        if (sType == "street") {
            if (!isNaN(nAssets)) { return aoTiles[id].rent[nAssets]; }// rent if owner has assets
            else {
                if (checkMonopoly(id, nOwner) == "yes" || checkMonopoly(id, nOwner) == "but") { return aoTiles[id].rent[0] * 2; }// rent if owner has monopoly
                return aoTiles[id].rent[0];// rent if owner has no monopoly
            }
        }
        if (sType == "train") { return aoTiles[0].trains[checkMonopoly(id, nOwner) - 1]; }// fee from railroads
        if (sType == "utility") { return aoTiles[0].utilities[checkMonopoly(id, nOwner) - 1] * roll; }// fee from utilities
    }
    if (nPrice < 0 && (phase == 1 || phase == 2)) { return nPrice; }// taxes
}
/****************************************************************************** BUY THIS */
function buyThis(id, player, phase) {
    if (aoPlayers[player].credits >= aoTiles[id].price) {
        aoTiles[id].owner = player;
        aoPlayers[player].credits = aoPlayers[player].credits - aoTiles[id].price;

        showPlayers(player);
        showInfo(id, player, phase, 0);
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** PAY THIS */
function payThis(amount, id, player, phase) {
    if (aoPlayers[player].credits >= amount) {
        if (!isNaN(aoTiles[id].owner)) {
            aoPlayers[aoTiles[id].owner].credits = aoPlayers[aoTiles[id].owner].credits + amount;
        }
        aoPlayers[player].credits = aoPlayers[player].credits - amount;
        showPlayers(player);

        if (phase == 1) { playTurn(player, 0, 0, 0); }
        if (phase == 2) { playTurn(player, 3, 0, 0); }
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** NEXT PLAYER */
function nextPlayer(player) {
    var next = player + 1;
    if (next == numPlayers) { next = 0; }
    showDialog('It\'s ' + aoPlayers[next].name + '\'s turn!');
    playTurn(next, 0, 0, 0);
}
/****************************************************************************** UPDATE PLAYER */
function showPlayers(player) {
    var ePlayers = $('#players');
    ePlayers.empty();
    
    $('.asset').remove();
    
    for (var i = 0; i < numPlayers; i++) {
        $('#player' + i).remove();
        var eStats = $('<div class="stats"></div>');
        eStats.removeClass("playerHighLight");
        if (i == player) {
            eStats.addClass("playerHighLight");
        }
        var sName = aoPlayers[i].name;
        var nLocation = aoPlayers[i].location % 40;
        var nCredits = aoPlayers[i].credits;

        var eName = $('<p><span>Player: </span><span>' + sName + '</span></p>');
        var eLocation = $('<p><span>Location: </span><span>' + aoTiles[nLocation].title + '</span></p>');
        var eCredits = $('<p><span>Credits: </span><span>' + nCredits + '</span></p>');

        var eAvatarBox = $('#avatarBox' + nLocation);
        var sAvatar = aoPlayers[i].avatar;
        var eAvatar = $('<div id="player' + i + '" class="avatar ' + sAvatar + '"></div>');
        eAvatarBox.append(eAvatar);

        eStats.append(eName)
            .append(eLocation)
            .append(eCredits);

        ePlayers.append(eStats);
    }
    
    for (var i = 0; i < aoTiles.length; i++) {
        $('#tile' + i).removeClass("greenLed").removeClass("yellowLed").removeClass("redLed").removeClass("blueLed");
        $('#tile' + i).removeClass("asset1").removeClass("asset2").removeClass("asset3").removeClass("asset4").removeClass("asset5");
        
        if (!isNaN(aoTiles[i].owner)) {// if tile has owner
            if (aoTiles[i].owner == player) {// if owner is player
                if (aoTiles[i].mortgage == "yes") {
                    $('#tile' + i).addClass("yellowLed");// tile is mortgaged
                }
                else if (checkMonopoly(i, player) == "yes") {
                    $('#tile' + i).addClass("blueLed");// player can build on tile
                }
                else {
                    $('#tile' + i).addClass("greenLed");// player owns tile
                }
            }
            if (aoTiles[i].owner != player) { $('#tile' + i).addClass("redLed"); }// owner is other player
        }
        
        if (aoTiles[i].assets > 0) {
            if (aoTiles[i].assets == 5) {
                var eHotel = $('<div class="asset hotel"></div>');
                $('#assetBox' + i).append(eHotel);
            }
            else {
                for (var n = 0; n < aoTiles[i].assets; n++) {
                    var eHouse = $('<div class="asset house"></div>');
                    $('#assetBox' + i).append(eHouse);
                }
            }
        }
    }
}
/****************************************************************************** SHOW DIALOG POPUP */
function showDialog(text) {
    var eDialog = $('#dialog');
    eDialog.empty()
        .append('<p>' + text + '</p>')
        .dialog();
    setTimeout(function(){
        eDialog.dialog('close');
    }, 1500);
}
/****************************************************************************** DRAW COMMUNITY CHEST CARD */
function drawChestCard(player, phase, roll) {
    var eDialog = $('#dialog2');
    eDialog.empty()
        .append('<p>You can draw a Community Chest card!</p>')
        .dialog({
            modal: true,
            dialogClass: "no-close",
            buttons: [{
                text: "Draw Card",
                click: function() {
                    var nCard = Math.floor(Math.random() * aoChestCards.length);
                    showDialog(aoChestCards[nCard].description);
                    if (aoChestCards[nCard].credits > 0) {
                        aoPlayers[player].credits = aoPlayers[player].credits + aoChestCards[nCard].credits;
                        showPlayers(player);
                    } else {
                        playTurn(player, phase, roll, Math.abs(aoChestCards[nCard].credits));
                    }

                    $(this).dialog("close");
                }
            }]
        });
}
/****************************************************************************** DRAW CHANCE CARD */
function drawChanceCard(player, phase, roll) {
    var eDialog = $('#dialog2');
    eDialog.empty()
        .append('<p>You can draw a Chance card!</p>')
        .dialog({
            modal: true,
            dialogClass: "no-close",
            buttons: [{
                text: "Draw Card",
                click: function() {
                    var nCard = Math.floor(Math.random() * aoChanceCards.length);
                    showDialog(aoChanceCards[nCard].description);
                    if (aoChanceCards[nCard].credits > 0) {
                        aoPlayers[player].credits = aoPlayers[player].credits + aoChanceCards[nCard].credits;
                        showPlayers(player);
                    } else {
                        playTurn(player, phase, roll, Math.abs(aoChanceCards[nCard].credits));
                    }

                    $(this).dialog("close");
                }
            }]
        });
}
/****************************************************************************** SHOW INFO DIALOG */
function showInfo(id, player, phase, roll) {
    $('.infoGreen').removeClass("infoGreen");
    var nLocation = aoPlayers[player].location;
    
    $('.highLight').removeClass("highLight");
    $('#tile' + id).addClass('highLight');
    
    var eInfo = $('#info');
    var eInfoHead = $('<div class="infoHead ' + aoTiles[id].color + '"></div>');
    var eInfoBody = $('<div class="infoBody"></div>');
    var eInfoFoot = $('<div class="infoFoot"></div>');

    eInfo.empty().append(eInfoHead);

    var sTitle = $('<h3>' + aoTiles[id].title + '</h3>');
    eInfoHead.append(sTitle);

    if (!isNaN(aoTiles[id].owner)) {// if tile has an owner
        var sOwner = $('<p><span>Owner:</span><span>' + aoPlayers[aoTiles[id].owner].name + '</span></p>');
        eInfoBody.append(sOwner);
        if (aoTiles[id].mortgage == "yes") { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>Yes</span></p>'); }
        else { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>No</span></p>'); }
        eInfoBody.append(eHasMortgage);

        if (aoTiles[id].owner == player) {
            if (aoTiles[id].mortgage == "yes") {// if property is mortgaged
                var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Pay ' + parseInt(aoTiles[id].price / 2 * 1.1) + ' mortgage</button>');
                eInfoFoot.append(eMortgage);
                eMortgage.click(function() {
                    payMortgage(id, player, phase, roll);
                });
            }
            else {
                if (checkMonopoly(id, player) == "yes") {
                    if (isNaN(aoTiles[id].assets) || aoTiles[id].assets < 5) {
                        if (aoTiles[id].assets == 4) { var sAsset = "Hotel"; }
                        else { var sAsset = "House"; }
                        var eBuild = $('<button type="button" id="build" class="actionButton">Buy ' + sAsset + ' for ' + aoTiles[id].cost + '</button>');
                        eInfoFoot.append(eBuild);
                        eBuild.click(function() {
                            buyAsset(id, player, phase, roll);
                        });
                    }
                }
                if (aoTiles[id].assets > 0) {
                    if (aoTiles[id].assets == 5) { var sAsset = "Hotel"; }
                    else { var sAsset = "House"; }
                    var eSell = $('<button type="button" id="sell" class="actionButton">Sell ' + sAsset + ' for ' + parseInt(aoTiles[id].cost / 2) + '</button>');
                    eInfoFoot.append(eSell);
                    eSell.click(function() {
                        sellAsset(id, player, phase, roll);
                    });
                }
                else {
                    if (checkAssets(id) == 0) {
                        var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Mortgage for ' + parseInt(aoTiles[id].price / 2) + '</button>');
                        eInfoFoot.append(eMortgage);
                        eMortgage.click(function() {
                            buyMortgage(id, player, phase, roll);
                        });
                    }
                }
            }
        }
    }

    if (aoTiles[id].description) {
        var sDescription = $('<p>' + aoTiles[id].description + '</p>');
        eInfoBody.append(sDescription);
    }

    if (aoTiles[id].type == "train" || aoTiles[id].type == "street" || aoTiles[id].type == "utility") {
        var sPrice = $('<p><span>Price:</span><span>' + aoTiles[id].price + '</span></p>');
        var sMortgage = $('<p><span>Mortgage:</span><span>' + aoTiles[id].price / 2 + '</span></p>');            
        eInfoBody.append(sPrice)
            .append(sMortgage);
    }

    if (aoTiles[id].type == "street") {
        var sCost = $('<p><span>Build cost:</span><span>' + aoTiles[id].cost + '</span></p>');
        var sRent = $('<p id="stat1"><span>Base Rent:</span><span>' + aoTiles[id].rent[0] + '</span></p>');
        var sRentM = $('<p id="stat2"><span>=> Monopoly:</span><span>' + aoTiles[id].rent[0] * 2 + '</span></p>');
        var sRentH1 = $('<p id="stat3"><span>=> 1 House:</span><span>' + aoTiles[id].rent[1] + '</span></p>');
        var sRentH2 = $('<p id="stat4"><span>=> 2 Houses:</span><span>' + aoTiles[id].rent[2] + '</span></p>');
        var sRentH3 = $('<p id="stat5"><span>=> 3 Houses:</span><span>' + aoTiles[id].rent[3] + '</span></p>');
        var sRentH4 = $('<p id="stat6"><span>=> 4 Houses:</span><span>' + aoTiles[id].rent[4] + '</span></p>');
        var sRentHotel = $('<p id="stat7"><span>=> 1 Hotel:</span><span>' + aoTiles[id].rent[5] + '</span></p>');
        eInfoBody.append(sCost)
            .append(sRent)
            .append(sRentM)
            .append(sRentH1)
            .append(sRentH2)
            .append(sRentH3)
            .append(sRentH4)
            .append(sRentHotel);
    }

    if (aoTiles[id].type == "train") {
        var sCostR1 = $('<p id="stat1"><span>=> 1 Railroad:</span><span>' + aoTiles[0].trains[0] + '</span></p>');
        var sCostR2 = $('<p id="stat2"><span>=> 2 Railroads:</span><span>' + aoTiles[0].trains[1] + '</span></p>');
        var sCostR3 = $('<p id="stat3"><span>=> 3 Railroads:</span><span>' + aoTiles[0].trains[2] + '</span></p>');
        var sCostR4 = $('<p id="stat4"><span>=> 4 Railroads:</span><span>' + aoTiles[0].trains[3] + '</span></p>');
        eInfoBody.append(sCostR1)
            .append(sCostR2)
            .append(sCostR3)
            .append(sCostR4);
    }

    if (aoTiles[id].type == "utility") {
        var sCostU1 = $('<p id="stat1"><span>=> 1 Utility:</span><span>' + aoTiles[0].utilities[0] + 'x Roll</span></p>');
        var sCostU2 = $('<p id="stat2"><span>=> 2 Utilities:</span><span>' + aoTiles[0].utilities[1] + 'x Roll</span></p>');
        eInfoBody.append(sCostU1)
            .append(sCostU2);
    }
    
    if (id == nLocation) {// if player is here
        if (checkBuy(id, player, phase) == "yes" && aoTiles[id].price >= 0) {// if player can buy
            var eBuy = $('<button type="button" id="buy" class="actionButton">Buy for ' + aoTiles[id].price + '</button>');
            eInfoFoot.append(eBuy);
            eBuy.click(function() {
                buyThis(id, player, phase);
            });
        }

//        if (!isNaN(checkPay(id, player, phase, roll)) && (phase == 1 || phase == 2)) {// if player has to pay
//            var ePay = $('<button type="button" id="pay" class="actionButton">Pay ' + Math.abs(checkPay(id, player, phase, roll)) + '</button>');
//            eInfoFoot.append(ePay);
//            ePay.click(function() {
//                payThis(Math.abs(checkPay(id, player, phase, roll)), id, player, phase);
//            });
//        }
    }
    
    if (eInfoBody.is(':parent')) { eInfo.append(eInfoBody); }
    if (eInfoFoot.is(':parent')) { eInfo.append(eInfoFoot); }
    
    if (!isNaN(aoTiles[id].owner)) {
        if (aoTiles[id].mortgage == "yes") { $('#stat0').addClass("infoGreen"); }
        else {
            if (aoTiles[id].assets > 0) {
                $('#stat' + parseInt(aoTiles[id].assets + 2)).addClass("infoGreen");
            }
            else {
                if (aoTiles[id].type == "street") {
                    if (checkMonopoly(id, aoTiles[id].owner) != "yes" && checkMonopoly(id, aoTiles[id].owner) != "but") {
                        $('#stat1').addClass("infoGreen");
                    }
                    if (checkMonopoly(id, aoTiles[id].owner) == "yes" || checkMonopoly(id, aoTiles[id].owner) == "but") {
                        $('#stat2').addClass("infoGreen");
                    }
                }
                if (aoTiles[id].type == "train" || aoTiles[id].type == "utility") {
                    $('#stat' + checkMonopoly(id, aoTiles[id].owner)).addClass("infoGreen");
                }
            }
        }
    }
}
/****************************************************************************** MORTGAGE PROPERTY */
function buyMortgage(id, player, phase, roll) {
    aoTiles[id].mortgage = "yes";
    aoPlayers[player].credits = aoPlayers[player].credits + (aoTiles[id].price / 2);
    showPlayers(player);
    showInfo(id, player, phase, roll);
}
/****************************************************************************** PAY OFF MORTGAGE */
function payMortgage(id, player, phase, roll) {
    if (aoPlayers[player].credits >= (aoTiles[id].price / 2 * 1.1)) {
        aoTiles[id].mortgage = "no";
        aoPlayers[player].credits = aoPlayers[player].credits - Math.round(aoTiles[id].price / 2 * 1.1);
        showPlayers(player);
        showInfo(id, player, phase, roll);
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** BUY AN ASSET */
function buyAsset(id, player, phase, roll) {
    var bought = "no";
    if (aoPlayers[player].credits >= aoTiles[id].cost) {
        if (isNaN(aoTiles[id].assets)) {
            aoTiles[id].assets = 1;
            bought = "yes";
        }
        else {
            if (checkAssets(id) >= (checkTiles(id) * aoTiles[id].assets)) {
                aoTiles[id].assets = aoTiles[id].assets + 1;
                bought = "yes";
            }
            else {
                showDialog('You have to spread out your assets more evenly accross your monopoly!');
            }
        }
        
        if (bought == "yes") {
            aoPlayers[player].credits = aoPlayers[player].credits - aoTiles[id].cost;
            showPlayers(player);
            showInfo(id, player, phase, roll);
        }
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** SELL AN ASSET */
function sellAsset(id, player, phase, roll) {
    aoTiles[id].assets = aoTiles[id].assets - 1;
    aoPlayers[player].credits = aoPlayers[player].credits + (aoTiles[id].cost / 2);
    showPlayers(player);
    showInfo(id, player, phase, roll);
}
/****************************************************************************** GET VALUE */
function getValue(value) {
    if (value) { return value; }
    return "";
}
/****************************************************************************** CHECK NUMBER OF ASSETS IN MONOPOLY */
function checkAssets(id) {
    var nAssets = 0;
    var sColor = aoTiles[id].color;
    for (var i = 0; i < aoTiles.length; i++) {
        if (aoTiles[i].color == sColor) {
            if (!isNaN(aoTiles[i].assets)) {
                nAssets += aoTiles[i].assets;
            }
        }
    }
    return nAssets;
}
/****************************************************************************** CHECK NUMBER OF TILES IN MONOPOLY */
function checkTiles(id) {
    var nMonopolyHas = 0;
    var sColor = aoTiles[id].color;
    for (var i = 0; i < aoTiles.length; i++) {
        if (sColor == aoTiles[i].color) {
            nMonopolyHas += 1;
        }
    }
    return nMonopolyHas;
}
