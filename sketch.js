var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var particle = null;
var turn = 0;
var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  textSize(40)
  text("100",5,500);
  text("100",85,500);
  text("100",165,500);
  text("100",245,500);
  text("300",325,500);
  text("300",405,500);
  text("300",485,500);
  text("500",565,500);
  text("500",645,500);
  text("500",725,500);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(turn>= 5){
     gameState = "end";
   }
   if(particle !== null){
    particle.display();
    if(particle.body.position.x>565 && particle.body.position.x<801 && particle.body.position.y>750){
      score = score + 500;
      particle=null;
    }
    else if(particle.body.position.x>325 && particle.body.position.x<564 && particle.body.position.y>750){
      score = score + 300;
      particle=null;
    }
    else if(particle.body.position.x>0 && particle.body.position.x<324 && particle.body.position.y>750){
      score = score + 100;
      particle=null;
    }
   }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   if(gameState === "end" && particle === null){
    textSize(60);
    text("GAMEOVER",250,250);
  }
}

function mousePressed(){
  if(gameState !== "end"){
    turn++;
    particle = new Particle(mouseX,10,10,10);
  }
}