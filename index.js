// variables and arrays
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

//Function to give random color to game-pattern array
function nextSequence(){

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
}

//to check if at starting a key is pressed or not
$(document).keydown(function(){
    if(started===false)
    {
        started=true;
        nextSequence();
        $("h1").text("Level "+level); 
    }
});

// to detect which button is clicked
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
   });

//to play the sound when a button is pressed or is randomly chosen
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

// to create blinking animation when a button is pressed
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(removeAnimation,100);
    function removeAnimation(){
        $("#"+currentColour).removeClass("pressed");
    }
}

// to check if the button pressed is the button that was chosen randomly
function checkAnswer(currentLevel){

   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
         if(userClickedPattern.length===gamePattern.length){
            userClickedPattern=[];
            setTimeout(nextSequence,1000);
            $("h1").text("Level "+level);
        }
    }
    
    else{
       
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
       
        $("body").addClass("game-over");
        setTimeout(removeAnimation,200);
        function removeAnimation(){
            $("body").removeClass("game-over");
        }
        
        $("h1").text("Game Over, Press any key to Restart");
        startOver();
    }
    
  }

// to reset the variables to its initial value
function startOver(){
       userClickedPattern=[];
        gamePattern=[];
        started=false;
        level=0;
}