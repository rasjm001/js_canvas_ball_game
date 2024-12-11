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

    //update function for the changes to occur during animation
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

    }
}

//creat an enemy class

class Enemy{
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

    //update function for the changes to occur during animation
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

    }
}


//determine the middle of the window for the player spawning site ( to accomadate for different screens)
canvas_middle_width = canvas.width / 2;
canvas_middle_height = canvas.height /2;

// create an instance of the player
const player = new Player(canvas_middle_width, canvas_middle_height, 30, 'blue');

//create an array to hold all the projectile so they can drawn out at once;
const projectiles_array = [];

// create array for enemies
const enemy_array= [];

function spawn_enemies(){
    //set interval ( code you want to call, time between calls)
    setInterval(()=>{

        // set a random spawn size between 4 and 30
        const radius = Math.random() * (30-4) + 4;
        
        let x;
        let y;
        // get enemy to spawn either left of canvas ( less than 30)
        // or spawn right of canvas ( < canvas.width)
        // use ternery operator for 50/50 chance of spawc
        // if condition '?' then this : else this

        if(Math.random() < .5){
        x = Math.random() < .5 ? 0-radius : canvas.width+radius;
        y = Math.random() * canvas.height;
        // y = Math.random() < .5 ? 0-radius : canvas.height + radius;

        } else
        {
            x = Math.random() * canvas.width;
            y = y = Math.random() < .5 ? 0-radius : canvas.height + radius;
        }
         

       
        
        const colour = "green";
        
        // determine the angle towards the player ( centre of sceen)
        const angle = Math.atan2(
             canvas.height/2 -y, canvas.width/2 - x )
    
        const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }


        


        enemy_array.push(new Enemy(x, y, radius, colour, velocity))

       // console.log(enemy_array)
    }, 500)

}


spawn_enemies();

//animation function
function animate(){

    //call the animate function within the function to create ongoing animation loop
    requestAnimationFrame(animate)

    //clear the canvas prior to drawing next frame;
    context.clearRect(0,0, canvas.width, canvas.height);

    // draw the player to the screen after clearing the screen
    player.draw();

    // update the position and draw each projectile in the projectile arrat
    projectiles_array.forEach((projectile) =>{
        projectile.update()
    })

    enemy_array.forEach((enemy, index) => {
        enemy.update();
        
        //Collision detection for player
        const distance_to_player = Math.hypot(player.x - enemy.x, player.y -enemy.y)
        
        if (distance_to_player -enemy.radius - player.radius < 1){

            console.log("player has been hit")
        }

        //loop through projectiles to check for collisions
        projectiles_array.forEach((projectile, projectile_index )=> {
            //use math.hypo ( hypothenus, check the distance between two points)
            //use the projectile and enemy x and y co-ord as the parameters
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y -enemy.y)

            //check to see if the distance, minus the radius of both the enemy and projectile is <1
            if(distance - enemy.radius - projectile.radius <1){

                //use setTimeout to prevent flashing of objcets when deleted after collision by seeing timeout to 0 (waits to tnext frame)
                setTimeout(() => {
                    //take the enemy out of the enemy array at the index of the array
                    enemy_array.splice(index, 1);

                    //take the projectile out of the projectile array at the projectile's index.
                    projectiles_array.splice(projectile_index, 1);

                }, 0)

             


            }

        })
    });


}


// add an event listener ( takes parameter of the event and a function)
window.addEventListener("click", (event) => {

    //get the angle to the mouse click position;
    const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2 )
    
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }


    //create instance o projectile on clivk and add to array
    projectiles_array.push(new Projectile(canvas.width/2, canvas.height/2, 5, 'red', velocity ))



    //the event object contains all the relevent information about the event therefore can be used to get information such as mouse position
  //  console.log(event);
    //create an instance of the projectile class when clicked

    //use event.ClientY, and event.ClientX for the mouse position
    // const projectile = new Projectile(event.ClientX, event.ClientY, 5, 'red', null);

    //to spawn ball and middle of screen use the canvas w/h /2.

    //call the draw function for the projectile to draw it to screen
   // projectile.draw()

    console.log("clicked")
})

animate();