var aPlayers = [0, 1, 2, 3];
var aChestCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var aChanceCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var sTradeMode = "";
var aCartLeft = [];
var aCartRight = [];

$(function() {
    var eContainer = $('#content');

    createBoard(eContainer);
    createMenu();
    shuffleCards(aChanceCards);
    shuffleCards(aChestCards);
});

function createBoard(container) {
    var eModalChanceDialog = $('<div id="modalChanceDialog" class="dialog" title="Warning!"></div>');
    var eModalChestDialog = $('<div id="modalChestDialog" class="dialog" title="Warning!"></div>');
    var eModalJailDialog = $('<div id="modalJailDialog" class="dialog" title="Warning!"></div>');
    var eDiceDialog = $('<div id="diceDialog" class="dialog" title="Doubles!"></div>');
    var eChanceCardDialog = $('<div id="chanceCardDialog" class="dialog" title="Chance Card"></div>');
    var eChestCardDialog = $('<div id="chestCardDialog" class="dialog" title="Community Chest Card"></div>');
    var eTurnDialog = $('<div id="turnDialog" class="dialog" title="New Turn"></div>');
    var eBuyDialog = $('<div id="buyDialog" class="dialog"  title="Buy Property"></div>');
    var eWarningDialog = $('<div id="warningDialog" class="dialog" title="Warning!"></div>');
    var eGoDialog = $('<div id="goDialog" class="dialog" title="Go!"></div>');
    var eMonopolyDialog = $('<div id="monopolyDialog" class="dialog" title="Monopoly!"></div>');
    var eJailDialog = $('<div id="jailDialog" class="dialog" title="Jail!"></div>');
    
    var eBoard = $('<div id="board" class="board"></div>');
    var eTopBar = $('<div id="topBar" class="horBar"></div>');
    var eLeftBar = $('<div id="leftBar" class="verBar"></div>');
    var eCenter = $('<div id="center" class="center"></div>');
    var eRightBar = $('<div id="rightBar" class="verBar"></div>');
    var eBottomBar = $('<div id="bottomBar" class="horBar"></div>');

    container.append(eModalChanceDialog)
        .append(eModalChestDialog)
        .append(eModalJailDialog)
        .append(eDiceDialog)
        .append(eChanceCardDialog)
        .append(eChestCardDialog)
        .append(eTurnDialog)
        .append(eBuyDialog)
        .append(eWarningDialog)
        .append(eGoDialog)
        .append(eMonopolyDialog)
        .append(eJailDialog);

    container.append(eBoard);
    eBoard.append(eTopBar)
        .append(eLeftBar)
        .append(eCenter)
        .append(eRightBar)
        .append(eBottomBar);
// TOP ROW //
    var eStart = $('<div id="tile0" class="corner start"></div>');
    eTopBar.append(eStart);
    var eStartAvatarBox = $('<div id="avatarBox0" class="avatarBox topAvatarBox leftAvatarBox"></div>');
    eStart.append(eStartAvatarBox);

    for (var i = 1; i <= 9; i++) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getString(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');
        
        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox topAvatarBox"></div>');
        var eHorAssetBox = $('<div id="assetBox' + i + '" class="horAssetBox"></div>');

        eTopBar.append(eHorTile);
        eHorTile.append(eTileBody);
        eHorTile.append(eHorAssetBox);
        eHorTile.append(eAvatarBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);
    }
    
    var eJail = $('<div id="tile10" class="corner jail"></div>');
    $(eTopBar).append(eJail);
    var eJailAvatarBox = $('<div id="avatarBox10" class="avatarBox topAvatarBox"></div>');
    $(eJail).append(eJailAvatarBox);
// RIGHT ROW //
    for (var i = 11; i <= 19; i++) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileRight ' + getString(aoTiles[i].type) + ' ' + getString(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox"></div>');
        var eVerAssetBox = $('<div id="assetBox' + i + '" class="verAssetBox rightAssetBox"></div>');

        eRightBar.append(eVerTile);
        eVerTile.append(eTileBody);
        eVerTile.append(eAvatarBox);
        eVerTile.append(eVerAssetBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);    
    }
// BOTTOM ROW //
    var eCop = $('<div id="tile30" class="corner cop"></div>');
    eBottomBar.append(eCop);
    var eCopAvatarBox = $('<div id="avatarBox30" class="avatarBox leftAvatarBox"></div>');
    eCop.append(eCopAvatarBox);

    for (var i = 29; i >= 21; i--) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileBottom ' + getString(aoTiles[i].type) + ' ' + getString(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox"></div>');
        var eHorAssetBox = $('<div id="assetBox' + i + '" class="horAssetBox bottomAssetBox"></div>');

        eBottomBar.append(eHorTile);
        eHorTile.append(eTileBody);
        eHorTile.append(eAvatarBox);
        eHorTile.append(eHorAssetBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);
    }
    
    var ePark = $('<div id="tile20" class="corner park"></div>');
    eBottomBar.append(ePark);
    var eParkAvatarBox = $('<div id="avatarBox20" class="avatarBox"></div>');
    ePark.append(eParkAvatarBox);
// LEFT ROW //
    for (var i = 39; i >= 31; i--) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getString(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox leftAvatarBox"></div>');
        var eVerAssetBox = $('<div id="assetBox' + i + '" class="verAssetBox"></div>');

        eLeftBar.append(eVerTile);
        eVerTile.append(eTileBody);
        eVerTile.append(eVerAssetBox);
        eVerTile.append(eAvatarBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);
    }
// EVENT LISTENER //  
    $("div[id^='tile']").click(function() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showTileInfo(nId);
        showTileSelected(nId);
        if (aoTiles[nId].owner >= 0) {
            if (sTradeMode != "Trade") {
                showPlayerInfo();
                showPlayerSelected(aoTiles[nId].owner);
                showPlayerAssets(aoTiles[nId].owner);
            }// if not in trade mode //
            else {
                if (aoTiles[nId].owner != aPlayers[0]) {
                    showTraderSelected(aoTiles[nId].owner, "Right");
                    showPlayerOwned(aoTiles[nId].owner, $('#tradeRight'));
                    if (aCartRight.indexOf(nId) == -1) {
                        aCartRight.push(nId);
                        $('#tradeRight').find('#property' + nId).addClass('propertyHighLight');
                    }// if property not already in cart //
                }// if owner is not trade primary //
                else {
                    if (aCartLeft.indexOf(nId) == -1) {
                        aCartLeft.push(nId);
                        $('#tradeLeft').find('#property' + nId).addClass('propertyHighLight');
                    }// if property not already in cart //
                }// if owner is trade primary //
            }// in trade mode //
        }// if tile has owner //
        else {
            $('#tradeAvatarBoxRight').find('.traderHighLight').removeClass('traderHighLight');
            $('#tradeRight').find('.properties').remove();
        }// if tile has no owner
    });
}/////////////////////////////// CREATE BOARD //
function createMenu() {
    var eCenter = $('#center');
    var eMenu = $('<div id="menu" class="menu"></div>');
    var eDice = $('<div id="dice" class="menuAction"></div>');
    var eAction = $('<div id="action" class="menuAction"></div>');

    var eDieOne = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Start Game</button>');

    eCenter.append(eMenu);
    eMenu.append(eDice);
    eMenu.append(eAction);  
    eDice.append(eDieOne);
    eDice.append(eDieTwo);
    eAction.append(eActionButton);

    $(eActionButton).click(function() {
        startGame();
    });
}////////////////////////////////////////// CREATE MENU //
function startGame() {
//    console.log("startGame");
    var eCenter = $('#center');
    var eMenu = $('#menu');
    var eInfo = $('<div id="info" class="info"></div>');
    var eTrade = $('<div id="trade" class="menuAction"></div>');
    var eQuit = $('<div id="quit" class="menuAction"></div>');
    var eTradeButton = $('<button type="button" id="tradeButton" class="actionButton">Trade</button>');
    var eQuitButton = $('<button type="button" id="quitButton" class="actionButton">Quit</button>');
    var ePlayers = $('<div id="players" class="menuPlayers"></div>');
    
    eCenter.append(eInfo);
    eMenu.append(eTrade)
        .append(eQuit)
        .append(ePlayers);

    eTrade.append(eTradeButton);
    eQuit.append(eQuitButton);
    $(eTradeButton).click(function() {
        startTrade();
    });
    $(eQuitButton).click(function() {
        quitGame();
    });
    
    var eStartAvatarBox = $('#avatarBox0');
    for (var i = 0; i < aPlayers.length; i++) {
        var sAvatar = aoPlayers[aPlayers[i]].avatar;
        var eAvatar = $('<div id="player' + aPlayers[i] + '" class="avatar ' + sAvatar + '"></div>');
        eStartAvatarBox.append(eAvatar);
    }
    
    aPlayers.unshift(aPlayers.pop());
    playerNext();
}/////////////////////////////////////////// START GAME //
function quitGame() {
    var eModalDialog = $('#modalDialog');
    eModalDialog.empty()
        .append('<p>' + aoPlayers[aPlayers[0]].name + ', are you sure you wish to quit the game?</p>')
        .dialog({
            modal: true,
            dialogClass: "no-close",
            buttons: [
                { text: "Cancel",
                    click: function() {
                        $(this).dialog("close");
                    }
                },
                { text: "Quit",
                    click: function() {
                        $(this).dialog("close");
                        playerEnd(aPlayers[0]);
                    }
                }
            ]
        });
}//////////////////////////////////////////// QUIT GAME DIALOG //
function startTrade() {
    sTradeMode = "Trade";
    $('.asset').remove();
    $('.avatar').remove();
    $('.tileHighLight').removeClass("tileHighLight");
    $("div[id^='tile']").removeClass("greenLed").removeClass("yellowLed").removeClass("redLed").removeClass("blueLed");
    var eCenter = $('#center');
    var eTrade = $('<div id="tradeView" class="trade"></div>');
    var eTradeAvatarBoxLeft = $('<div id="tradeAvatarBoxLeft" class="tradeAvatarBox tradeAvatarBoxLeft"></div>');
    var eTradeAvatarBoxRight = $('<div id="tradeAvatarBoxRight" class="tradeAvatarBox tradeAvatarBoxRight"></div>');
    var eTradeMenu = $('<div id="tradeMenu" class="tradeMenu"></div>');
    var eTradeBarLeft = $('<div id="tradeLeft" class="tradeBar tradeBarLeft"></div>');
    var eTradeInfo = $('<div id="infoTrade" class="info"></div>');
    var eTradeInfoHead = $('<div id="infoHead" class="infoHead"><h3>Trading Rules</h3></div>');
    var eTradeInfoBody = $('<div id="infoBody" class="infoBody"><p>Unimproved properties, railroads, utilities (but not buildings) and \'Get out of Jail\'-cards may be traded. However, no property can be sold to another player if buildings are standing on any properties of that color-group.</p></div>');
    var eTradeBarRight = $('<div id="tradeRight" class="tradeBar tradeBarRight"></div>');
    eCenter.append(eTrade)
    eTrade.append(eTradeAvatarBoxLeft)
        .append(eTradeMenu)
        .append(eTradeAvatarBoxRight)
        .append(eTradeBarLeft)
        .append(eTradeInfo)
        .append(eTradeBarRight);
    eTradeInfo.append(eTradeInfoHead)
        .append(eTradeInfoBody);

    var eExitButton = $('<button type="button" id="exitButton" class="actionButton">Exit</button>');
    eTradeMenu.append(eExitButton);
    $(eExitButton).click(function() {
        aCartLeft = [];
        aCartRight = [];
        exitTrade();
    }); 
    
    var eTradeButton = $('<button type="button" id="tradeButton" class="actionButton">Accept Trade</button>');
    eTradeMenu.append(eTradeButton);
    $(eTradeButton).click(function() {
        console.log(aCartRight + ' ' + aCartRight.length);
        console.log(aCartLeft + ' ' + aCartLeft.length);
    });
    
    var eAvatarLeft = $('<div id="avatarLeft' + aPlayers[0] + '" class="tradeAvatar ' + aoPlayers[aPlayers[0]].avatar + '"></div>');
    eTradeAvatarBoxLeft.append(eAvatarLeft);
    for (var i = 1; i < aPlayers.length; i++) {
        var eAvatarRight = $('<div id="avatarRight' + aPlayers[i] + '" class="tradeAvatar ' + aoPlayers[aPlayers[i]].avatar + '"></div>');
        eTradeAvatarBoxRight.append(eAvatarRight);
    }
    
    showPlayerOwned(aPlayers[0], $('#tradeLeft'));
    hideTrader(aPlayers[0], "Right");
    showPlayerAssets(aPlayers[0]);
    
    $("div[id^='avatarRight']").click(function () {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showPlayerOwned(nId, $('#tradeRight'));
        showTraderSelected(nId, "Right");
        hideTrader(nId, "Left");
    });
}
function hideTrader(player, side) {
    $('div[id^="avatar' + side + '"]').removeClass('tradeAvatarHidden');
    $('#avatar' + side + player).addClass('tradeAvatarHidden');
}
function exitTrade() {
    sTradeMode = "";
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location
    var eTradeView = $('#tradeView');
    eTradeView.remove();
    showAll(nLocation, nPlayer)
    showAvatars();
}

function playerTurn() {
//    console.log(" -playerTurn");
    var nPlayer = aPlayers[0];
    var eAction = $('#action');
    var nLocation = aoPlayers[nPlayer].location;
    var nPriority = aoPlayers[nPlayer].priority;
    var sStart = aoPlayers[nPlayer].start;
    var sRoll = aoPlayers[nPlayer].roll;
    var sChance = aoPlayers[nPlayer].chance;
    var sChest = aoPlayers[nPlayer].chest;
    var sPay = aoPlayers[nPlayer].pay;
    var nJail = aoPlayers[nPlayer].jail;
    
    if (sStart == "yes") {
        if (sRoll == "yes") {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                playerThrow();
                playerReset();
                if (aoPlayers[nPlayer].doubles > 0) { showDialog('You have rolled doubles, throw again!', 'dice'); }
                aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                playerMove();
            });
        }// if player is allowed to throw dice //
        if (nJail > 0) {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                playerThrow();
                aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                if (aoPlayers[nPlayer].doubles == 1) {
                    aoPlayers[nPlayer].doubles = 0;
                    aoPlayers[nPlayer].jail = 0;
                    aoPlayers[nPlayer].roll = "no";
                    showTileInfo(10);
                    playerReset();
                    showDialog('You have rolled doubles, you can leave jail!', 'dice');
                    playerMove();
                }
                else {
                    aoPlayers[nPlayer].start = "no";
                    aoPlayers[nPlayer].jail += 1;
                    if (aoPlayers[nPlayer].jail < 4) {
                        showDialog('You haven\'t rolled doubles, you must remain in jail!', 'jail');
                        showTileInfo(10);
                        playerTurn();
                    }
                    else {
                        showDialog('You haven\'t rolled doubles, you must pay the fine!', 'jail');
                        showTileInfo(10);
                        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay 50</button>');
                        eAction.empty();
                        eAction.append(eActionButton);
                        $(eActionButton).click(function() {
                            payFine();
                        });
                    }
                }
            });
        }// if player is in jail //
        if (nPriority > 0) {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + nPriority +  '</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                payDebt(nPriority);
            });
        }// if player has priority debt //
    }// beginning of turn phase //
    else {
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Next player</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            playerNext();
        });
        
        if (sRoll == "yes") {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                playerThrow();
                playerReset();
                if (aoPlayers[nPlayer].doubles == 0) {
                    aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                    playerMove();
                }
                if (aoPlayers[nPlayer].doubles == 1 || aoPlayers[nPlayer].doubles == 2) {
                    showDialog('You have rolled doubles, throw again!', 'dice');
                    aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                    playerMove();
                }// doubles //
                if (aoPlayers[nPlayer].doubles == 3) {
                    playerJail('You have been sent to Jail for rolling three doubles in a row!');
                    showAvatars();
                    showAll(aoPlayers[nPlayer].location, nPlayer);
                    playerTurn();
                }// three doubles in a row //
            });
        }// if player can throw dice again //
        if (sPay == "yes") {
            setDebt();
            var nDebt = checkDebt();
            if (nDebt > 0) { ////////////////////////////////////////////////////// if player has debt //   
                var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + nDebt +  '</button>');
                eAction.empty();
                eAction.append(eActionButton);
                $(eActionButton).click(function() {
                    payDebt(nDebt);
                });
            }
        }// if player is allowed to potentially pay debt //
        if (sChest == "yes" && aoTiles[nLocation].type == "chest") { playerDraw(0); }// if player landed on community chest //
        if (sChance == "yes" && aoTiles[nLocation].type == "chance") { playerDraw(1); }// if player landed on chance //
    }// after first throw phase //
}///////////////////////////////////////// PLAY TURN //
function playerThrow() {
//    console.log("playerThrow");
    var nPlayer = aPlayers[0];
    
    var eDice = $('#dice');
    var nDieOne = Math.floor(Math.random() * 6 + 1);
    var nDieTwo = Math.floor(Math.random() * 6 + 1);
    aoPlayers[nPlayer].dice = nDieOne + nDieTwo;
    var eDieOne = $('<div id="dieOne" class="die die-' + nDieOne + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + nDieTwo + '"></div>');

    eDice.empty();
    eDice.append(eDieOne);
    eDice.append(eDieTwo);

    if (nDieOne == nDieTwo) {////////////////////////////////////////////////// if rolled doubles //
        aoPlayers[nPlayer].roll = "yes";
        aoPlayers[nPlayer].doubles += 1;
    }
    else {///////////////////////////////////////////////////////////////////// if not rolled doubles //
        aoPlayers[nPlayer].roll = "no";
        aoPlayers[nPlayer].doubles = 0;
    }
}///////////////////////////////////////// THROW DICE //
function playerEnd() {
    var nPlayer = aPlayers[0];
    for (var i = 0; i < aoTiles.length; i++) {
        if (aoTiles[i].owner == nPlayer) {
            delete aoTiles[i].assets;
            delete aoTiles[i].owner;
        }
    }
    
    aPlayers.splice(0, 1);
    aPlayers.unshift(aPlayers.pop());
    playerNext();
}/////////////////////////////////////////// REMOVE PLAYER FROM GAME //
function playerSet() {
    var nPlayer = aPlayers[0];
    aoPlayers[nPlayer].roll = "yes";
    aoPlayers[nPlayer].buy = "no";
    aoPlayers[nPlayer].pay = "no";
    aoPlayers[nPlayer].chest = "no";
    aoPlayers[nPlayer].chance = "no";
    aoPlayers[nPlayer].doubles = 0;
}//////////////////////////////////////////// PLAYER SET END OF TURN TURN //
function playerReset() {
    var nPlayer = aPlayers[0];
    aoPlayers[nPlayer].start = "no";
    aoPlayers[nPlayer].buy = "yes";
    aoPlayers[nPlayer].pay = "yes";
    aoPlayers[nPlayer].chest = "yes";
    aoPlayers[nPlayer].chance = "yes";
}////////////////////////////////////////// PLAYER RESET AFTER THROW //
function playerMove() {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var nTo = aoPlayers[nPlayer].to;
    $('#action').empty();

    if (nLocation != nTo) { setTimeout(showMovement, 40); }
    else {
        if (nTo == 30) { playerJail('You have been sent to Jail because you landed on Go to Jail!'); }
        showAvatars();
        showAll(aoPlayers[nPlayer].location, nPlayer);
        playerTurn();
    }
}////////////////////////////////////////// MOVE PLAYER //
function playerJail(text) {
    var nPlayer = aPlayers[0];
    playerSet();
    aoPlayers[nPlayer].jail = 1;
    aoPlayers[nPlayer].doubles = 0;
    aoPlayers[nPlayer].location = 10
    aoPlayers[nPlayer].roll = "no";
    
    var eModalDialog = $('#modalJailDialog');
    eModalDialog.empty()
        .append('<p>' + text + '</p>')
        .dialog({
            modal: true,
            closeOnEscape: false,
            dialogClass: "no-close",
            buttons: [{
                text: "OK",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        });
}////////////////////////////////////// SEND PLAYER TO JAIL //
function playerDraw(card) {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    switch (card) {
        case 0:
            var aoCards = aoChestCards;
            var sCard = "Community Chest";
            var nCard = aChestCards.shift();
            var eModalDialog = $('#modalChestDialog');
            if (nCard != 1) { aChestCards.push(nCard); }
            aoPlayers[nPlayer].chest = "no"
        break;
        case 1:
            var aoCards = aoChanceCards;
            var sCard = "Chance";
            var nCard = aChanceCards.shift();
            var eModalDialog = $('#modalChanceDialog');
            if (nCard != 1) { aChanceCards.push(nCard); }
            aoPlayers[nPlayer].chance = "no"
        break;
    }
    eModalDialog.empty()
        .append('<p>You can draw a ' + sCard + ' card!</p>')
        .dialog({
            modal: true,
            closeOnEscape: false,
            dialogClass: "no-close",
            buttons: [{
                text: "Draw Card",
                click: function() {
                    showDialog(aoCards[nCard].description, card);
                    if (aoCards[nCard].credits > 0) {
                        aoPlayers[nPlayer].credits += aoCards[nCard].credits;
                        showPlayerInfo();
                    } // card says collect credits //
                    if (aoCards[nCard].credits < 0) {
                        aoPlayers[nPlayer].debt[4] = Math.abs(aoCards[nCard].credits);
                        playerTurn();
                    }// card says pay credits //
                    if (aoCards[nCard].location >= 0) {
                        if (aoCards[nCard].location > nLocation) {
                            aoPlayers[nPlayer].to = aoCards[nCard].location;
                            playerMove();
                        }// location is further along //
                        if (aoCards[nCard].location < nLocation) {
                            aoPlayers[nPlayer].to = aoCards[nCard].location;
                            playerMove();
                        }// location is back a way //
                    }// card says relocate forwards //
                    if (aoCards[nCard].location < 0) {
                        aoPlayers[nPlayer].location += aoCards[nCard].location;
                        showAll(aoPlayers[nPlayer].location, nPlayer);
                        showAvatars();
                        playerTurn();
                    }// card says relocate backwards //
                    if (aoCards[nCard].house > 0) {
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
                            playerTurn();
                        }
                    }// card says pay credits for houses/hotels //
                    if (aoCards[nCard].players < 0) {
                        for (var i = 0; i < aPlayers.length; i++) {
                            if (i != nPlayer) {
                                aoPlayers[nPlayer].debt[aPlayers[i]] = Math.abs(aoCards[nCard].players);
                            }
                        }
                        playerTurn();
                    }// card says pay credits to all players //
                    if (aoCards[nCard].players > 0) {
                        for (var i = 0; i < aPlayers.length; i++) {
                            if (i != nPlayer) {
                                if (aoPlayers[aPlayers[i]].credits >= aoCards[nCard].players) {
                                    aoPlayers[aPlayers[i]].credits -= aoCards[nCard].players;
                                }
                                else {
                                    aoPlayers[aPlayers[i]].priority = aoCards[nCard].players - aoPlayers[aPlayers[i]].credits;
                                    aoPlayers[aPlayers[i]].credits = 0;
                                }
                            }
                        }
                        aoPlayers[nPlayer].credits += (aoCards[nCard].players * (aPlayers.length - 1));
                        showPlayerInfo();
                        playerTurn();
                    }// card says receive credits from all players //
                    if (nCard == 0) {
                        playerJail('You have been sent to Jail!');
                        showAvatars();
                        showAll(aoPlayers[nPlayer].location, nPlayer);
                        playerTurn();
                    }// Go to Jail //
                    if (nCard == 1) {
                        aoPlayers[nPlayer].cards[card] = 1;
                        showPlayerOwned(nPlayer, $('#center'));
                    }// Get out of Jail for free //
                    if (aoCards[nCard].redirect == "train") {
                        aoPlayers[nPlayer].redirect = "yes";
                        aoPlayers[nPlayer].to = Math.round(nLocation / 10) * 10 + 5;
                        playerMove();
                    }// card says advance to nearest railroad //
                    if (aoCards[nCard].redirect == "utility") {
                        aoPlayers[nPlayer].redirect = "yes";
                        if (nLocation < 12 || nLocation > 28) { aoPlayers[nPlayer].to = 12; }
                        else { aoPlayers[nPlayer].to = 28; }
                        playerMove();
                    }// card says advance to nearest utility //
                    $(this).dialog("close");
                }
            }]
        });
}///////////////////////////////////// DRAW A CARD //
function playerNext() {
//    console.log("playerNext");
    playerSet();
    aoPlayers[aPlayers[0]].start = "yes";
    aPlayers.push(aPlayers.shift());
    
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var ePlayers = $('#players');
    var ePlayersHead = $('<div id="playersHead" class="menuPlayersHead"><h3>It\'s ' + aoPlayers[aPlayers[0]].name + '\'s turn</h3></div>');  
    ePlayers.empty().append(ePlayersHead);
    
    for (var i = 0; i < aPlayers.length; i++) {        
        var eStats = $('<div id="stats' + aPlayers[i] + '" class="menuPlayerStats"></div>');
        ePlayers.append(eStats);
    }
    $("div[id^='stats']").click(function() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showAll(aoPlayers[nId].location, nId);
        showPlayerOwned(nId, $('#center'));
    })
    
    showDialog('It\'s ' + aoPlayers[nPlayer].name + '\'s turn!', 'turn');
    showAll(nLocation, nPlayer);
    playerTurn();
}////////////////////////////////////////// NEXT PLAYER //

function showAll(id, player) {
//    console.log("showAll");
    showTileInfo(id);
    showTileAssets();
    showTileSelected(id);
    showPlayerInfo();
    showPlayerOwned(player, $('#center'))
    showPlayerAssets(player);
    showPlayerSelected(player);
}/////////////////////////////////// SHOW ALL INFO //
function showMovement() {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    if (nLocation == 39) {
        aoPlayers[nPlayer].location = 0;
        aoPlayers[nPlayer].credits += 200;
        showDialog('Collected 200', 'go');
    }
    else { aoPlayers[nPlayer].location += 1; }
    
    showTileSelected(aoPlayers[nPlayer].location);
    showAvatars();
    playerMove();
}//////////////////////////////////////// SHOW PLAYER MOVEMENT //
function showTileInfo(id) {
//    console.log(" -showTileInfo");
    $('.infoGreen').removeClass("infoGreen");
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var sMonopoly = checkMonopoly(id);
    var sBuy = checkBuy();
    
    var eInfo = $('#info' + sTradeMode);
    var eInfoHead = $('<div id="infoHead" class="infoHead ' + getString(aoTiles[id].color) + '"></div>');
    var sTitle = $('<h3>' + aoTiles[id].title + '</h3>');
    var eInfoBody = $('<div id="infoBody" class="infoBody"></div>');
    var eInfoFoot = $('<div id="infoFoot" class="infoFoot"></div>');

    eInfo.empty().append(eInfoHead);
    eInfoHead.append(sTitle);
    
    if (!isNaN(aoTiles[id].owner)) {
        var sOwner = $('<p><span>Owner:</span><span>' + aoPlayers[aoTiles[id].owner].name + '</span></p>');
        eInfoBody.append(sOwner);

        if (aoTiles[id].owner == nPlayer) {
            if (aoTiles[id].mortgage == "yes") {/////////////////////////////// if property is mortgaged //
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
                if (sMonopoly == "yes") {////////////////////////////// allowed to buy assets //
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
                if (aoTiles[id].assets > 0) {////////////////////////////////// allowed to sell assets //
                    if (aoTiles[id].assets == 5) { var sAsset = "Hotel"; }
                    else { var sAsset = "House"; }
                    var eSell = $('<button type="button" id="sell" class="actionButton">Sell ' + sAsset + ' for ' + parseInt(aoTiles[id].cost / 2) + '</button>');
                    eInfoFoot.append(eSell);
                    eSell.click(function() {
                        sellAsset(id);
                    });
                }
                else {
                    if (checkAssets(id) == 0) {//////////////////////////////// allow to mortgage if no assets in monopoly //
                        var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Mortgage for ' + parseInt(aoTiles[id].price / 2) + '</button>');
                        eInfoFoot.append(eMortgage);
                        eMortgage.click(function() {
                            getMortgage(id);
                        });
                    }
                }
            }
        }
    }// show buttons if property is owned //
    if (aoTiles[id].description) {
        var sDescription = $('<p>' + aoTiles[id].description + '</p>');
        eInfoBody.append(sDescription);
    }// show description if there is one //
    if (id == 10) {
        for (var i = 0; i < aPlayers.length; i++) {
            if (aoPlayers[aPlayers[i]].jail > 0) {
                var sInmate = $('<p>' + aoPlayers[aPlayers[i]].name + ' is in jail.</p>');
                eInfoBody.append(sInmate);
            }
        }
    }// show jail population //
    if (aoTiles[id].price > 0) {
        if (aoTiles[id].mortgage == "yes") { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>Yes</span></p>'); }
        else { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>No</span></p>'); }
        eInfoBody.append(eHasMortgage);
        var sPrice = $('<p><span>Price:</span><span>' + aoTiles[id].price + '</span></p>');
        var sMortgage = $('<p><span>Mortgage:</span><span>' + aoTiles[id].price / 2 + '</span></p>');            
        eInfoBody.append(sPrice)
            .append(sMortgage);
    }// if tile is ownable //
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
    }// show street stats //
    if (aoTiles[id].type == "train") {
        var sCostR1 = $('<p id="stat1"><span>=> 1 Railroad:</span><span>' + aoTiles[0].trains[0] + '</span></p>');
        var sCostR2 = $('<p id="stat2"><span>=> 2 Railroads:</span><span>' + aoTiles[0].trains[1] + '</span></p>');
        var sCostR3 = $('<p id="stat3"><span>=> 3 Railroads:</span><span>' + aoTiles[0].trains[2] + '</span></p>');
        var sCostR4 = $('<p id="stat4"><span>=> 4 Railroads:</span><span>' + aoTiles[0].trains[3] + '</span></p>');
        eInfoBody.append(sCostR1)
            .append(sCostR2)
            .append(sCostR3)
            .append(sCostR4);
    }// show railroad stats //
    if (aoTiles[id].type == "utility") {
        var sCostU1 = $('<p id="stat1"><span>=> 1 Utility:</span><span>' + aoTiles[0].utilities[0] + 'x Roll</span></p>');
        var sCostU2 = $('<p id="stat2"><span>=> 2 Utilities:</span><span>' + aoTiles[0].utilities[1] + 'x Roll</span></p>');
        eInfoBody.append(sCostU1)
            .append(sCostU2);
    }// show utility stats //
    if (id == nLocation) {
        if (sBuy == "yes" && aoTiles[id].price >= 0) {
            var eBuy = $('<button type="button" id="buy" class="actionButton">Buy for ' + aoTiles[id].price + '</button>');
            eInfoFoot.append(eBuy);
            eBuy.click(function() {
                getProperty();
            });
        }// if player can buy //
        if (aoPlayers[nPlayer].jail > 0 && id == 10) {
            if (aoPlayers[nPlayer].start == "yes") {
                var eFine = $('<button type="button" id="fine" class="actionButton">Pay ' + aoTiles[id].fine + '</button>');
                eInfoFoot.append(eFine);
                eFine.click(function() {
                    aoPlayers[nPlayer].to = 10;
                    payFine();
                });
            }// if at start of player turn
            if (aoPlayers[nPlayer].cards[0] > 0 || aoPlayers[nPlayer].cards[1] > 0) {
                var eCard = $('<button type="button" id="fine" class="actionButton">Use Card</button>');
                eInfoFoot.append(eCard);
                eCard.click(function() {
                    if (aoPlayers[nPlayer].cards[0] > 0 && aoPlayers[nPlayer].cards[1] > 0) {
                        aoPlayers[nPlayer].cards[0] = 0;
                        aChestCards.push(0);
                    }// if player has both cards
                    else {
                        if (aoPlayers[nPlayer].cards[0] > 0) {
                            aoPlayers[nPlayer].cards[0] = 0;
                            aChestCards.push(0);
                        }// if player has chest card //
                        if (aoPlayers[nPlayer].cards[1] > 0) {
                            aoPlayers[nPlayer].cards[1] = 0;
                            aChanceCards.push(0);
                        }// if player has chance card
                    }// if player has one card
                    aoPlayers[nPlayer].jail = 0;
                    showTileInfo(id);
                    showPlayerOwned(nPlayer, $('#center'));
                    playerTurn();
                });
            }// if player can use card
        }// if this is jail //
    }// if player is here //
    if (eInfoBody.is(':parent')) { eInfo.append(eInfoBody); }
    if (eInfoFoot.is(':parent') && sTradeMode != "Trade") { eInfo.append(eInfoFoot); }
    if (id == nLocation && sBuy == "yes") { showDialog('You can buy ' + aoTiles[id].title + '!', 'buy'); }
    if (!isNaN(aoTiles[id].owner)) {
        if (aoTiles[id].mortgage == "yes") { $('#stat0').addClass("infoGreen"); }// highlight mortgaged if property has mortgage //
        else {
            if (aoTiles[id].assets > 0) { $('#stat' + parseInt(aoTiles[id].assets + 2)).addClass("infoGreen"); }// highlight rent due to assets //
            else {
                if (aoTiles[id].type == "street") {
                    if (sMonopoly != "yes" && sMonopoly != "but") { $('#stat1').addClass("infoGreen"); }// highlight base rent if no monopoly //
                    if (sMonopoly == "yes" || sMonopoly == "but") { $('#stat2').addClass("infoGreen"); }// highlight monopoly rent //
                }
                if (aoTiles[id].type == "train" || aoTiles[id].type == "utility") { $('#stat' + sMonopoly).addClass("infoGreen"); }// highlight rent due to number of railroads or utilities //
            }
        }
    }// highlight rents if property is owned //
}///////////////////////////////////// SHOW TILE INFO //
function showTileAssets() {
//    console.log(" -showTileAssets");
    $('.asset').remove();
    for (var i = 0; i < aoTiles.length; i++) {
        $('#tile' + i).removeClass("asset1").removeClass("asset2").removeClass("asset3").removeClass("asset4").removeClass("asset5");
      
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
}////////////////////////////////////// SHOW HOTELS/HOUSES ON TILES //
function showTileSelected(id) {
//    console.log(" -showTileSelected");
    $('.tileHighLight').removeClass("tileHighLight");
    $('#tile' + id).addClass('tileHighLight');
}/////////////////////////////////// SHOW SELECTED TILE //
function showPlayerInfo() {
//    console.log(" -showPlayerInfo");
    for (var i = 0; i < aPlayers.length; i++) {
        var sName = aoPlayers[aPlayers[i]].name;
        var nLocation = aoPlayers[aPlayers[i]].location % 40;
        var nCredits = aoPlayers[aPlayers[i]].credits;
        var nWealth = checkWealth(aPlayers[i]);
        var sAvatar = aoPlayers[aPlayers[i]].avatar;
        
        var eStats = $('#stats' + aPlayers[i]);
        var eName = $('<p><span>Player: </span><span>' + sName + '</span></p>');
        var eLocation = $('<p><span>Location: </span><span>' + aoTiles[nLocation].title + '</span></p>');
        var eCredits = $('<p><span>Credits: </span><span>' + nCredits + '</span></p>');

        eStats.empty()
            .addClass(sAvatar)
            .addClass('avatarBig')
            .append(eName)
            .append(eLocation)
            .append(eCredits);
    }
}////////////////////////////////////// SHOW PLAYER INFO //
function showPlayerOwned(player, element) {
//    $('.properties').remove();
    element.find("div[id^='property']").remove();
    element.find('.properties').remove();
    var aOwned = [[], [], [], [], [], [], [], [], [], []];
    var eMonopolies = $('<div class="properties"></div>');
    element.append(eMonopolies);
    
    for (var i = 0; i < aoTiles.length; i++) { if (aoTiles[i].owner == player) { aOwned[aoTiles[i].groupid].push(i); } }// divide properties by groupid //
    for (var i = 0; i < aOwned.length; i++) {
        if (aOwned[i].length > 0) {
            var ePropertyBox = $('<div class="propertyBox"></div>');
            eMonopolies.append(ePropertyBox);
            for (var j = 0; j < aOwned[i].length; j++) {
                if (sTradeMode != "Trade" || checkAssets(aOwned[i][j]) == 0) {
                    if (sTradeMode == "Trade") { var nCost = aoTiles[aOwned[i][j]].price; }// if in trade mode show property price //
                    else {
                        if (aoTiles[aOwned[i][j]].type == "utility") { var nCost = checkRent(aOwned[i][j]) + 'x'; }// if utility //
                        else { var nCost = checkRent(aOwned[i][j]); }// if not utility //
                    }// if not in trade mode //
                    var eProperty = $('<div id="property' + aOwned[i][j] + '" class="property"></div>');
                    var ePropertyHead = $('<div class="propertyHead"></div>');
                    var ePropertyBody = $('<div class="propertyBody"><p>' + nCost + '</p></div>');
                    var eAssetBox = $('<div class="propertyAssets"></div>');

                    if (aoTiles[aOwned[i][j]].type == "street") { ePropertyHead.addClass(aoTiles[aOwned[i][j]].color); }// if street tile //
                    if (aoTiles[aOwned[i][j]].type == "train") { ePropertyBody.addClass(aoTiles[aOwned[i][j]].type + 'Mini'); }// if railroad tile //
                    if (aoTiles[aOwned[i][j]].type == "utility") { ePropertyBody.addClass(aoTiles[aOwned[i][j]].utility + 'Mini'); }// if utility tile //
                    if (aoTiles[aOwned[i][j]].assets == 5) {
                        var eAsset = $('<div class="assetMini hotel"></div>');
                        eAssetBox.append(eAsset);
                    }// if hotel on tile //
                    else {
                        for (var k = 0; k < aoTiles[aOwned[i][j]].assets; k++) {
                            var eAsset = $('<div class="assetMini house"></div>');
                            eAssetBox.append(eAsset);
                        }// show houses if there are any //
                    }// if only houses or nothing //
                    ePropertyBox.append(eProperty);
                    eProperty.append(ePropertyHead)
                            .append(ePropertyBody);
                    ePropertyHead.append(eAssetBox);
                    if (aCartLeft.indexOf(aOwned[i][j]) >= 0) { eProperty.addClass('propertyHighLight'); }// if tile in primary cart //
                    if (aCartRight.indexOf(aOwned[i][j]) >= 0) { eProperty.addClass('propertyHighLight'); }// if tile in secondary cart //
                }
            }// go over properties in group //
        }// if player has properties in group //
    }// go over owned properties array //
    if (aoPlayers[player].cards[0] == 1 || aoPlayers[player].cards[1] == 1) {
        var eCardBox = $('<div class="propertyBox"></div>');
        eMonopolies.append(eCardBox);
        for (var n = 0; n < aoPlayers[player].cards.length; n++) {
            if (aoPlayers[player].cards[n] == 1) {
                switch (n) {
                    case 0: var sCard = "chest"; break;
                    case 1: var sCard = "chance"; break;
                }
                var eCard = $('<div id="card' + n + '" class="card ' + sCard + '"></div>');
                eCardBox.append(eCard);
            }
        }
    }// if player has cards to trade //
    if (sTradeMode != "Trade") {
        var nMarginTop = aPlayers.indexOf(parseInt(player)) * 100 + 256 - ($('.propertyBox').length * 56) / 2;
        var nMarginBottom = nMarginTop + $('.propertyBox').length * 56;
        if (nMarginBottom > 734) { nMarginTop = parseInt(734 - $('.propertyBox').length * 56); }
        if (nMarginTop < 2) { nMarginTop = 2; }
        eMonopolies.css('margin-top', nMarginTop + 'px');
    }// if not in trade mode //
    
    element.find("div[id^='property']").click(function showProperty() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showTileInfo(nId);
        showTileSelected(nId);
        if (sTradeMode == "Trade") {
            if (aoTiles[nId].owner != aPlayers[0]) {
                if (aCartRight.indexOf(nId) == -1) {
                    aCartRight.push(nId);
                    $('#property' + nId).addClass('propertyHighLight');
                }// add to secondary cart if not already in it //
                else {
                    aCartRight.splice(aCartRight.indexOf(nId), 1);
                    $('#property' + nId).removeClass('propertyHighLight');
                }// remove form secondary cart //
            }// if owner is trade secondary //
            else {
                if (aCartLeft.indexOf(nId) == -1) {
                    aCartLeft.push(nId);
                    element.find('#property' + nId).addClass('propertyHighLight');
                }// add to primary cart if not already in it //
                else {
                    aCartLeft.splice(aCartLeft.indexOf(nId), 1);
                    element.find('#property' + nId).removeClass('propertyHighLight');
                }// remove form primary cart //
            }// if owner is trade primary //
        }// if in trade mode //
    });
    element.find("div[id^='card']").click(function showCard() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showDialog('Get out of Jail free!', nId);
    });
}////////////////////// SHOW PLAYER OWNED/RENTS IN MENU //
function showPlayerAssets(player) {
//    console.log(" -showPlayerAssets");
    for (var i = 0; i < aoTiles.length; i++) {
        $('#tile' + i).removeClass("greenLed").removeClass("yellowLed").removeClass("redLed").removeClass("blueLed");
        
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
    }
}////////////////////////////// SHOW PLAYER OWNED/MORTGAGED/MONOPOLY ON MAP //
function showPlayerSelected(player) {
//    console.log(" -showPlayerSelected");
    var eStats = $('#stats' + player);
    $('.playerHighLight').removeClass("playerHighLight");
    eStats.addClass("playerHighLight");
}///////////////////////////// SHOW SELECTED PLAYER //
function showTraderSelected(player, side) {
    var eAvatarBox = $('#tradeAvatarBox' + side);
    eAvatarBox.find('.traderHighLight').removeClass('traderHighLight');
    $('#avatar' + side + player).addClass('traderHighLight');
}
function showAvatars() {
//    console.log(" -showAvatars");
    for (var i = 0; i < aPlayers.length; i++) {
        $('#player' + aPlayers[i]).remove();
        var nLocation = aoPlayers[aPlayers[i]].location % 40;

        var eAvatarBox = $('#avatarBox' + nLocation);
        var sAvatar = aoPlayers[aPlayers[i]].avatar;
        var eAvatar = $('<div id="player' + aPlayers[i] + '" class="avatar ' + sAvatar + '"></div>');
        eAvatarBox.append(eAvatar);
    }
}///////////////////////////////////////// SHOW AVATARS //
function showDialog(text, type) {
    switch (type) {
        case 0: 
            var eDialog = $('#chestCardDialog'); 
            var sMy = "left top";
            var sAt = "left top";
            var eOf = $('#infoHead');
        break;
        case 1: 
            var eDialog = $('#chanceCardDialog'); 
            var sMy = "left top";
            var sAt = "left top";
            var eOf = $('#infoHead');
        break;
        case "turn": 
            var eDialog = $('#turnDialog'); 
            var sMy = "right top";
            var sAt = "left bottom";
            var eOf = $('#trade');
        break;
        case "dice":
            var eDialog = $('#diceDialog');
            var sMy = "left top";
            var sAt = "left bottom";
            var eOf = $('#dice');
        break;
        case "go": 
            var eDialog = $('#goDialog'); 
            var sMy = "right top";
            var sAt = "left top";
            var eOf = $('#tile0');
        break;
        case "warning": 
            var eDialog = $('#warningDialog'); 
            var sMy = "left bottom";
            var sAt = "right bottom";
            var eOf = $('#action');
        break;
        case "buy": 
            var eDialog = $('#buyDialog'); 
            var sMy = "left top";
            var sAt = "right top";
            var eOf = $('#buy');
        break;
        case "monopoly": 
            var eDialog = $('#monopolyDialog'); 
            var sMy = "left bottom";
            var sAt = "left top";
            var eOf = $('#infoFoot');
        break;
        case "jail": 
            var eDialog = $('#jailDialog'); 
            var sMy = "left top";
            var sAt = "right top";
            var eOf = $('#tile10');
        break;
    }
    eDialog.empty()
        .append('<p>' + text + '</p>')
        .dialog({ position: { my: sMy, at: sAt, of: eOf }});
    setTimeout(function(){ eDialog.dialog('close'); }, 2000);
}//////////////////////////////// SHOW DIALOG POPUP //

function checkWealth(player) {
//    console.log(" ---checkWealth");
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
                nWealth += aoTiles[i].assets * aoTiles[i].cost / 2;
            }
        }
    }
    return nWealth;
}/////////////////////////////////// CHECK TOTAL WEALTH OF PLAYER //
function checkAssets(id) {
//    console.log("   -checkAssets");
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
}/////////////////////////////////////// CHECK NUMBER OF ASSETS IN MONOPOLY //
function checkProperties(id) {
//    console.log(" -checkProperties");
    var nMonopolyHas = 0;
    var sColor = aoTiles[id].color;
    for (var i = 0; i < aoTiles.length; i++) {
        if (sColor == aoTiles[i].color) {
            nMonopolyHas += 1;
        }
    }
    return nMonopolyHas;
}/////////////////////////////////// CHECK NUMBER OF PROPERTIES IN MONOPOLY //
function checkDebt() {
//    console.log("   -checkDebt");
    var nPlayer = aPlayers[0];
    var nPriority = aoPlayers[nPlayer].priority;
    var nPlayerDebt = 0;
    for (var i = 0; i < 5; i++) {
        nPlayerDebt += aoPlayers[nPlayer].debt[i];
    }
    return nPlayerDebt + nPriority;
}/////////////////////////////////////////// CHECK IF PLAYER HAS DEBT //
function checkBuy() {
//    console.log("   -checkBuy");
    var nPlayer = aPlayers[0];
    var sBuy = aoPlayers[nPlayer].buy;
    var nLocation = aoPlayers[nPlayer].location;
    if (isNaN(aoTiles[nLocation].owner) && aoTiles[nLocation].price > 0 && sBuy == "yes") {
        return "yes";
    }
}///////////////////////////////////////////// CHECK IF PLAYER CAN BUY //
function checkMonopoly(id) {
//    console.log("   -checkMonopoly");
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
}///////////////////////////////////// CHECK IF PLAYER HAS MONOPOLY ON TILE //
function checkRent(id) {
    var sMortgage = aoTiles[id].mortgage;
    var sType = aoTiles[id].type;
    var nAssets = aoTiles[id].assets;
    var sMonopoly = checkMonopoly(id);
    
    if (sMortgage != "yes") {
        if (sType == "street") {
            if (!isNaN(nAssets)) {  return aoTiles[id].rent[nAssets]; }// rent if owner has assets
            else {
                if (sMonopoly == "yes" || sMonopoly == "but") { return aoTiles[id].rent[0] * 2; }// rent if owner has monopoly
                else { return aoTiles[id].rent[0]; }// rent if owner has no monopoly
            }// rent if owner has no assets
        }// rent
        if (sType == "train") { return aoTiles[0].trains[sMonopoly - 1]; }// fee from railroads
        if (sType == "utility") { return aoTiles[0].utilities[sMonopoly - 1]; }// fee from utilities
    }// if not mortgaged
    else { return 0; }
}///////////////////////////////////////// CHECK RENT ON THIS TILE //

function setDebt() {
//    console.log("   -setDebt");
    var nFactor = 1;
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var nDice = aoPlayers[nPlayer].dice;
    var sRedirect = aoPlayers[nPlayer].redirect;
    var nOwner = aoTiles[nLocation].owner;
    var nPrice = aoTiles[nLocation].price;
    var sType = aoTiles[nLocation].type;
    var sRent = checkRent(nLocation);
    
    if (sRedirect == "yes") {
        aoPlayers[nPlayer].redirect = "no";
        nFactor = 2;
    }// redirected by card
    if (!isNaN(nOwner) && nOwner != nPlayer) {
        if (sType == "street") {  aoPlayers[nPlayer].debt[nOwner] = sRent; }
        if (sType == "train") { aoPlayers[nPlayer].debt[nOwner] = sRent * nFactor; }
        if (sType == "utility") { aoPlayers[nPlayer].debt[nOwner] = sRent * nDice * nFactor; }
    }// rent
    if (nPrice < 0) { aoPlayers[nPlayer].debt[4] = Math.abs(parseInt(nPrice)); }// taxes
}///////////////////////////////////////////// SET DEBT IF PLAYER HAS TO PAY //

function getProperty() {
//    console.log("getProperty");
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    if (aoPlayers[nPlayer].credits >= aoTiles[nLocation].price) {
        aoTiles[nLocation].owner = nPlayer;
        aoPlayers[nPlayer].credits -= aoTiles[nLocation].price;
        if (checkMonopoly(nLocation) == "yes" || checkMonopoly(nLocation) == "but") { showDialog('You have acquired a monopoly', 'monopoly'); }
        showAll(nLocation, nPlayer);
    }
    else {
        showDialog('Not enough credits!', 'warning');
    }
}///////////////////////////////////////// BUY PROPERTY //
function getMortgage(id) {
//    console.log("getMortgage");
    var nPlayer = aPlayers[0];
    aoTiles[id].mortgage = "yes";
    aoPlayers[nPlayer].credits += (aoTiles[id].price / 2);
    showAll(id, nPlayer);
}//////////////////////////////////////// MORTGAGE PROPERTY //
function getAsset(id) {
//    console.log("getAsset");
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
            else { showDialog('Your assets have to be spread out more evenly accross your monopoly!', 'warning'); }
        }
        
        if (bought == "yes") {
            aoPlayers[nPlayer].credits -= aoTiles[id].cost;
            showAll(id, nPlayer);
        }
    }
    else { showDialog('Not enough credits!', 'warning'); }
}////////////////////////////////////////// BUY AN ASSET //

function payDebt(amount) {
//    console.log("payDebt");
    var nPlayer = aPlayers[0];
    
    if (aoPlayers[nPlayer].credits >= amount) {
        for (var i = 0; i < aPlayers.length; i++) {
            aoPlayers[aPlayers[i]].credits += aoPlayers[nPlayer].debt[aPlayers[i]];
        }
        aoPlayers[nPlayer].credits -= amount;
        aoPlayers[nPlayer].pay = "no";
        aoPlayers[nPlayer].priority = 0;
        aoPlayers[nPlayer].debt = [0, 0, 0, 0, 0];

        showPlayerInfo();
        playerTurn();
    }
    else {
        showDialog('Not enough credits!', 'warning');
    }
}/////////////////////////////////////// PAY OFF DEBTS //
function payFine() {
//    console.log("payDebt");
    var nPlayer = aPlayers[0];
    
    if (aoPlayers[nPlayer].credits >= aoTiles[10].fine) {
        aoPlayers[nPlayer].credits -= aoTiles[10].fine;
        aoPlayers[nPlayer].jail = 0;
        playerReset();
        showPlayerInfo();
        playerMove();
    }
    else {
        showDialog('Not enough credits!', 'warning');
    }
}///////////////////////////////////////////// PAY FINE //
function payMortgage(id) {
//    console.log(" -payMortgage");
    var nPlayer = aPlayers[0];
    
    if (aoPlayers[nPlayer].credits >= (aoTiles[id].price / 2 * 1.1)) {
        aoTiles[id].mortgage = "no";
        aoPlayers[nPlayer].credits -= Math.round(aoTiles[id].price / 2 * 1.1);
        showAll(id, nPlayer);
    }
    else {
        showDialog('Not enough credits!', 'warning');
    }
}/////////////////////////////////////// PAY OFF MORTGAGE //

function sellAsset(id) {
//    console.log(" -sellAsset");
    var nPlayer = aPlayers[0];
    
    if (aoTiles[id].assets >= checkAssets(id) / checkProperties(id)) {
        aoTiles[id].assets = aoTiles[id].assets - 1;
        aoPlayers[nPlayer].credits += (aoTiles[id].cost / 2);
        showAll(id, nPlayer);
    }
    else { showDialog('Your assets have to be spread out more evenly accross your monopoly!', 'warning'); }
}///////////////////////////////////////// SELL AN ASSET //
function sellProperty(id) {
//    console.log(" -sellProperty");
    var nPlayer = aPlayers[0];
    var nOwner = aoTiles[id].owner;
    aoPlayers[nOwner].credits += aoTiles[id].price / 2;
    delete aoTiles[id].owner;
    showAll(id, nPlayer);
}/////////////////////////////////////// SELL A PROPERTY //

function getString(string) {
    if (string) { return string; }
    return "";
}////////////////////////////////////// GET STRING //
function shuffleCards(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var card = cards[i];
        cards[i] = cards[j];
        cards[j] = card;
    }
}//////////////////////////////////// SHUFFLE CARDS //