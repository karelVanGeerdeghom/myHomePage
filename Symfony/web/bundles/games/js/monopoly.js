var numPlayers = 2;
var test = 0;

$(function() {
    var eContainer = $('#content');

    createBoard(eContainer);
    createMenu(eContainer);
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

    for (var i = 1; i <= 9; i++) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getValue(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');

        $(eTopBar).append(eHorTile);
        $(eHorTile).append(eTileBody);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);
    }
    
    var eJail = $('<div id="tile10" class="corner jail"></div>');
    $(eTopBar).append(eJail);
/********************************* RIGHT ROW */
    for (var i = 11; i <= 19; i++) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileRight ' + getValue(aoTiles[i].type) + ' ' + getValue(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');

        $(eRightBar).append(eVerTile);
        $(eVerTile).append(eTileBody);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);    
    }
/********************************* BOTTOM ROW */
    var eCop = $('<div id="tile30" class="corner cop"></div>');
    $(eBottomBar).append(eCop);

    for (var i = 29; i >= 21; i--) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileBottom ' + getValue(aoTiles[i].type) + ' ' + getValue(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');

        $(eBottomBar).append(eHorTile);
        $(eHorTile).append(eTileBody);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);
    }
    
    var ePark = $('<div id="tile20" class="corner park"></div>');
    $(eBottomBar).append(ePark);
/********************************* LEFT ROW */
    for (var i = 39; i >= 31; i--) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getValue(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getValue(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="name">' + getValue(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="price">' + getValue(aoTiles[i].price) + '</p>');

        $(eLeftBar).append(eVerTile);
        $(eVerTile).append(eTileBody);
        $(eTileBody).append(eTileBodyName);
        $(eTileBody).append(eTileBodyPrice);
    }
}
/****************************************************************************** CREATE MENU */
function createMenu(container) {
    var eMenu = $('<div id="menu" class="menu"></div>');
    container.append(eMenu);
    
    var eDice = $('<div id="dice" class="dice" title="Throw dice"></div>');
    var eDieOne = $('<div id="dieOne" class="die die-1"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-1"></div>');
    
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
    var eStart = $('#tile0');
    var eCenter = $('#center');
    var eInfo = $('<div id="info" class="info"></div>');
    eCenter.append(eInfo);
    
    for (var i = 0; i < numPlayers; i++) {
        var sAvatar = aoPlayers[i].avatar;
        var eAvatar = $('<div id="player' + i + '" class="avatar ' + sAvatar + '"></div>');
        eStart.append(eAvatar);
    }
    
    showDialog('It\'s ' + aoPlayers[0].name + '\'s turn!');
    playTurn(0, 0, 0);
}
/****************************************************************************** PLAY TURN */
function playTurn(player, phase, roll) {
    var eAction = $('#action');
    var nLocation = aoPlayers[player].location;
    var nPay = checkPay(nLocation, player, phase, roll);

/********************************* EVENT LISTENER */  
    $("div[id^='tile']").click(function() {
        showInfo(this.id.match(/\d+/)[0], player, phase, roll);
    }); ; 

    showInfo(nLocation, player, phase, roll);
    $('.highLight').removeClass("highLight");

    if (phase == 0) {
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            throwDice(player);
        });
    }
    
    if (phase == 1) {
        showDialog('You rolled doubles, you can throw again!');
        if (!isNaN(nPay)) {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + Math.abs(nPay) + '</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                payThis(Math.abs(nPay), nLocation, player, phase);
            });
        }
    }
    
    if (phase == 2) {
        if (isNaN(nPay)) {
            playTurn(player, 3, roll);
        }
        else {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + Math.abs(nPay) + '</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                payThis(Math.abs(nPay), nLocation, player, phase);
                
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
        playTurn(player, 1, nTotal);
    }
    else {
        playTurn(player, 2, nTotal);
    }
}
/****************************************************************************** CHECK IF PLAYER CAN BUY */
function checkBuy(id, player, phase) {
    var nLocation = aoPlayers[player].location;
    if (isNaN(aoTiles[id].owner) && aoTiles[id].price > 0 && id == nLocation && phase > 0) {
        return "yes";
    }
}
/****************************************************************************** CHECK WHAT PLAYER HAS TO PAY */
function checkPay(id, player, phase, roll) {
    var nOwner = aoTiles[id].owner;
    var nPrice = aoTiles[id].price;
    var sType = aoTiles[id].type;
    var sColor = aoTiles[id].color;
    var nAssets = aoTiles[id].assets;
    var nLocation = aoPlayers[player].location;
    var sMortgage = aoTiles[id].mortgage;
    if (!isNaN(nOwner) && nOwner != player && id == nLocation && sMortgage != "yes" && (phase == 1 || phase == 2)) {
        var nOwnerHas = 0;
        var nMonopolyHas = 0;
        var nTrainHas = 0;
        var nUtilityHas = 0;
        
        for (var i = 0; i < aoTiles.length; i++) {
            if (aoTiles[i].color == sColor) {
                nMonopolyHas += 1;//number of tiles in monopoly of that color
                if (aoTiles[i].owner == nOwner) { nOwnerHas += 1; }//number of tiles of that color owner has
            }
            if (aoTiles[i].type == "train" && aoTiles[i].owner == nOwner) { nTrainHas += 1; }//number of railoads owner has
            if (aoTiles[i].type == "utility" && aoTiles[i].owner == nOwner) { nUtilityHas += 1; }//number of utilities owner has
        }
        
        if (sType == "street") {// streets
            if (!isNaN(nAssets)) { return aoTiles[id].rent[nAssets]; }// rent if owner has assets
            if (nMonopolyHas == nOwnerHas) { return aoTiles[id].rent[0] * 2; }// rent if owner has monopoly
            return aoTiles[id].rent[0];// rent if owner doesn't have monopoly
        }
        if (sType == "train") { return aoTiles[0].trains[nTrainHas - 1]; }// fee from railroads
        if (sType == "utility") { return aoTiles[0].utilities[nUtilityHas - 1] * roll; }// fee from utilities
    }
    if (nPrice < 0 && (phase == 1 || phase == 2)) { return nPrice; }// taxes
}
/****************************************************************************** BUY THIS */
function buyThis(id, player, phase) {
    aoTiles[id].owner = player;
    aoPlayers[player].credits = aoPlayers[player].credits - aoTiles[id].price;
    
    showPlayers(player);
    showInfo(id, player, phase, 0);
}
/****************************************************************************** PAY THIS */
function payThis(amount, id, player, phase) {
    if (!isNaN(aoTiles[id].owner)) {
        aoPlayers[aoTiles[id].owner].credits = aoPlayers[aoTiles[id].owner].credits + amount;
    }
    aoPlayers[player].credits = aoPlayers[player].credits - amount;
    showPlayers(player);
    
    if (phase == 1) { playTurn(player, 0, 0); }
    if (phase == 2) { playTurn(player, 3, 0); }
}
/****************************************************************************** NEXT PLAYER */
function nextPlayer(player) {
    var next = player + 1;
    if (next == numPlayers) { next = 0; }
    showDialog('It\'s ' + aoPlayers[next].name + '\'s turn!');
    playTurn(next, 0, 0);
}
/****************************************************************************** UPDATE PLAYER */
function showPlayers(player) {
    var ePlayers = $('#players');
    ePlayers.empty();
    
    $('#player' + player).remove();
    
    var eStats = $('<div id="player" class="stats"></div>');
    var sName = aoPlayers[player].name;
    var nLocation = aoPlayers[player].location % 40;
    var nCredits = aoPlayers[player].credits;
    var sAvatar = aoPlayers[player].avatar;
    
    var eName = $('<p><span>Player: </span><span>' + sName + '</span></p>');
    var eLocation = $('<p><span>Location: </span><span>' + aoTiles[nLocation].title + '</span></p>');
    var eCredits = $('<p><span>Credits: </span><span>' + nCredits + '</span></p>');
    var eAvatar = $('<div id="player' + player + '" class="avatar ' + sAvatar + '"></div>');
    
    var eTile = $('#tile' + nLocation);
    eTile.append(eAvatar);
    eTile.addClass('highLight');
    
    eStats.append(eName)
        .append(eLocation)
        .append(eCredits);

    ePlayers.append(eStats);    
}
/****************************************************************************** SHOW DIALOG POPUP */
function showDialog(text) {
    var eDialog = $('#dialog');
    eDialog.empty()
        .append('<p>' + text + '</p>')
        .dialog();
    setTimeout(function(){
        eDialog.dialog('close');
    }, 1000);
}
/****************************************************************************** SHOW INFO DIALOG */
function showInfo(id, player, phase, roll) {
    var nLocation = aoPlayers[player].location;
    
    var eInfo = $('#info');
    var eInfoHead = $('<div class="infoHead ' + aoTiles[id].color + '"></div>');
    var eInfoBody = $('<div class="infoBody"></div>');
    var eInfoFoot = $('<div class="infoFoot"></div>');

    eInfo.empty()
        .append(eInfoHead)
        .append(eInfoBody)
        .append(eInfoFoot);

    var sTitle = $('<h3>' + aoTiles[id].title + '</h3>');
    eInfoHead.append(sTitle);

    if (!isNaN(aoTiles[id].owner)) {
        var sOwner = $('<p><span>Owner:</span><span>' + aoPlayers[aoTiles[id].owner].name + '</span></p>');
        eInfoBody.append(sOwner);
        if (aoTiles[id].mortgage != "yes") {
            if (aoTiles[id].owner == player) {
                var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Mortgage</button>');
                eInfoFoot.append(eMortgage);
                eMortgage.click(function() {
                    buyMortgage(id, player, phase, roll);
                });
            }
        }
        else {
            var eHasMortgage = $('<p><span>Mortgaged:</span><span>Yes</span></p>');
            eInfoBody.append(eHasMortgage);
            if (aoTiles[id].owner == player) {
                var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Pay off mortgage</button>');
                eInfoFoot.append(eMortgage);
                eMortgage.click(function() {
                    payMortgage(id, player, phase, roll);
                });
            }
        }
    }

    if (aoTiles[id].description) {
        var sDescription = $('<p>' + aoTiles[id].description + '</p>');
        eInfoBody.append(sDescription);
    }

    if (aoTiles[id].type == "train" || aoTiles[id].type == "street" || aoTiles[id].type == "water" || aoTiles[id].type == "electricity") {
        var sPrice = $('<p><span>Price:</span><span>' + aoTiles[id].price + '</span></p>');
        var sMortgage = $('<p><span>Mortgage:</span><span>' + aoTiles[id].price / 2 + '</span></p>');            
        eInfoBody.append(sPrice)
            .append(sMortgage);
    }

    if (aoTiles[id].type == "street") {
        var sCost = $('<p><span>Build cost:</span><span>' + aoTiles[id].cost + '</span></p>');
        var sRent = $('<p><span>Base Rent:</span><span>' + aoTiles[id].rent[0] + '</span></p>');
        var sRentM = $('<p><span>-> Monopoly:</span><span>' + aoTiles[id].rent[0] * 2 + '</span></p>');
        var sRentH1 = $('<p><span>-> 1 House:</span><span>' + aoTiles[id].rent[1] + '</span></p>');
        var sRentH2 = $('<p><span>-> 2 Houses:</span><span>' + aoTiles[id].rent[2] + '</span></p>');
        var sRentH3 = $('<p><span>-> 3 Houses:</span><span>' + aoTiles[id].rent[3] + '</span></p>');
        var sRentH4 = $('<p><span>-> 4 Houses:</span><span>' + aoTiles[id].rent[4] + '</span></p>');
        var sRentHotel = $('<p><span>-> 1 Hotel:</span><span>' + aoTiles[id].rent[5] + '</span></p>');
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
        var sCostR1 = $('<p><span>-> 1 Railroad:</span><span>' + aoTiles[0].trains[0] + '</span></p>');
        var sCostR2 = $('<p><span>-> 2 Railroads:</span><span>' + aoTiles[0].trains[1] + '</span></p>');
        var sCostR3 = $('<p><span>-> 3 Railroads:</span><span>' + aoTiles[0].trains[2] + '</span></p>');
        var sCostR4 = $('<p><span>-> 4 Railroads:</span><span>' + aoTiles[0].trains[3] + '</span></p>');
        eInfoBody.append(sCostR1)
            .append(sCostR2)
            .append(sCostR3)
            .append(sCostR4);
    }

    if (aoTiles[id].type == "utility") {
        var sCostU1 = $('<p><span>-> 1 Utility:</span><span>' + aoTiles[0].utilities[0] + 'x Roll</span></p>');
        var sCostU2 = $('<p><span>-> 2 Utilities:</span><span>' + aoTiles[0].utilities[1] + 'x Roll</span></p>');
        eInfoBody.append(sCostU1)
            .append(sCostU2);
    }
    if (id == nLocation) {
        if (checkBuy(id, player, phase) == "yes" && aoTiles[id].price >= 0) {
            var eBuy = $('<button type="button" id="buy" class="actionButton">Buy</button>');
            eInfoFoot.append(eBuy);
            eBuy.click(function() {
                buyThis(id, player, phase);
            });
        }

        if (!isNaN(checkPay(id, player, phase, roll)) && (phase == 1 || phase == 2)) {
            var ePay = $('<button type="button" id="pay" class="actionButton">Pay ' + Math.abs(checkPay(id, player, phase, roll)) + '</button>');
            eInfoFoot.append(ePay);
            ePay.click(function() {
                payThis(Math.abs(checkPay(id, player, phase, roll)), id, player, phase);
            });
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
    aoTiles[id].mortgage = "no";
    aoPlayers[player].credits = aoPlayers[player].credits - (aoTiles[id].price / 2 * 1.1);
    showPlayers(player);
    showInfo(id, player, phase, roll);
}
/****************************************************************************** GET VALUE */
function getValue(value) {
    if (value) { return value; }
    return "";
}