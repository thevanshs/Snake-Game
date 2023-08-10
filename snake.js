const gameboard=document.querySelector("#gameboard");
const ctx=gameboard.getContext("2d");
const scoretext=document.querySelector("#scoretext");
const resetbtn=document.querySelector("#resetbtn");
const gamewidth=gameboard.width;
const gameheight=gameboard.height;

const boardbackground= "yellow";
const snakecolor="lime";
const snakeborder="black";
const foodcolor="red";
const unitsize=25;
let running=false;
let xvelocity=unitsize;
let yvelocity=0;
let foodx;
let foody;
let score=0;

let snake=[
    {x:unitsize*4, y:0},
    {x:unitsize*3, y:0},
    {x:unitsize*2, y:0},
    {x:unitsize*1, y:0},
    {x:unitsize*0, y:0}
];

window.addEventListener("keydown",changedirection);
resetbtn.addEventListener("click",resetgame);

gamestart();

function gamestart(){
    running=true;
    scoretext.textContent=score;
    createfood();
    drawfood();
    nexttick();
};
function nexttick(){
    if(running)
    {
        setTimeout(()=>{
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();
        },75);
    }
    else{
        displaygameover();
    }
};
function clearboard(){
    ctx.fillStyle=boardbackground;
    ctx.fillRect(0,0,gamewidth,gameheight);
};
function createfood(){
     function randomfood(min,max)
     {
        const randnum=Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return randnum;
     }
     foodx=randomfood(0,gamewidth-unitsize);
     foody=randomfood(0,gamewidth-unitsize);
};
function drawfood(){
    ctx.fillStyle=foodcolor;
    ctx.fillRect(foodx,foody,unitsize,unitsize);
};
function movesnake(){
    const head={x: snake[0].x + xvelocity,
                y: snake[0].y + yvelocity};

    snake.unshift(head);
    //if the food is eaten
    if(snake[0].x== foodx && snake[0].y== foody){
        score+=1;
        scoretext.textContent=score;
        createfood();
    }
    else{
        snake.pop();
    }
};
function drawsnake(){
    ctx.fillStyle=snakecolor;
    ctx.strokeStyle=snakeborder;
    snake.forEach(snakepart =>{
        ctx.fillRect(snakepart.x,snakepart.y,unitsize,unitsize);
        ctx.strokeRect(snakepart.x,snakepart.y,unitsize,unitsize);
    })
};
function changedirection(event){
    const keypressed=event.keyCode;
    const left=37;
    const up=38;
    const right=39;
    const down=40;

    const goingup=(yvelocity== -unitsize);
    const goingdown=(yvelocity== unitsize);
    const goingleft=(xvelocity== -unitsize);
    const goingright=(xvelocity== unitsize);


    switch(true)
    {
        case(keypressed==left && !goingright):
        {
            xvelocity=-unitsize;
            yvelocity=0;
            break;
        }
        case(keypressed==up && !goingdown):
        {
            yvelocity=-unitsize;
            xvelocity=0;
            break;
        }
        case(keypressed==right && !goingleft):
        {
            xvelocity=unitsize;
            yvelocity=0;
            break;
        }
        case(keypressed==down && !goingup):
        {
            yvelocity=unitsize;
            xvelocity=0;
            break;
        }
    }
};
function checkgameover(){
    switch(true)
    {
        case(snake[0].x<0):
            running =false;
            break;
        case(snake[0].x>=gamewidth):
            running =false;
            break;
        case(snake[0].y>=gameheight):
            running =false;
            break;
        case(snake[0].y<0):
            running =false;
            break;
    }
    for(let i=1 ; i<snake.length;i+=1)
    {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
        {
            running=false;
        }
    }
};
function displaygameover(){
    ctx.font="50px Roboto";
    ctx.fillStyle="black";
    ctx.textAlign="center"
    ctx.fillText("GAME OVER !!!",gameheight/2,gamewidth/2);
    running=false;
};
function resetgame(){
    score=0;
    xvelocity=unitsize;
    yvelocity=0;
    snake=[
        {x:unitsize*4, y:0},
        {x:unitsize*3, y:0},
        {x:unitsize*2, y:0},
        {x:unitsize*1, y:0},
        {x:unitsize*0, y:0}
    ];
    gamestart();
};
