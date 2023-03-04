var SnowImg, Snow;
var groundImg,ground,groundsGroup;
var Penguin,PenguinImg;
var gameState = "play"
var score=0;

function preload(){
  SnowImg = loadImage("Snow.png");
 groundImg = loadImage("2.png"); 
 PenguinImg = loadAnimation("Penguin1.png","Penguin2.png")
}

function setup(){
  createCanvas(600,500);
 
  Snow = createSprite(300,250);
  Snow.addImage("Snow",SnowImg);
  Snow.velocityY = 1;
  Snow.scale=1.5;
  
 groundsGroup = new Group();
  
  
  Penguin = createSprite(200,200,50,50);
  Penguin.scale = 0.3;
  Penguin.addAnimation("Penguin",PenguinImg);
}

function draw(){
  background(255);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      Penguin.x = Penguin.x - 3;
    }
    
    if(keyDown("right_arrow")){
      Penguin.x = Penguin.x + 3;
    }
    
    if(keyDown("space")){
      Penguin.velocityY = -10;
    }
    
    Penguin.velocityY = Penguin.velocityY + 0.5
    
    if(Snow.y > 400){
      Snow.y = 300
    }
    spawngrounds();

    
    //climbersGroup.collide(Penguin);
    if(groundsGroup.isTouching(Penguin)){
      Penguin.velocityY = 0;
    }
    if(Penguin.y > 600){
      Penguin.destroy();
      gameState = "end"
    }
    
    drawSprites();
    text("Score:"+score,500,50);

    score+=Math.round(getFrameRate()/60);
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }


}

function spawngrounds() {
  //write code here to spawn thegrounds in the Snow
  if (frameCount % 240 === 0) {
    var ground = createSprite(200, -50);
    
    
   ground.x = Math.round(random(120,400));
    
   ground.addImage(groundImg);
   ground.scale=0.5
    
   ground.velocityY = 1;
    
    
    Penguin.depth =ground.depth;
    Penguin.depth +=1;
   
    //assign lifetime to the variable
   ground.lifetime = 800;
    

    
    //add eachground to the group
   groundsGroup.add(ground);
    
  }
}

