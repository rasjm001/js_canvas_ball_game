//Find the canvas element in the html document and assign to a const
const canvas = document.querySelector('canvas');

//context cont- contain all the information for the canvas eg style, lines, colours
const context = canvas.getContext('2d');


//set the canvas width to take up the whole screen;
canvas.width = innerWidth;

//set canvas height to take up screen also
canvas.height = innerHeight;

//create a player class
class Player{
    //each initialisation of player will used the contructor element- set up method
    constructor(x, y, radius, colour){
        this.x = x;
        this.y = y;
        this.radius= radius; 
        this.colour = colour;
    }

    //create the draw function to draw the player using the provided parameters

    draw(){
        //beingPath() to start the drawing process
        context.beginPath()

        //create the circle using the provided parameters
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle =this.colour;
        context.fill();
    }
}


class Projectile{
    constructor(x, y, radius, colour, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.velocity =velocity;

    }

    //function to call to draw the circle using the provided parameters
    draw(){
        //beingPath() to start the drawing process
        context.beginPath()

        //create the circle using the provided parameters
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle =this.colour;
        context.fill();
    }
}


//determine the middle of the window for the player spawning site ( to accomadate for different screens)
canvas_middle_width = canvas.width / 2;
canvas_middle_height = canvas.height /2;

// create an instance of the player

const player = new Player(canvas_middle_width, canvas_middle_height, 30, 'blue');
player.draw();


// add an event listener ( takes parameter of the event and a function)
window.addEventListener("click", (event) => {

    //the event object contains all the relevent information about the event therefore can be used to get information such as mouse position
    console.log(event);
    //create an instance of the projectile class when clicked

    //use event.ClientY, and event.ClientX for the mouse position
    const projectile = new Projectile(event.clientX, event.clientY, 5, 'pink', null);

    //call the draw function for the projectile to draw it to screen
    projectile.draw()

    console.log("clicked")
})