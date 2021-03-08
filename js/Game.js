class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if(player.index === index){
                stroke(10);
                fill("red");
                ellipse(x,y,60,60);
                fill("black");
                textSize(25);
                text(allPlayers[plr].name,x-25,y+25);
            }
        }


        // Give movements for the players using arrow keys
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance +=10
            player.update();
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance -=10
            player.update();
        }

        
        if(player.distance > 4400){
            gameState = 2;
        }

        // Create and spawn fruits randomly
        if(frameCount % 40 === 0){
            var fruit = createSprite(random(100,900),0);
            fruit.velocityY = 12;
            switch(Math.round(random(1,5))){
                case 1: fruit.addImage(fruit1_img)
                break;
                case 2: fruit.addImage(fruit2_img)
                break;
                case 3: fruit.addImage(fruit3_img)
                break;
                case 4: fruit.addImage(fruit4_img)
                break;
                case 5: fruit.addImage(fruit5_img)
                break;
            }
            fruitGroup.add(fruit);
            fruitGroup.setLifetimeEach(40);
        }
        if (player.index !== null) {
            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup.get(i).isTouching(players)) {
                    fruitGroup.get(i).destroy();
                    fruitGroup.setLifetimeEach(20);
                    player.score =player.score+1;
                    player.update();
                    
                }
            }
        }
        if(player.score >= 10){
            gameState = 2;
        }
        
    }

    end(){
       console.log("YOU WON!!!!");
    }
}