

//Declare variables for game objects and behaviour indicators(FLAGS)
var canvas, backgroundImage;
var database;

var form;
var game, gameState;
var player, playerCount, allPlayers;

var car1, car2, car3, car4, cars;
var carImg1, carImg2, carImg3, carImg4;
var track, ground;

var carsAtFinishLine;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
    carImg1 = loadImage("images/car3.png");
    carImg2 = loadImage("images/car4.png");
    carImg3 = loadImage("images/car2.png");
    carImg4 = loadImage("images/car1.png");
    track = loadImage("images/track.jpg");
    ground = loadImage("images/ground.png");
}

//define the initial environment of the software(before it is used)
//by defining the declared variables with default values
function setup() {
    canvas = createCanvas(displayWidth - 20, displayHeight - 30);

    //initializing database object
    database = firebase.database();

    carsAtFinishLine = 0;

    gameState = 0; //0=WAIT, 1=PLAY, 2=END
    game = new Game();// creating new game object
    game.getState();//get the existing value of the field:**gameState**from the database and assign it to variable = gameState
    game.start();//function call to lod the game application

}

//All modifications, changes, conditions, manipulations, actionscommands to be executed and checked, continuously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
    background("white");

    //conditions for gameState to change from 0 to 1 to 2
    if (playerCount == 4) {
        /*
        function call to change existing value of gameState to a 
        new one based on the value of paramter passed in the database
        */
        game.updateState(1);
    }
    if (gameState == 1) {
        clear();
        /*
            function call to activate the game to START 1 mode and 
            aligned all players to starting positions at the start line
        */
        game.play();
    }
    if (gameState == 2) {
        /*
            function call to activate the game to END: 2 mode and 
            aligned all players to finish positions at the end line
        */
        game.end();
    }
}