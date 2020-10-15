
var monkey , monkey_running,monkey_stop;
var bananaImage,obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground,groundImage;
var back,backImage;
var gameState = "play";
var score=0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png  ","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop=loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
  backImage = loadImage("back.jpg");
 
}



function setup() {
  createCanvas(600,300);
  // to create background
  back= createSprite(300,150,400,300);
  back.addImage("back",backImage);
  back.x = width /2;
  back.scale=0.14;
  // to create the ground path
  ground = createSprite(200,290,400,20);
  ground.addImage("ground",groundImage);
  ground.x = width /2;
  ground.velocityX = -(7+20* score/100);
  // to create the main charecter
  monkey = createSprite(50,160,20,50);
  monkey.scale=0.1;
  monkey.addAnimation("monkey",monkey_running);
  //create banana Group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
 background(220); 
  if (gameState==="play"){
      // to create the scoring 
      score = score + Math.round(getFrameRate()/60);
      // to give create infinite land
     if (ground.x < 200) {
      ground.x = width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -10;
    }
    // #gravity
    monkey.velocityY = monkey.velocityY + 0.8
    // to not let monkey fall off
    monkey.collide(ground);
    // to spawn bananans and stones
    spawnBananas();
    spawnObstacles();
    // to collect bananas
  if(bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
      }
    // to move to end state
  if(obstacleGroup.isTouching(monkey)){
          gameState = "end";
          }
  }
  if (gameState=="end"){
        score="You Lost";
        ground.velocityX=0;
        monkey.collide(ground);
        bananaGroup.destroyEach();
        obstacleGroup.destroyEach();
        monkey.addImage("monkey",monkey_stop)
  }

  drawSprites();

  //displaying score above the background sprite 
  textFont("Impact");
  fill("Red");
  textSize(20);
  text("Survival Time: "+ score, 400,20); 
}

function spawnBananas() {
  // spawn the bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
   bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  // spawn the obstacles
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,215,40,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
  
    
    //add each stone to the group
   obstacleGroup.add(obstacle);
  }
}





