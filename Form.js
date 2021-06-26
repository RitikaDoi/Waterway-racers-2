class Form
{

    constructor()
    {

        this.input = createInput('Enter your name');
        this.button = createButton('Submit');
        this.greeting = createElement('h2');
        this.title = createElement('h1')
        this.rules = createElement('h3');
        this.resetButton = createButton('Reset');

    }

    hide()
    {

        this.greeting.hide();
        this.button.hide()
        this.input.hide();
        this.title.hide();
        this.rules.hide();

    }

    display()
    {

        this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
        this.button.position(displayWidth/2 + 30, displayHeight/2);

        this.title.html("Waterway Racers");
        this.title.position(displayWidth/2 - 50, 0);

        this.resetButton.position(displayWidth - 100, 20);

        this.rules.html("RULES:- You can go forward, left and right by using arrow keys but can't go backward. If your boat will touch any stone then you will be out of the game. if it touches tube then your Killed% will be increased by 10 and if Killed% will be equals to 50 then also you will be out of the game. There will be Speed Boosters(as arrows), if you will touch them then you can go further than other players. The racer who will reach the end 1st will win this game :)");
        this.rules.position(10, displayHeight/2-250);

        this.resetButton.mousePressed(()=>
        {

            player.updateCount(0);
            game.update(0);
            Player.updateBoatsAtEnd(0);
      
        })

        this.button.mousePressed(()=>
        {

            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount+=1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Welcome! " + player.name + " :)")
            this.greeting.position(displayWidth/2 - 90, displayHeight/3);

        })

    }

}