var cardHandler = function(player, x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.player = player;
    this.width = width;
    this.height = height;
    this.card = null;
}

cardHandler.prototype = {
    addCard : function(card)
    {
        this.card = card;
    },
    createHandlerinfos : function(mask)
    {
        var cardHandlerInfos = {};
        if(mask.card)
        {
            if(this.card == null)
            {
                cardHandlerInfos.card = null;
            }
            else
            {
                cardHandlerInfos.card = this.card.createCardInfos(mask.card);
            }
        }
        return cardHandlerInfos;
    }
};

module.exports = {
    createHandler : function(player, x, y, width, height)
    {
        return new cardHandler(player, x, y, width, height);
    },

    createHandlers : function(player)
    {
        var i;
        var x = 100;
        var y = 800;
        var handlers = [];
        for(i = 0; i < 10; i++)
        {
            handlers.push(this.createHandler(player, x, y, 150, 150));
            x += 170;
        }
        return handlers;
    }
}