var onePlayer = function(name, number, availableCasePositioning, availableCaseDeploying, isMe)
{
    this.name = name;
    this.fleat = null;
    this.blocked = true;
    this.number = number;
    this.availableCasePositioning = availableCasePositioning;
    this.availableCaseDeploying = availableCaseDeploying;
    this.movesAllowed = 1;
    this.orders = [];
    this.availableOrders = [];
    this.cardHandlers = [];
    this.pick = [];
    this.isMe = isMe;
    this.createHandler(isMe);
};

onePlayer.prototype = {
    createPick : function()
    {
        this.pick = createPick(this);
    },
    resetSquadsActions : function()
    {
        this.movesAllowed = 1;
        this.fleat.deployedSquad.forEach(function(squad){
            squad.movesAllowed = 1;
            squad.tempAction = null;
            squad.action = null;
            squad.movedFrom = [];
            //squad.defendAgainst = [];
        });
    },
    resetEffects : function()
    {
        this.fleat.squads.forEach(function(squad){
            squad.resetModifiers();
        });
    },
    okToFinishPositioning : function()
    {
        if(this.fleat.capitalShip.case == null)
            return false;
        return true;
    },
    drawOneCard : function()
    {
        var card = this.pick.drawOne();
        if(!card)
        {
            return false;
        }
        var index = this.cardHandlers.findIndex(function(elem){
            return elem.card == null;
        });
        if(typeof index != "undefined" && index != null && index != -1)
        {
            var choosenHandler = this.cardHandlers[index];
            card.setHandler(choosenHandler);
            choosenHandler.addCard(card);
        }
    },
    showCards : function()
    {
        this.cardHandlers.forEach(function(handler, index){
            if(handler.card != null)
            {
                handler.card.drawCard();
            }
        });
    },
    createHandler : function(isMe)
    {
        this.cardHandlers = createHandlers(this, isMe);
    },
    destroyCardView : function()
    {
        let tempObject = null;
        this.cardHandlers.forEach(function(handler){
            if(handler.card != null)
            {
                if(handler.card.phaserObject != null)
                {
                    handler.card.phaserObject.destroy();
                    handler.card.phaserObject = null;
                }
            }
        });
    }
};