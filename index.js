
//Find the canvas element in the html document and assign to a const
const canvas = document.querySelector("canvas");

//context cont- contain all the information for the canvas eg style, lines, colours
const context = canvas.getContext('2d');


//find the score element with the id #score_element
const score_element = document.querySelector('#score_element');

//find the start game button
const start_button = document.querySelector('#start_game_button');

//const for the game over score

const big_score = document.querySelector("#big_score")

//find the menu screen
const menu = document.querySelector('#menu_screen')


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

//create a friction var to reduce the speed of the particles over time
const friction = 0.98

class Particle{
    constructor(x, y, radius, colour, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.velocity =velocity;

        //alpha value added to enable fading of particle from screen
        // doesnt need to be passed in, as always starts at one
        this.alpha =1;

    }

    //function to call to draw the circle using the provided parameters
    draw(){

        //need to use the context.save, as manipulation the alpha values
        context.save()
        context.globalAlpha = this.alpha
        //beingPath() to start the drawing process
        context.beginPath()

        //create the circle using the provided parameters
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle =this.colour;
        context.fill();
        context.restore()
    }

    //update function for the changes to occur during animation
    update(){
        
        this.velocity.x * friction;
        this.velocity.y * friction;
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01

    }
}


//determine the middle of the window for the player spawning site ( to accomadate for different screens)
canvas_middle_width = canvas.width / 2;
canvas_middle_height = canvas.height /2;

// create an instance of the player
let player = new Player(canvas_middle_width, canvas_middle_height, 10, 'white');

//create an array to hold all the projectile so they can drawn out at once;
let projectiles_array = [];

// create array for enemies
let enemy_array= [];

// particle array
let particle_array= []

function init(){
// create an instance of the player
player = new Player(canvas_middle_width, canvas_middle_height, 10, 'white');

//create an array to hold all the projectile so they can drawn out at once;
projectiles_array = [];

// create array for enemies
enemy_array= [];

// particle array
particle_array= []

score = 0;
score_element.innerHTML = score;
big_score.innerHTML =score;
}

function spawn_enemies(){
    //set interval ( code you want to call, time between calls)
    setInterval(()=>{

        // set a random spawn size between 4 and 30
        const radius = Math.random() * (30-5) + 5;
        
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
         

       
        //Random colour generator for JS (using template literal)
        const colour = `hsl(${Math.random() *360}, 50%, 50%)`
        
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




//variable for the current animation frame for pause/gameover
let animation_id;

//variable for the score 
let score = 0;

//animation function
function animate(){

    //call the animate function within the function to create ongoing animation loop
    // assign the current frame to var for gameover /pause screen
    animation_id = requestAnimationFrame(animate)

    //clear the canvas prior to drawing next frame;
    //if using clearRect it will clear the background too - use fillstyle to have consitent bg
    //context.clearRect(0,0, canvas.width, canvas.height);

    //using the 0.1 as opacity creates streaking lighttrail effects
    context.fillStyle = "rgba(0,0,0,1)"
    //context.fillStyle = "rgba(0,0,0,.1)"
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw the player to the screen after clearing the screen
    player.draw();

    //loop through and draw the particles in the particle array

    particle_array.forEach((particle, index) =>{
        if(particle.alpha <= 0 ){
            particle_array.splice(index,1)
        }else{
        particle.update()}
    })
    // update the position and draw each projectile in the projectile arrat
    projectiles_array.forEach((projectile, projectile_index) =>{
        projectile.update()

        //remove the projectile if they are off the screen
        if( projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width||
            projectile.y +projectile.radius < 0 || 
            projectile.y - projectile.radius > canvas.height
        )
        {
            setTimeout(()=>{
                projectiles_array.splice(projectile_index,1)
            }, 0)
        }
    })

    enemy_array.forEach((enemy, index) => {
        enemy.update();
        
        //Collision detection for player
        const distance_to_player = Math.hypot(player.x - enemy.x, player.y -enemy.y)
        
        if (distance_to_player -enemy.radius - player.radius < 1){

            //cancel animation on the current frame if the player is hit
            cancelAnimationFrame(animation_id);

            //make the menu reappear on the screen
            menu.style.display ='flex';

            //change the end score element
            big_score.innerHTML = score
            
        }

        //loop through projectiles to check for collisions
        projectiles_array.forEach((projectile, projectile_index )=> {
            //use math.hypo ( hypothenus, check the distance between two points)
            //use the projectile and enemy x and y co-ord as the parameters
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y -enemy.y)

            //check to see if the distance, minus the radius of both the enemy and projectile is <1
            if(distance - enemy.radius - projectile.radius <1){
                
                //increase score when collision occurs with enemy
                score += 100;
                
                //change the inner html of the score_element to the score
                score_element.innerHTML = score;

                //determine the amount of particles accourding to the enemines radius ( eg bigger = more)
                for(let i = 0; i < enemy.radius; i++){
                    //create random radius up to 3.5
                    particle_array.push(new Particle(projectile.x, projectile.y, Math.random()*3.5, enemy.colour, 
                    {
                        x: (Math.random() -.5) * (Math.random() * 6), 
                        y: (Math.random()-.5)* (Math.random() * 6)}))
                }

                //if statement to check the radius size of the enmey ( if big enough, shrink until small)
                if(enemy.radius - 10 > 6){
                    //enemy.radius -=10
                    gsap.to(enemy,{
                        radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                 
                        //take the projectile out of the projectile array at the projectile's index.
                        projectiles_array.splice(projectile_index, 1);
    
                    }, 0)
                }else
                {
                //use setTimeout to prevent flashing of objcets when deleted after collision by seeing timeout to 0 (waits to tnext frame)
                setTimeout(() => {

                    score += 250;
                    score_element.innerHTML = score
                    //take the enemy out of the enemy array at the index of the array
                    enemy_array.splice(index, 1);

                    //take the projectile out of the projectile array at the projectile's index.
                    projectiles_array.splice(projectile_index, 1);

                }, 0)}

             


            }

        })
    });


}


// add an event listener ( takes parameter of the event and a function)
canvas.addEventListener("click", (event) => {
    console.log(projectiles_array)
    //get the angle to the mouse click position;
    const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2 )
    
    const velocity_multiplier = 5;

    const velocity = {
        x: Math.cos(angle) *velocity_multiplier,
        y: Math.sin(angle) * velocity_multiplier
    }


    //create instance o projectile on clivk and add to array
    projectiles_array.push(new Projectile(canvas.width/2, canvas.height/2, 5, 'white', velocity ))



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

start_button.addEventListener('click', () => {
    init()
    console.log("start button clicked")
    animate();
    spawn_enemies();
    menu.style.display = 'none'
   

})



/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function topbar_navigation_function() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }