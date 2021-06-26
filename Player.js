class Player 
{
    constructor()
    {
      
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.killed = 0;
      this.rank = null;
      this.distanceX = 0;
    
    }

    getCount()
    {
        
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",(data)=>
        {
          playerCount = data.val();
        })
      
    }

    updateCount(count)
    {
        
        database.ref('/').update({
          playerCount: count
        });
      
    }

    update()
    {
        
        var playerIndex = "players/player" + this.index;
        
        database.ref(playerIndex).set({
          name:this.name,
          distance:this.distance,
          killed:this.killed,
          distanceX: this.distanceX
        });
      
    }

    static getPlayerInfo()
    {
        
        var playerInfoRef = database.ref('players');
        
        playerInfoRef.on("value",(data)=>{
          allPlayers = data.val();
        })
      
    }

    getBoatsAtEnd()
  {

    database.ref('boatsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })

  }

  static updateBoatsAtEnd(rank)
  {

    database.ref("/").update({
      boatsAtEnd: rank
    })

  }

}