var bg;

var boat1, boat2, boat3;
var boats=[]
var stone, tube, speedBooster;
var stoneGroup, tubeGroup, speedBoosterGroup;

var tube1Image, tube2Image, SpeedBoosterImage;
var boat1Image, boat2Image, boat3Image;
var stoneImage;
var gameOverImage;

var gamestate = 0;
var distance = 0;
var score = 0;

var playerCount;
var allPlayers;

var database;

var form, game, player;

function preload() 
{
  
  bg = loadImage("images/Ocean image(long).jpg");

  tube1Image = loadImage("images/Tube_image_1-removebg-preview.png");
  tube2Image = loadImage("images/Tube_image_2-removebg-preview.png");

  boat1Image = loadImage("images/Boat_image_2-removebg-preview.png");
  boat2Image = loadImage("images/Boat_image_3-removebg-preview.png");
  boat3Image = loadImage("images/Boat_image_4-removebg-preview.png");

  stoneImage = loadImage("images/Stone_image_2-removebg-preview.png");

  speedBoosterImage = loadImage("images/arrow_image-removebg-preview (1).png");

  gameOverImage = loadImage("images/Game over image for waterway racers.jpg");
  
}

function setup() 
{
  
  createCanvas(displayWidth - 20, displayHeight);

  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();

  tubeGroup = new Group();
  stoneGroup = new Group();
  speedBoosterGroup = new Group();
  
}

function draw() 
{

  if(playerCount === 3)
  {
    
    game.update(1);
  
  }
  
  if(gamestate === 1)
  {
    
    clear();
    game.play();
  
  }
  
  if(gamestate === 2)
  {
    
    game.gameOver();
  
  }

  if(gamestate === 3)
  {
    
    game.end();
  
  }

}