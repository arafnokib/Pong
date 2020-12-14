class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset')
    this.info = createElement('h2')
    this.game = createButton('3')
    this.next1 = createButton('Next1')
    this.next2 = createButton('Next2')
    this.next3 = createButton('Next3')
    this.next4 = createButton('Next4')

  }
   hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Untitled Game");
    this.title.position(600, 100);

    this.input.position(450, 200);
    this.button.position(650,200);
    this.game.mousePressed(()=>{
      gameState = 3;
    })
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Welcome " + player.name)
      this.greeting.position(600, 300);
      this.info.html(player.name + " is the red paddle!")

    });
    this.reset.mousePressed(()=>{
      var dbRef;
      dbRef = database.ref('players')
      dbRef.remove();
      player.resetCount();
      window.location.reload();
    });

  }
}
