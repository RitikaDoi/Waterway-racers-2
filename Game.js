class Game 
{
    constructor()
    {
  
    }

    getState()
    {
        
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data)
        {
           gamestate = data.val();
        })
    
    }

    update(state)
    {
        
        database.ref('/').update({
          gameState: state
        });
      
    }
    
    async start()
    {
        if(gamestate === 0)
        {
          
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          
          if(playerCountRef.exists())
          {
            
            playerCount = playerCountRef.val();
            player.getCount();
          
          }
          
          form = new Form()
          form.display();
        
        }

        boat1 = createSprite(100,200);
        boat1.addImage("boat1",boat1Image);
        boat2 = createSprite(300,200);
        boat2.addImage("boat2",boat2Image);
        boat3 = createSprite(500,200);
        boat3.addImage("boat3",boat3Image);
        boats = [boat1, boat2, boat3];
        boat1.debug = true;
        boat2.debug = true;
        boat3.debug = true;

    }

    play()
    {

        form.hide();
        
        Player.getPlayerInfo();
        player.getBoatsAtEnd();
        
        if(allPlayers !== undefined){
          background(rgb(2, 70, 103));
          image(bg, 20, -displayHeight*10, displayWidth, displayHeight*50);
          
          //var display_position = 100;
          
          //index of the array
          var index = 0;
    
          //x and y position of the boats
          var x = 175 ;
          var y;
    
          for(var plr in allPlayers)
          {
            
            //add 1 to the index for every loop
            index = index + 1 ;
            
            //use data form the database to display the boats in y direction
            y = displayHeight - allPlayers[plr].distance;
            x = displayWidth/2 - allPlayers[plr].distanceX;
            //position the boats a little away from each other in x direction
            x = x + 200;
            boats[index-1].x = x;
            boats[index-1].y = y;
    
            if (index === player.index)
            {

               //add code to display the player's name on the respective basket.
            fill("yellow");
            textSize(20);
            text("Killed% = " + player.killed, x-40, y-160)
              
              //boats[index - 1].shapeColor = "red";
              camera.position.x = displayWidth/2;
              camera.position.y = boats[index-1].y;
            
            }
           
          }

          if(frameCount%30 === 0)
          {

            tube = createSprite(0, random(-displayHeight*9, 50), 100, 10);
            var num = Math.round(random(1,2))
            if(num === 1)
            {

                tube.addImage(tube1Image);

            }else
            {

                tube.addImage(tube2Image);

            }

            tube.velocityX = 5;
            tube.scale = 0.6;
            tube.lifetime = 300;
            tube.debug = true;
            tubeGroup.add(tube);

          }
    
        }

        if(frameCount%50 === 0)
        {

            stone = createSprite(0, random(-displayHeight*9, 50), 100, 10)
            stone.addImage(stoneImage);
            stone.velocityX = 8;
            stone.lifetime = 300;
            stone.scale = 0.3;
            stone.debug = true;
            stoneGroup.add(stone);

        }

        if(frameCount%100 === 0)
        {

            speedBooster = createSprite(random(0, displayHeight), random(-displayHeight*9, 50), 100, 10)
            speedBooster.addImage(speedBoosterImage);
            speedBooster.scale = 0.5;
            speedBoosterGroup.add(speedBooster);
            speedBooster.depth = boats.depth;
            boats.depth += 1;

        }

        if (player.index !== null) {
          for (var i = 0; i < tubeGroup.length; i++) {
              if (tubeGroup.get(i).isTouching(boats)) {
                  tubeGroup.get(i).destroy();
                  player.killed = player.killed + 10;
                  player.update();
               
                  
              }
              
          }
        
          if(player.killed === 50 || stoneGroup.isTouching(boats))
        {

          stoneGroup.destroyEach();
          console.log("You are out of the game.")
          gamestate = 2;

        }

          if(speedBoosterGroup.isTouching(boats))
          {

            player.distance += 200;

          }

        }
    
        if(keyIsDown(UP_ARROW) && player.index !== null){
          player.distance += 10
          player.update();
        }
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
          player.distanceX -= 10
          player.update();
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
          player.distanceX += 10
          player.update();
        }

        if(player.distance > 7990)
        {
          
          gamestate = 3;
          player.rank += 1
          Player.updateBoatsAtEnd(player.rank);
          textSize(40);
          fill("pink")
          text("Good Job! You are " + player.rank + "st :)", displayWidth/2 - 200, camera.position.y - 200);
        
        }
       
        drawSprites();
      }

      gameOver()
      {

        console.log("Game Over");
        background(gameOverImage);
      
      }

      end()
      {
        
        console.log("Game Ended");
        console.log(player.rank);
      
      }

}