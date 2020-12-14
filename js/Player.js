class Player {
  constructor(){
    this.index = null;
    this.y = 290;
    this.name = null;
    
    this.score = 0;
  }


 

  readBall(){
    var ballRefX = database.ref('ball/x')
    ballRefX.on("value",(data)=>{
      ballRefX = data.val();
    })

    var ballRefY = database.ref('ball/y')
    ballRefY.on("value",(data)=>{
      ballRefY = data.val();
    })

    ball.x = ballRefX
    ball.y = ballRefY

    console.log(ball.x)
    console.log(ball.y)
  }

  writeBall(){
    ballIndex = "ball"
    database.ref('ball').set({
      x: ball.x,
      y: ball.y
    })
  }



  readScore(){
    var scoreRef = database.ref('players/player' + this.index)
    scoreRef.on("value",(data)=>{
      scoreData = data.val();
    })
  }

  updateScore1(){
    
    scoreData+=1
    database.ref('players/player' + 1).update({
      score: scoreData
    })

    ball.x = 600
  }

  updateScore2(){
    
    scoreData+=1
    database.ref('players/player' + 2).update({
      score: scoreData
    })

    ball.x = 600
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }
  
  
  
  

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  resetCount(){
    database.ref('/').update({
      gameState: 0,
      playerCount: 0

    })
    
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      y:this.y,
      score: this.score

    });
  }
  
  
  


  updateBall(){
    database.ref('ball').update({
      
    })
  }

  

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
