
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bobObject1 , bobObject2 , bobObject3 , bobObject4 , bobObject5;
var roofObject;
var rope1 , rope2 , rope3 , rope4 , rope5;
var world;
var invisible;
var upSound;
var downSound;
var bg;

function preLoad(){
	upSound = loadSound("up.wav");
	downSound = loadSound("down.wav");
}

function setup() {
	createCanvas(1500,700);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;

	roofObject=new roof(width/2,height/4,width/7,20);

	bobDiameter=40;

	startBobPositionX=width/2;
	startBobPositionY=height/4+500;
	bobObject1=new bob(startBobPositionX-bobDiameter*2,startBobPositionY,bobDiameter);
	bobObject2=new bob(startBobPositionX-bobDiameter,startBobPositionY,bobDiameter);
	bobObject3=new bob(startBobPositionX,startBobPositionY,bobDiameter);
	bobObject4=new bob(startBobPositionX+bobDiameter,startBobPositionY,bobDiameter);
	bobObject5=new bob(startBobPositionX+bobDiameter*2,startBobPositionY,bobDiameter);

	rope1=new rope(bobObject1.body,roofObject.body,-bobDiameter*2, 0)

	rope2=new rope(bobObject2.body,roofObject.body,-bobDiameter*1, 0)
	rope3=new rope(bobObject3.body,roofObject.body,0, 0)
	rope4=new rope(bobObject4.body,roofObject.body,bobDiameter*1, 0)
	rope5=new rope(bobObject5.body,roofObject.body,bobDiameter*2, 0);

	invisible = new roof(roofObject.x,29,10000,50);

	Engine.run(engine);
	console.log("WARNING! using console may allow attackers to attack and hack you system.");
	console.log("don't paste/copy/enter the code you don't know");
}

function keyPressed() {
  	if (keyCode === UP_ARROW) {
		Matter.Body.applyForce(bobObject1.body,bobObject1.body.position,{x:-50,y:-45});
	  }
    if (keyCode === DOWN_ARROW) {
    	Matter.Body.applyForce(bobObject5.body,bobObject5.body.position,{x:+50,y:-45});
	  }
}

function draw() {
	background("brown");
	if (keyCode === UP_ARROW) {
		background("red");
		upSound.play();
	  } 
	else if (keyCode === DOWN_ARROW) {
		  background("yellow");
	  }
	  else if(keyCode) {
		background("orange");
	  }
  rectMode(CENTER);
  roofObject.display();

  rope1.display()
  rope2.display()
  rope3.display()
  rope4.display()
  rope5.display()	
  bobObject1.display();
  bobObject2.display();
  bobObject3.display();
  bobObject4.display();
  bobObject5.display();
  textSize(18);
  fill("blue");
  text("press up to move 1st bob",20,20);
  text("press down to move last bob",20,80);
}

function drawLine(constraint){
	bobBodyPosition=constraint.bodyA.position
	roofBodyPosition=constraint.bodyB.position

	roofBodyOffset=constraint.pointB;
	
	roofBodyX=roofBodyPosition.x+roofBodyOffset.x
	roofBodyY=roofBodyPosition.y+roofBodyOffset.y
	line(bobBodyPosition.x, bobBodyPosition.y, roofBodyX,roofBodyY);
}