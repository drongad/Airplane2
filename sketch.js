var bird, air
var gameOverImage, restartImg
var sky;
var birdImg, airImg, skyImg
var invisibleBottom
var invisibleTop
var birdGroup
var score = 0
var PLAY = 0
var END = 1
var gameState = 0
var gameOver, restart
var edges
var airplaneSound, explosionSound

function preload(){
  airImg = loadImage("Airplane.png")
  birdImg = loadImage("Bird.png")
  skyImg = loadImage("Sky.png")
  birdGroup = new Group()
  gameOverImage = loadImage("GameOver.png")
  restartImg = loadImage("RestartImage.png")
  airplaneSound = loadSound("airplanes.mp3")
  explosionSound = loadSound("explosion.mp3")
  
}

function setup() {
  createCanvas(600, 450);
  sky = createSprite(300,100)
  sky.addImage(skyImg)
  sky.velocityX = 4
  sky.scale = 3

  air = createSprite(530,120)
  air.addImage(airImg)
  air.scale = 0.4
  air.setCollider("circle", 0,0, 125)
  gameOver = createSprite(310,225)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5
  gameOver.visible = false
  restart = createSprite(310,350)
  restart.addImage(restartImg)
  restart.scale = 0.3
  restart.visible = false
  
  
}

function draw() {
  if(mousePressedOver(restart)){
    reset()
  }
  
 if(gameState === PLAY){
  background("gray")
  airplaneSound.play()
  score = score + Math.round(getFrameRate()/60)
  edges = createEdgeSprites()
  air.collide(edges)
  if(sky.x>400){
    sky.x = 300
  }
  
  
  if(keyDown("up")){
    air.y -=9
  }
  if(keyDown("down")){
    air.y +=9
  }
  if(air.isTouching(birdGroup)){
    gameState = END
    air.visible = false
    birdGroup.destroyEach()
    birdGroup.setVelocityXEach(0)
    gameOver.visible = true
    restart.visible = true
    airplaneSound.stop()
    explosionSound.play()

    score = 0
    
    
  } 
  
  
    
   
  
  
  
 
  

  spawnBirds()
  drawSprites()
  fill("white")
  textSize(18)
  text("Score: "+ score, 10,20)
}
}
function spawnBirds(){
  if(frameCount % 40 === 0){
    bird = createSprite(-5, 200)
    bird.y = Math.round(random(50, 400))
    bird.addImage(birdImg)
    bird.velocityX = 11
    bird.scale = 0.5
    birdGroup.add(bird)
    
  }
}

function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  air.visible = true
 
}







