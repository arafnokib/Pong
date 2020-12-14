class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      var ballRef = await database.ref('ball').once("value");

      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      if(ballRef.exists()){
       // player.readBall();
      }
      form = new Form()
      form.display();
    }


    //player.setBall();
    paddle1 = createSprite(115,304,20,150);
    
    paddle2 = createSprite(1085,304,20,150);
    ball = createSprite(600, 304)
    ball.addImage("ball", b1)
    ball.scale = 0.07

    topWall = createSprite(600,60,1200,10)
    bottomWall = createSprite(600,560,1200,10)
    topWall.visible = false;
    bottomWall.visible = false;

   
  
    paddles = [paddle1, paddle2];
  }

  play(){
    form.hide();
    createEdgeSprites();
    
    
    ball.bounceOff(paddle1);
    ball.bounceOff(paddle2);
    ball.bounceOff(topWall);
    ball.bounceOff(bottomWall);
    paddle1.bounceOff(topWall)
    paddle1.bounceOff(bottomWall)
    paddle2.bounceOff(topWall)
    paddle2.bounceOff(bottomWall)
    if(ball.x === 65){
      //player.updateScore2();
    }
    if(ball.x ===1165){
      //player.updateScore1();
    }

    if(keyWentDown("space")){
      ball.velocityX = 5;
      ball.velocityY = 5;
      }

    if(ball.isTouching(topWall)){
      ball.velocityX = 5;
    }
    if(ball.isTouching(bottomWall)){
      ball.velocityX = -5;

    }
    
    Player.getPlayerInfo();
    
    player.readBall()
    player.writeBall();
    
    if(allPlayers !== undefined){
     // background(85);
      //imageMode(CENTER)
   // readBall();
   // updateBall();
     image(bg,0,5,1200,600)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = -865 ;
      var y = 300;
 

      

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
       // player.distance = 590
        //position the cars a little away from each other in x direction
        x = x + 980;
        //use data form the database to display the cars in y direction
        y = 600 - allPlayers[plr].y;
        paddles[index-1].x = x;
        paddles[index-1].y = y;
       // console.log(paddles[index-1].y)
       // console.log(paddles[1].x)
        if (index === player.index){
         
         
          paddles[index - 1].shapeColor = "red";
         /* 
          camera.position.x = displayWidth/2;
          camera.position.y = paddles[index-1].y;
          */
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y += 10
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y -= 10
      player.update();
    }

   
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
