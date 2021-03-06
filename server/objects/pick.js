var cardFactory = require('./cards.js');

var onePick = function(player)
{
    this.player = player;
    this.pile = [];
}

onePick.prototype = {
    initPick : function()
    {
        var ref = this;
        this.player.orders.forEach(function(order){
            ref.pile.push(cardFactory.createCard(order, "order"));
        });
        this.player.fleat.squads.forEach(function(squad){
            ref.pile.push(cardFactory.createCard(squad, "squad"));
        });
    },
    drawOne : function()
    {
        if(this.pile.length > 0)
        {
            let selectIndex = Math.floor(Math.random()*this.pile.length);
            var selectedCard = this.pile[selectIndex];
            this.pile.splice(selectIndex,1);
            return selectedCard;
        }
        return false;
    }
};

module.exports = {
    createPick : function(player)
    {
        var pick = new onePick(player);
        pick.initPick();
        return pick;
    }
}