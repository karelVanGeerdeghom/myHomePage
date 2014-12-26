var numPlayers = 4;
var aPlayers = [0, 1, 2, 3];
var aChanceCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var aChestCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

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
/****************************************************************************** TOP ROW */
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
/****************************************************************************** RIGHT ROW */
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
/****************************************************************************** BOTTOM ROW */
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
    
/****************************************************************************** LEFT ROW */
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
/****************************************************************************** EVENT LISTENER */  
    $("div[id^='tile']").click(function() {
        showInfo(this.id.match(/\d+/)[0]);
    });
}
/****************************************************************************** CREATE MENU */
function createMenu() {
    var eCenter = $('#center');
    var eMenu = $('<div id="menu" class="menu"></div>');
    eCenter.append(eMenu);
    
    var eDice = $('<div id="dice" class="dice"></div>');
    var eDieOne = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    
    eMenu.append(eDice);
    eDice.append(eDieOne);
    eDice.append(eDieTwo);
    
    var eAction = $('<div id="action" class="action"></div>');
    var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Start Game</button>');
    eMenu.append(eAction);
    eAction.append(eActionButton);

    var ePlayers = $('<div id="players" class="players"></div>');
    eMenu.append(ePlayers);
    
    $(eActionButton).click(function() {
        startGame();
    });
}
/****************************************************************************** START GAME */
function startGame() {
    aChanceCards = shuffleCards(aChanceCards);
    aChestCards = shuffleCards(aChestCards);
    console.log(aChanceCards);
    var nPlayer = aPlayers[0];

    var ePlayers = $('#players');
    
    var eStartAvatarBox = $('#avatarBox0');
    var eCenter = $('#center');
    var eInfo = $('<div id="info" class="info"></div>');
    eCenter.append(eInfo);
    
    for (var i = 0; i < numPlayers; i++) {
        var sAvatar = aoPlayers[aPlayers[i]].avatar;
        var eAvatar = $('<div id="player' + i + '" class="avatar ' + sAvatar + '"></div>');
        eStartAvatarBox.append(eAvatar);
        
        var eStats = $('<div id="stats' + i + '" class="stats"></div>');
        ePlayers.append(eStats);
    }
    
    $("div[id^='stats']").click(function() {
        showBoard(this.id.match(/\d+/)[0]);
    });
    
    showDialog('It\'s ' + aoPlayers[nPlayer].name + '\'s turn!');
    playTurn();
}
/****************************************************************************** PLAY TURN */
function playTurn() {
    var nPlayer = aPlayers[0];
    var eAction = $('#action');

    var nLocation = aoPlayers[nPlayer].location;
    var sRoll = aoPlayers[nPlayer].roll;
    var sDraw = aoPlayers[nPlayer].draw;
    var sPay = aoPlayers[nPlayer].pay;
    var sPriority = aoPlayers[nPlayer].priority;
    
    if (sPriority > 0) {/****************************************************** if player has debt due to card draw payment */
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + sPriority +  '</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            payDebt();
        });
    }
    else {
        if (sDraw == "yes") {/************************************************* if player is allowed to draw card */
            if (aoTiles[nLocation].type == "chest") { drawCard("chest"); }
            if (aoTiles[nLocation].type == "chance") { drawCard("chance"); }
        }

        if (sPay == "yes") {/************************************************** if player is allowed to potentially pay debt */
            checkPay();
            var nDebt = checkDebt();
            console.log(aoPlayers[nPlayer].debt);
        }

        if (nDebt > 0) { /***************************************************** if player has debt */   
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + nDebt +  '</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                payDebt();
            });
        }
        else {/**************************************************************** if player has no debt */
            if (sRoll == "yes") {/********************************************* if player is allowed to roll dice */
                var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
                eAction.empty();
                eAction.append(eActionButton);
                $(eActionButton).click(function() {
                    throwDice();
                });
            }
            else {/************************************************************ if player is not allowed to roll dice */
                var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Next player</button>');
                eAction.empty();
                eAction.append(eActionButton);
                $(eActionButton).click(function() {
                    nextPlayer();
                });
            }
        }
    }

    showInfo(nLocation);
    showPlayers();
}
/****************************************************************************** THROW DICE */
function throwDice() {
    var nPlayer = aPlayers[0];
    var eDice = $('#dice');
    var nDieOne = Math.floor(Math.random() * 6 + 1);
    var nDieTwo = Math.floor(Math.random() * 6 + 1);
    var eDieOne = $('<div id="dieOne" class="die die-' + nDieOne + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + nDieTwo + '"></div>');

    eDice.empty();
    eDice.append(eDieOne);
    eDice.append(eDieTwo);

    var nTotal = nDieOne + nDieTwo + aoPlayers[nPlayer].location;/************** new location */
    
    if (nTotal >= 40) { aoPlayers[nPlayer].credits += 200; }// pass "GO"
    aoPlayers[nPlayer].location = (nTotal) % 40;
    aoPlayers[nPlayer].dice = nDieOne + nDieTwo;
    aoPlayers[nPlayer].buy = "yes";
    aoPlayers[nPlayer].pay = "yes";
    aoPlayers[nPlayer].draw = "yes";
    aoPlayers[nPlayer].pay = "yes";
    
    if (nDieOne == nDieTwo) {/************************************************* if rolled doubles */
        aoPlayers[nPlayer].roll = "yes";
        showDialog('You have rolled doubles, throw again!');
        playTurn();
    }
    else {/******************************************************************** if not rolled doubles */
        aoPlayers[nPlayer].roll = "no";
        playTurn();
    }
}
/****************************************************************************** DRAW COMMUNITY CHEST CARD */
function drawCard(card) {
    var nPlayer = aPlayers[0];
    var eDialog = $('#dialog2');
    var nLocation = aoPlayers[nPlayer].location;
    switch (card) {
        case "chest":
            var aoCards = aoChestCards;
            var sCard = "Community Chest";
            var nCard = aChestCards[0];
            aChestCards.splice(0, 1);
            aChestCards.push(nCard);
        break;
        case "chance":
            var aoCards = aoChanceCards;
            var sCard = "Chance";
            var nCard = aChanceCards[0];
            aChanceCards.splice(0, 1);
            aChanceCards.push(nCard);
        break;
    }
    eDialog.empty()
        .append('<p>You can draw a ' + sCard + ' card!</p>')
        .dialog({
            modal: true,
            dialogClass: "no-close",
            buttons: [{
                text: "Draw Card",
                click: function() {
                    aoPlayers[nPlayer].draw = "no"
                    showDialog(aoCards[nCard].description);
                    if (aoCards[nCard].credits > 0) {/************************* card says collect credits */
                        aoPlayers[nPlayer].credits += aoCards[nCard].credits;
                        showPlayers();
                    } 
                    if (aoCards[nCard].credits < 0) {/************************* card says pay credits */
                        aoPlayers[nPlayer].debt[4] = Math.abs(aoCards[nCard].credits);
                        playTurn();
                    }
                    if (aoCards[nCard].location >= 0) {/*********************** card says relocate forward */
                        if (aoCards[nCard].location > nLocation) {/************ location is further along */
                            aoPlayers[nPlayer].location = aoCards[nCard].location;
                            playTurn();
                        }
                        if (aoCards[nCard].location < nLocation) {/************ location is back a way */
                            aoPlayers[nPlayer].location = aoCards[nCard].location;
                            aoPlayers[nPlayer].credits += 200;
                            playTurn();
                        }
                    }
                    if (aoCards[nCard].location < 0) {/************************ card says relocate backwards */
                        aoPlayers[nPlayer].location += aoCards[nCard].location;
                            playTurn();
                    }
                    if (aoCards[nCard].house > 0) {/*************************** card says pay credits for houses/hotels */
                        var nHouses = 0;
                        var nHotels = 0;
                        var nTotal = 0;
                        for (var i = 0; i < aoTiles.length; i++) {
                            if (aoTiles[i].owner == nPlayer) {
                                if (aoTiles[i].assets == 5) { nHotels += 1; }
                                if (aoTiles[i].assets < 5) { nHouses += aoTiles[i].assets; }
                            }
                        }
                        nTotal = nHouses * aoCards[nCard].house + nHotels * aoCards[nCard].hotel;
                        if (nTotal > 0) {
                            aoPlayers[nPlayer].debt[4] = nTotal;
                            playTurn();
                        }
                    }
                    
                    if (aoCards[nCard].players < 0) {/************************* card says pay credits to all players */
                        for (var i = 0; i < numPlayers; i++) {
                            if (i != nPlayer) {
                                aoPlayers[nPlayer].debt[i] = Math.abs(aoCards[nCard].players);
                            }
                        }
                        playTurn();
                    }
                    
                    if (aoCards[nCard].players > 0) {/************************* card says receive credits from all players */
                        for (var i = 0; i < numPlayers; i++) {
                            if (i != nPlayer) {
                                if (aoPlayers[i].credits >= aoCards[nCard].players) {
                                    aoPlayers[i].credits -= aoCards[nCard].players;
                                }
                                else {
                                    aoPlayers[i].priority = aoCards[nCard].players - aoPlayers[i].credits;
                                    aoPlayers[i].credits = 0;
                                }
                            }
                        }
                        aoPlayers[nPlayer].credits += (aoCards[nCard].players * (numPlayers - 1));
                        playTurn();
                    }

                    $(this).dialog("close");
                }
            }]
        });
}
/****************************************************************************** NEXT PLAYER */
function nextPlayer() {
    var nOldPlayer = aPlayers[0];
    aoPlayers[nOldPlayer].roll = "yes";
    aoPlayers[nOldPlayer].buy = "no";
    aoPlayers[nOldPlayer].pay = "no";
    aoPlayers[nOldPlayer].draw = "no";
    
    aPlayers.splice(0, 1);
    aPlayers.push(nOldPlayer);
    
    var nNewPlayer = aPlayers[0];

    showDialog('It\'s ' + aoPlayers[nNewPlayer].name + '\'s turn!');
    playTurn();
}
/****************************************************************************** UPDATE PLAYER */
function showPlayers() {
    var nPlayer = aPlayers[0];
    
    for (var i = 0; i < numPlayers; i++) {
        $('#player' + i).remove();
        var eStats = $('#stats' + i);
        eStats.empty().removeClass("playerHighLight");
        if (i == nPlayer) {
            eStats.addClass("playerHighLight");
        }
        var sName = aoPlayers[i].name;
        var nLocation = aoPlayers[i].location % 40;
        var nCredits = aoPlayers[i].credits;
        var nWealth = checkWealth(i);

        var eName = $('<p><span>Player: </span><span>' + sName + '</span></p>');
        var eLocation = $('<p><span>Location: </span><span>' + aoTiles[nLocation].title + '</span></p>');
        var eCredits = $('<p><span>Credits: </span><span>' + nCredits + ' (' + nWealth + ')</span></p>');

        var eAvatarBox = $('#avatarBox' + nLocation);
        var sAvatar = aoPlayers[i].avatar;
        var eAvatar = $('<div id="player' + i + '" class="avatar ' + sAvatar + '"></div>');
        eAvatarBox.append(eAvatar);

        eStats.append(eName)
            .append(eLocation)
            .append(eCredits);
    }

    showBoard(nPlayer);
}
/****************************************************************************** SHOW CURRENT BOARD CONFIGURATION */
function showBoard(player) {
    $('.asset').remove();
    var nLocation = aoPlayers[player].location;

    var eStats = $('#stats' + player);
    $('.playerHighLight').removeClass("playerHighLight");
    eStats.addClass("playerHighLight");

    $('.highLight').removeClass("highLight");
    $('#tile' + nLocation).addClass('highLight');

    for (var i = 0; i < aoTiles.length; i++) {
        $('#tile' + i).removeClass("greenLed").removeClass("yellowLed").removeClass("redLed").removeClass("blueLed");
        $('#tile' + i).removeClass("asset1").removeClass("asset2").removeClass("asset3").removeClass("asset4").removeClass("asset5");
        
        if (!isNaN(aoTiles[i].owner)) {// if tile has owner
            if (aoTiles[i].owner == player) {// if owner is player
                if (aoTiles[i].mortgage == "yes") {
                    $('#tile' + i).addClass("yellowLed");// tile is mortgaged
                }
                else if (checkMonopoly(i) == "yes") {
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
    var eMenu = $('#menu');
    eDialog.empty()
        .append('<p>' + text + '</p>')
        .dialog({
            position: { my: "left top", at: "right top", of: eMenu }
        });
    setTimeout(function(){
        eDialog.dialog('close');
    }, 2000);
}
/****************************************************************************** SHOW INFO DIALOG */
function showInfo(id) {
    var nPlayer = aPlayers[0];
    $('.infoGreen').removeClass("infoGreen");
    var nLocation = aoPlayers[nPlayer].location;
    
    $('.highLight').removeClass("highLight");
    $('#tile' + id).addClass('highLight');
    
    var eInfo = $('#info');
    var eInfoHead = $('<div class="infoHead ' + aoTiles[id].color + '"></div>');
    var eInfoBody = $('<div class="infoBody"></div>');
    var eInfoFoot = $('<div class="infoFoot"></div>');

    eInfo.empty().append(eInfoHead);

    var sTitle = $('<h3>' + aoTiles[id].title + '</h3>');
    eInfoHead.append(sTitle);
    
    if (aoTiles[id].price > 0) {
        if (aoTiles[id].mortgage == "yes") { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>Yes</span></p>'); }
        else { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>No</span></p>'); }
        eInfoBody.append(eHasMortgage);
    }

    if (!isNaN(aoTiles[id].owner)) {/****************************************** if tile has an owner */
        var sOwner = $('<p><span>Owner:</span><span>' + aoPlayers[aoTiles[id].owner].name + '</span></p>');
        eInfoBody.append(sOwner);

        if (aoTiles[id].owner == nPlayer) {
            if (aoTiles[id].mortgage == "yes") {/****************************** if property is mortgaged */
                var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Pay ' + parseInt(aoTiles[id].price / 2 * 1.1) + ' mortgage</button>');
                eInfoFoot.append(eMortgage);
                eMortgage.click(function() {
                    payMortgage(id);
                });
                var eSell = $('<button type="button" id="sell" class="actionButton">Sell for ' + aoTiles[id].price / 2 + '</button>');
                eInfoFoot.append(eSell);
                eSell.click(function() {
                    sellProperty(id);
                });
            }
            else {
                if (checkMonopoly(id) == "yes") {/***************************** allowed to buy assets */
                    if (isNaN(aoTiles[id].assets) || aoTiles[id].assets < 5) {
                        if (aoTiles[id].assets == 4) { var sAsset = "Hotel"; }
                        else { var sAsset = "House"; }
                        var eBuild = $('<button type="button" id="build" class="actionButton">Buy ' + sAsset + ' for ' + aoTiles[id].cost + '</button>');
                        eInfoFoot.append(eBuild);
                        eBuild.click(function() {
                            getAsset(id);
                        });
                    }
                }
                if (aoTiles[id].assets > 0) {/********************************* allowed to sell assets */
                    if (aoTiles[id].assets == 5) { var sAsset = "Hotel"; }
                    else { var sAsset = "House"; }
                    var eSell = $('<button type="button" id="sell" class="actionButton">Sell ' + sAsset + ' for ' + parseInt(aoTiles[id].cost / 2) + '</button>');
                    eInfoFoot.append(eSell);
                    eSell.click(function() {
                        sellAsset(id);
                    });
                }
                else {
                    if (checkAssets(id) == 0) {/******************************* allow to mortgage if no assets in monopoly */
                        var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Mortgage for ' + parseInt(aoTiles[id].price / 2) + '</button>');
                        eInfoFoot.append(eMortgage);
                        eMortgage.click(function() {
                            getMortgage(id);
                        });
                    }
                }
            }
        }
    }

    if (aoTiles[id].description) {/******************************************** show description if there is one */
        var sDescription = $('<p>' + aoTiles[id].description + '</p>');
        eInfoBody.append(sDescription);
    }

    if (aoTiles[id].type == "train" || aoTiles[id].type == "street" || aoTiles[id].type == "utility") {// show price if buyable
        var sPrice = $('<p><span>Price:</span><span>' + aoTiles[id].price + '</span></p>');
        var sMortgage = $('<p><span>Mortgage:</span><span>' + aoTiles[id].price / 2 + '</span></p>');            
        eInfoBody.append(sPrice)
            .append(sMortgage);
    }

    if (aoTiles[id].type == "street") {/*************************************** show street stats */
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

    if (aoTiles[id].type == "train") {/**************************************** show railroad stats */
        var sCostR1 = $('<p id="stat1"><span>=> 1 Railroad:</span><span>' + aoTiles[0].trains[0] + '</span></p>');
        var sCostR2 = $('<p id="stat2"><span>=> 2 Railroads:</span><span>' + aoTiles[0].trains[1] + '</span></p>');
        var sCostR3 = $('<p id="stat3"><span>=> 3 Railroads:</span><span>' + aoTiles[0].trains[2] + '</span></p>');
        var sCostR4 = $('<p id="stat4"><span>=> 4 Railroads:</span><span>' + aoTiles[0].trains[3] + '</span></p>');
        eInfoBody.append(sCostR1)
            .append(sCostR2)
            .append(sCostR3)
            .append(sCostR4);
    }

    if (aoTiles[id].type == "utility") {/************************************** show utility stats */
        var sCostU1 = $('<p id="stat1"><span>=> 1 Utility:</span><span>' + aoTiles[0].utilities[0] + 'x Roll</span></p>');
        var sCostU2 = $('<p id="stat2"><span>=> 2 Utilities:</span><span>' + aoTiles[0].utilities[1] + 'x Roll</span></p>');
        eInfoBody.append(sCostU1)
            .append(sCostU2);
    }
    
    if (id == nLocation) {/**************************************************** if player is here */
        if (checkBuy() == "yes" && aoTiles[id].price >= 0) {/************ if player can buy */
            var eBuy = $('<button type="button" id="buy" class="actionButton">Buy for ' + aoTiles[id].price + '</button>');
            eInfoFoot.append(eBuy);
            eBuy.click(function() {
                getProperty();
            });
        }
    }
    
    if (eInfoBody.is(':parent')) { eInfo.append(eInfoBody); }
    if (eInfoFoot.is(':parent')) { eInfo.append(eInfoFoot); }
    
    if (!isNaN(aoTiles[id].owner)) {// if property is owned */
        if (aoTiles[id].mortgage == "yes") { $('#stat0').addClass("infoGreen"); }// highlight mortgaged if property has mortgage */
        else {
            if (aoTiles[id].assets > 0) {
                $('#stat' + parseInt(aoTiles[id].assets + 2)).addClass("infoGreen");// highlight rent due to assets */
            }
            else {
                if (aoTiles[id].type == "street") {
                    if (checkMonopoly(id) != "yes" && checkMonopoly(id) != "but") {// highlight base rent if no monopoly */
                        $('#stat1').addClass("infoGreen");
                    }
                    if (checkMonopoly(id) == "yes" || checkMonopoly(id) == "but") {// highlight monopoly rent */
                        $('#stat2').addClass("infoGreen");
                    }
                }
                if (aoTiles[id].type == "train" || aoTiles[id].type == "utility") {// highlight rent due to number of railroads or utilities */
                    $('#stat' + checkMonopoly(id)).addClass("infoGreen");
                }
            }
        }
    }
}
/****************************************************************************** CHECK TOTAL WEALTH OF PLAYER */
function checkWealth(player) {
    var nWealth = aoPlayers[player].credits;
    for (var i = 0; i < aoTiles.length; i++) {
        if (aoTiles[i].owner == player) {
            if (aoTiles[i].mortgage == "yes") {
                nWealth += aoTiles[i].price / 2;
            }
            else {
                nWealth += aoTiles[i].price;
            }
            if (aoTiles[i].asssets > 0) {
                nWealth += aoTiles[i].assets * aoTiles[i].cost;
            }
        }
    }
    return nWealth;
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
/****************************************************************************** CHECK NUMBER OF PROPERTIES IN MONOPOLY */
function checkProperties(id) {
    var nMonopolyHas = 0;
    var sColor = aoTiles[id].color;
    for (var i = 0; i < aoTiles.length; i++) {
        if (sColor == aoTiles[i].color) {
            nMonopolyHas += 1;
        }
    }
    return nMonopolyHas;
}
/****************************************************************************** CHECK IF PLAYER HAS DEBT */
function checkDebt() {
    var nPlayer = aPlayers[0];
    var nPriority = aoPlayers[nPlayer].priority;
    var nPlayerDebt = 0;
    for (var i = 0; i < 5; i++) {
        nPlayerDebt += aoPlayers[nPlayer].debt[i];
    }
    return nPlayerDebt + nPriority;
}
/****************************************************************************** CHECK IF PLAYER CAN BUY */
function checkBuy() {
    var nPlayer = aPlayers[0];
    var sBuy = aoPlayers[nPlayer].buy;
    var nLocation = aoPlayers[nPlayer].location;
    if (isNaN(aoTiles[nLocation].owner) && aoTiles[nLocation].price > 0 && sBuy == "yes") {
        return "yes";
    }
}
/****************************************************************************** CHECK IF PLAYER HAS MONOPOLY ON TILE */
function checkMonopoly(id) {
    var nPlayerHas = 0;
    var nMonopolyHas = 0;
    var nMortgages = 0;
    var sOwner = aoTiles[id].owner;
    var sType = aoTiles[id].type;
    var sColor = aoTiles[id].color;

    if (sType == "street") {
        for (var i = 0; i < aoTiles.length; i++) {
            if (aoTiles[i].color == sColor) {
                nMonopolyHas += 1;//number of tiles in monopoly of that color
                if (aoTiles[i].owner == sOwner) { nPlayerHas += 1; }//number of tiles of that color owner has
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
                if (aoTiles[i].owner == sOwner) { nPlayerHas += 1; }//number of tiles of that color owner has
            }
        }
        return nPlayerHas;
    }
}
/****************************************************************************** CHECK WHAT PLAYER HAS TO PAY */
function checkPay() {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var nDice = aoPlayers[nPlayer].dice;
    
    var nOwner = aoTiles[nLocation].owner;
    var nPrice = aoTiles[nLocation].price;
    var sType = aoTiles[nLocation].type;
    var nAssets = aoTiles[nLocation].assets;
    var sMortgage = aoTiles[nLocation].mortgage;

    if (!isNaN(nOwner) && nOwner != nPlayer && sMortgage != "yes") {
        if (sType == "street") {
            if (!isNaN(nAssets)) {  aoPlayers[nPlayer].debt[nOwner] = aoTiles[nLocation].rent[nAssets]; }// rent if owner has assets
            else {
                if (checkMonopoly(nLocation) == "yes" || checkMonopoly(nLocation) == "but") { aoPlayers[nPlayer].debt[nOwner] = aoTiles[nLocation].rent[0] * 2; }// rent if owner has monopoly
                aoPlayers[nPlayer].debt[nOwner] = aoTiles[nLocation].rent[0];
            }
        }
        if (sType == "train") { aoPlayers[nPlayer].debt[nOwner] = aoTiles[0].trains[checkMonopoly(nLocation) - 1]; }// fee from railroads
        if (sType == "utility") { aoPlayers[nPlayer].debt[nOwner] = aoTiles[0].utilities[checkMonopoly(nLocation) - 1] * nDice; }// fee from utilities
    }

    if (nPrice < 0) { aoPlayers[nPlayer].debt[4] = Math.abs(parseInt(nPrice)); }// taxes
}
/****************************************************************************** BUY THIS */
function getProperty() {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    if (aoPlayers[nPlayer].credits >= aoTiles[nLocation].price) {
        aoTiles[nLocation].owner = nPlayer;
        aoPlayers[nPlayer].credits -= aoTiles[nLocation].price;

        showPlayers();
        showInfo(nLocation);
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** MORTGAGE PROPERTY */
function getMortgage(id) {
    var nPlayer = aPlayers[0];
    aoTiles[id].mortgage = "yes";
    aoPlayers[nPlayer].credits += (aoTiles[id].price / 2);
    showPlayers();
    showInfo(id);
}
/****************************************************************************** BUY AN ASSET */
function getAsset(id) {
    var nPlayer = aPlayers[0];
    var bought = "no";
    if (aoPlayers[nPlayer].credits >= aoTiles[id].cost) {
        if (isNaN(aoTiles[id].assets)) {
            aoTiles[id].assets = 1;
            bought = "yes";
        }
        else {
            if (checkAssets(id) >= (checkProperties(id) * aoTiles[id].assets)) {
                aoTiles[id].assets = aoTiles[id].assets + 1;
                bought = "yes";
            }
            else {
                showDialog('You have to spread out your assets more evenly accross your monopoly!');
            }
        }
        
        if (bought == "yes") {
            aoPlayers[nPlayer].credits -= aoTiles[id].cost;
            showPlayers();
            showInfo(id);
        }
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** GET VALUE */
function getValue(value) {
    if (value) { return value; }
    return "";
}
/****************************************************************************** PAY THIS */
function payDebt() {
    var nPlayer = aPlayers[0];
    var nDebt = checkDebt();
    
    if (aoPlayers[nPlayer].credits >= nDebt) {
        for (var i = 0; i < 4; i++) {
            aoPlayers[i].credits += aoPlayers[nPlayer].debt[i];
        }
        aoPlayers[nPlayer].credits -= nDebt;
        aoPlayers[nPlayer].pay = "no";
        aoPlayers[nPlayer].priority = 0;
        aoPlayers[nPlayer].debt = [0, 0, 0, 0, 0];

        showPlayers();
        playTurn();
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** PAY OFF MORTGAGE */
function payMortgage(id) {
    var nPlayer = aPlayers[0];
    if (aoPlayers[nPlayer].credits >= (aoTiles[id].price / 2 * 1.1)) {
        aoTiles[id].mortgage = "no";
        aoPlayers[nPlayer].credits -= Math.round(aoTiles[id].price / 2 * 1.1);
        showPlayers();
        showInfo(id);
    }
    else {
        showDialog('Not enough credits!');
    }
}
/****************************************************************************** SELL AN ASSET */
function sellAsset(id) {
    var nPlayer = aPlayers[0];
    aoTiles[id].assets = aoTiles[id].assets - 1;
    aoPlayers[nPlayer].credits += (aoTiles[id].cost / 2);
    showPlayers();
    showInfo(id);
}
/****************************************************************************** SELL A PROPERTY */
function sellProperty(id) {
    var nOwner = aoTiles[id].owner;
    aoPlayers[nOwner].credits += aoTiles[id].price / 2;
    delete aoTiles[id].owner;
    
    showPlayers();
    showInfo(id);
}
/****************************************************************************** SHUFFLE CARDS */
function shuffleCards(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
}
