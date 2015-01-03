    if (nPriority > 0) {/****************************************************** if player has debt due to card draw payment */
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + nPriority +  '</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            payDebt(nPriority);
        });
    }
    else {
        if (nJail == 0) {
            if (sDraw == "yes") {/************************************************* if player is allowed to draw card */
                if (aoTiles[nLocation].type == "chest") { drawCard("chest"); }
                if (aoTiles[nLocation].type == "chance") { drawCard("chance"); }
            }

            if (sPay == "yes") {/************************************************** if player is allowed to potentially pay debt */
                checkPay();
                var nDebt = checkDebt();
            }

            if (nDebt > 0) { /***************************************************** if player has debt */   
                var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + nDebt +  '</button>');
                eAction.empty();
                eAction.append(eActionButton);
                $(eActionButton).click(function() {
                    payDebt(nDebt);
                });
            }
            else {/**************************************************************** if player has no debt */
                if (sRoll == "yes") {/********************************************* if player is allowed to roll dice */
                    var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
                    eAction.empty();
                    eAction.append(eActionButton);
                    $(eActionButton).click(function() {
                        throwDice();
                        if (aoPlayers[nPlayer].doubles > 0) {
                            showDialog('You have rolled doubles, throw again!', 'dice');
                        }
                        aoPlayers[nPlayer].start = "no";
                        aoPlayers[nPlayer].buy = "yes";
                        aoPlayers[nPlayer].pay = "yes";
                        aoPlayers[nPlayer].draw = "yes";
                        aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                        
                        movePlayer();
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
        else {
            if (sStart == "yes") {
                var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice' + aoPlayers[nPlayer].jail + '</button>');
                eAction.empty();
                eAction.append(eActionButton);
                $(eActionButton).click(function() {
                    throwDice();
                    if (aoPlayers[nPlayer].doubles == 1) {
                        showDialog('You have rolled doubles, you can leave jail!', 'dice');
                        aoPlayers[nPlayer].doubles = 0;
                        aoPlayers[nPlayer].jail = 0;
                        aoPlayers[nPlayer].roll = "no";
                        aoPlayers[nPlayer].start = "no";
                        aoPlayers[nPlayer].buy = "yes";
                        aoPlayers[nPlayer].pay = "yes";
                        aoPlayers[nPlayer].draw = "yes";
                        aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                        movePlayer();
                    }
                    else {
                        aoPlayers[nPlayer].start = "no";
                        aoPlayers[nPlayer].jail += 1;
                        showDialog('You haven\'t rolled doubles, you must remain in jail!', 'jail');
                        showTileInfo(10);
                        playTurn();
                    }
                });
            }
            else {
                var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Next player</button>');
                eAction.empty();
                eAction.append(eActionButton);
                $(eActionButton).click(function() {
                    nextPlayer();
                });
            }
        }
    }