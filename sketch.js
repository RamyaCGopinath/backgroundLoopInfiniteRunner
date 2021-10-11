const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine, world;

var gameState = "play";
var backgroundScene0, backgroundScene1, scene1, scene2;
var level = 1;
var score = 0;
var l = 0;
var boy, boyColliderLine;
var object1Group;
function preload()
{
    scene0 = loadImage("images1/scene1.png");
    scene1 = loadImage("images1/scene2.png");
    olafImg = loadImage("olafPng.png");
    l = loadImage("olafLeftArmPng.png");
    r = loadImage("olafRightArmPng.png");
 /*   boyRunning = loadAnimation("assets/boy/u0.png","assets/boy/u1.png","assets/boy/u2.png",
                                   "assets/boy/u3.png","assets/boy/u4.png","assets/boy/u5.png",
                                   "assets/boy/u6.png","assets/boy/u7.png","assets/boy/u8.png",
                                   "assets/boy/u9.png","assets/boy/u10.png","assets/boy/u11.png",
                                   "assets/boy/u12.png","assets/boy/u13.png","assets/boy/u14.png",
                                   "assets/boy/u15.png","assets/boy/u16.png","assets/boy/u17.png",
                                   "assets/boy/u18.png","assets/boy/u19.png","assets/boy/u20.png",
                                   "assets/boy/u21.png","assets/boy/u22.png");
                                   */
}




function setup() {
  var canvas = createCanvas(windowWidth,windowHeight-4);
  
  engine = Engine.create();
  world = engine.world;

  scene0.resize(width,height-30);
  scene1.resize(width,height-30);
  backgroundScene0 = createSprite(width/2, 30+height/2, width, height);
  backgroundScene0.shapeColor = "pink";
  backgroundScene0.addImage("level0", scene0);
  backgroundScene0.addImage("level1", scene1);
  backgroundScene0.velocityX = -7;

  
  backgroundScene1 = createSprite(width+width/2, 30+height/2, width, height);
  backgroundScene1.shapeColor = "lightblue";
  backgroundScene1.addImage("level0", scene0);
  backgroundScene1.addImage("level1", scene1);
  backgroundScene1.velocityX = -7;

  
  boyColliderLine = createSprite(50,height-110,100,10);

  boy = createSprite(60, height-200, 20,60);
  boy.addImage("olaf", olafImg);
  boy.scale = 0.1;

  //boyl = createSprite(35, height-170, 20,60);
 // boyl.addImage("olafl", l);
  //boyl.scale = 0.12;
  //boyl.rotation = -125;
  boyl = Bodies.rectangle(35,height-170,20,20,{isStatic:true});
  World.add(world,boyl);

  boyr = createSprite(82, height-178, 20,60);
  boyr.addImage("olafr", r);
  boyr.scale = 0.12;
  boyr.rotation = 115;
  object1Group = new Group();

  imageMode(CENTER);
  console.log(boyl);
}

function draw() {
  background(0);
 // image(l, boyl.position.x, boyl.position.y);
  textSize(30);
  fill(255);
  textAlign(CENTER);

  if(gameState == "play"){
    console.log(l);
    if(keyDown("space") && boy.y>=300){
        boy.velocityY = -15;
    }
  //  boy.velocityY+=0.5;

    // if(keyDown("left")){
    //   boyl.rotation+=1;
    // }
    // if(keyDown("right")){
    //   boyl.rotation-=1;
    // }

  
  if(backgroundScene0.x<=-width/2){
    backgroundScene0.x = backgroundScene1.x+width;
  }
  if(backgroundScene1.x<=-width/2){
    backgroundScene1.x = backgroundScene0.x+width;
  }
  
  if(frameCount%30 == 0){
    spawnObject();
  }

    if(score%3 == 0)  
    {
    //  console.log("*****");
    //  console.log(score);
    //  console.log("------");
      l="level"+floor(score/3);
      backgroundScene0.changeImage(l);
      backgroundScene1.changeImage(l);
      if(l == "level0"){
        //nothing
      }
      else if(l == "level1"){
        boyColliderLine.y = height-40;
        for(k in object1Group){
          object1Group[k].y=height-70
          object1Group[k].shapeColor = "pink";
        }
      }
      else{
        gameState = "end";
      }
    }
  boy.collide(boyColliderLine);

 
  boy.isTouching(object1Group, d)

  drawSprites();
  text("Score = "+score,80,35);
  text("Infinite Runner Game", width/2, 35);
}

else if(gameState == "end"){
    text("Game Over",-100+width/2,-100+height/2);
}

}
function d(boy,object1){
  object1.destroy();
  score=score+1;

}
function spawnObject(){
  object1 = createSprite(width+20, height-150, 30,30);
  object1.velocityX = -10;
  object1.shapeColor = "purple";
  object1Group.add(object1);
}

function mouseDragged(){
  
}

