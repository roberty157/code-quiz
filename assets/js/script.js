var responsesEl = document.querySelector("#responses");
var questionEl = document.querySelector("#question");
var timerEl = document.querySelector("#timer");
var scoreEl = document.querySelector("#score");
var mainEl = document.querySelector("main");

var result = document.querySelector("#result");
var startButton = document.createElement("button");
startButton.textContent = "start";
startButton.addEventListener("click", function(){
    
    startButton.style.display="none";
    //countdown();


    init();
});
document.querySelector("#startButton").appendChild(startButton);


//generate random int between 0 and max, less than but not equal to max
function getRandomInt(max){
    return Math.floor(Math.random()* max);
}

//object of possible questions and their possible answers
var q0 = {
    question:"Commonly used Data Types DO NOT include: ",
    //correct: "alerts",
    //incorrect: ["strings","booleans","numbers"],

    responseLst:[
        {"response":"alerts",correct:true},
        {"response":"strings",correct:false},
        {"response":"booleans",correct:false},
        {"response":"numbers",correct:false}
    ]
}
var q1 ={
    question:"The conditional if/else statements are enclosed in:",
    //correct: "curly brackes",
    //incorrect: ["square brackets", "parentheses","quotation marks"],


    responseLst:[
        {"response":"curly braces", correct:true},
        {"response":"square brackets",correct:false},
        {"response":"parentheses", correct:false},
        {"response":"quotation marks", correct:false}
    ]
}
var q2 ={
    question:"String values must be enclosed within _____ when defining variables",
    //correct: "quotation marks",
    //incorrect: ["square brackets", "curly braces", "backticks"],

    responseLst:[
        {"response":"quotation marks",correct:true},
        {"response":"square brackets", correct:false},
        {"response":"curly braces", correct:false},
        {"response":"backticks", correct:false}
    ]
}


//


/*
function countdown(){
    var timeLeft = 5;
    var timeInterval = setInterval(function(){
        timerEl.textContent = timeLeft;
        
        if(timeLeft === 0){
            clearInterval(timeInterval);
            responsesEl.textContent = "";
            questionEl.textContent="";
            questionEl.textContent ="Ran Out of Time";
        }
        timeLeft--;
    },1000);
}
*/

function init(){

    var score = 0;

    var timeLeft = 5;
    var timeInterval = setInterval(function(){
        timerEl.textContent = timeLeft;
        
        if(timeLeft === 0){
            clearInterval(timeInterval);
            timerEl = "";
            responsesEl.textContent = "";
            questionEl.textContent="";
            questionEl.textContent ="Ran Out of Time";
            scoreEl.textContent = score;
        }
        timeLeft--;
    },1000);






    var questions = [q0,q1,q2];
    function genQuestion(){
        responsesEl.textContent = "";
        questionEl.textContent="";
        if(questions.length ===0){
            console.log("quiz finished");
            questionEl.textContent ="Quiz finished";
            clearInterval(timeInterval);
            scoreEl.textContent = score;
        }
        else{
            var randomIntQ = getRandomInt(questions.length);
            var qObj = questions[randomIntQ];
            questions.splice(randomIntQ,1);
            questionEl.textContent = qObj["question"];
            var responses = qObj.responseLst;
        
            
            
            //console.log(responses);
            //console.log(responses);
            for(var i=0;i<4;i++){
            const responseEl = document.createElement("li");
            

            var index = getRandomInt(responses.length);
            responseEl.textContent = responses[index].response;

            const responseObj = responses[index];
            responseEl.addEventListener("click",function(){
                //console.log(responseEl.textContent);

                if(questions.length > 0){
                    const resultEl = document.createElement("div");
                    resultEl.id="result";
                    if(responseObj.correct === true){
                        resultEl.textContent = "Correct";
                        //add one to the score
                        score++;
                    }else{
                        resultEl.textContent = "Wrong";
                    }
                    //console.log(responseObj);
                    mainEl.appendChild(resultEl);
                    setTimeout(function(){
                        mainEl.removeChild(resultEl);
                    },2400);
                }
                
                genQuestion();
            });

            responses.splice(index,1);
            responsesEl.appendChild(responseEl);
            }
        }
    }
    genQuestion();
}
