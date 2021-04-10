var responsesEl = $("#responses");
var questionEl = $("#question");
var timerEl = $("#timer");
var scoreEl = $("#score");
console.log(scoreEl);
var scoreBlockEl = $("#scoreBlock");
var mainEl = $("main");

var introEl = $("#introduction");

var questionBlockEl = $("#questionBlock");

var highScoreLinkEl = $("#highScoreLink");


var resultEl = $("#result");
var highScoreBlock =$("#highScoreBlock");



var startButton = $("<button>");
startButton.text("start");


highScoreLinkEl.on("click", function(event){
    event.preventDefault();
    //questionEl.text("High Scores");
    highScoreBlock.css("display","block");
    introEl.css("display","none");
    scoreEl.css("display","none");
    startButton.css("display","none");
});


startButton.on("click", function(){
    console.log("button clicked");
    startButton.css("display","none");
    //countdown();
    introEl.text("");

    init();
});
$("#startButton").append(startButton);


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
function showScore(score,message){
    resultEl.text("");
    
    scoreBlockEl.attr("display","block");
    introEl.text(message);
    scoreEl.text(score);
    //make go back button

}
function init(){

    var score = 0;

    var timeLeft = 10;
    var timeInterval = setInterval(function(){
        
        
        timeLeft--;
        timerEl.text(timeLeft);

        if(timeLeft === 0){

            clearInterval(timeInterval);
            timerEl.text("0");
            responsesEl.text("");
            questionEl.text("");
            //questionEl.textContent ="Ran Out of Time";
            //scoreEl.textContent = score;
            showScore(score,"Ran out of time");
        }
        
    },1000);






    var questions = [q0,q1,q2];
    function genQuestion(){
        responsesEl.text("");
        questionEl.text("");
        if(questions.length ===0){
            console.log("quiz finished");
            //questionEl.textContent ="Quiz finished";
            clearInterval(timeInterval);
            //scoreEl.textContent = score;
            showScore(score,"You're all done");
        }
        else{
            var randomIntQ = getRandomInt(questions.length);
            var qObj = questions[randomIntQ];
            questions.splice(randomIntQ,1);
            questionEl.text(qObj["question"]);
            var responses = qObj.responseLst;
        
            
            
            //console.log(responses);
            //console.log(responses);
            for(var i=0;i<4;i++){
            const responseEl = $("<li>");
            

            var index = getRandomInt(responses.length);
            responseEl.text(responses[index].response);

            const responseObj = responses[index];
            responseEl.on("click",function(){
                //console.log(responseEl.textContent);

                if(questions.length > 0){
                    //resultEl = $("<div>");
                    //resultEl.attr("id","result");
                    if(responseObj.correct === true){
                        resultEl.text("Correct");
                        //add one to the score
                        score++;
                    }else{
                        resultEl.text("Wrong");
                    }
                    //console.log(responseObj);
                    //questionBlockEl.append(resultEl);
                    setTimeout(function(){
                        resultEl.text("");

                        //console.log(questionEl.children());
                        //questionBlockEl.children(resultEl).remove();
                    },1500);
                }
                
                genQuestion();
            });

            responses.splice(index,1);
            responsesEl.append(responseEl);
            }
        }
    }
    genQuestion();
}

