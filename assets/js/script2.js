//header
var highScoreLinkEl = $("#highScoreLink");
var secondsLeftEl = $("#secondsLeft");

var highScoreBlock = $("#highScoreBlock");
    var scoreListEl = $("#scoreList");

    var scorePageButtonEl = $("#scorePageButtons");
    //list of high scores
    var highScores =[];


var introBlock = $("#introBlock");
    var introButtonBlock = $("#introButtonBlock");

var questionBlock = $("#questionBlock");
    var questionEl = $("#question");
    var responsesEl = $("#responses");
    var resultEl = $("#result")


var endBlock = $("#endBlock");
    var messageEl = $("#message");
    var scoreEl = $("#score");
    var initialsFormEl = $("#initials-form");


function init(){
    highScoreLinkEl.css("display","block");

    introBlock.css("display","block");
    highScoreBlock.css("display","none");
    endBlock.css("display","none");
    questionBlock.css("display","none");

    introButtonBlock.empty();
    var startButtonEl = $("<button>");
    startButtonEl.text("Start");
    introButtonBlock.append(startButtonEl);
    startButtonEl.on("click",function(){
        introBlock.css("display","none");
        questionBlock.css("display","block");
        initQuiz();
    });
}

//start with introBlock
//add start Button





//init quiz
//questionBlock
//start timer
//load questions

//define questions
function getRandomInt(max){
    return Math.floor(Math.random()* max);
}

//objects of possible questions and their possible answers
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

//define function to init quiz

//var score = 0;
function initQuiz(){
    questionBlock.css("display","block");
    var score = 0;

    var timeLeft = 20;
    var timeInterval = setInterval(function(){
        
        
        timeLeft--;
        secondsLeftEl.text(timeLeft);

        if(timeLeft === 0){
            endPage(score, "time ran out");
            clearInterval(timeInterval);
            secondsLeftEl.text("0");
            
        }
        
    },1000);


    //load questions
    var questionList = [q0,q1,q2];
    function genQuestion(){
        responsesEl.text("");
        questionEl.text("");
        if(questionList.length ===0){
            //console.log("quiz finished");
            //questionEl.textContent ="Quiz finished";
            clearInterval(timeInterval);
            endPage(score, "You're all done");
            //scoreEl.textContent = score;
            //showScore(score,"You're all done");
        }
        else{
            var randomIntQ = getRandomInt(questionList.length);
            var qObj = questionList[randomIntQ];
            questionList.splice(randomIntQ,1);
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

                if(questionList.length > 0){
                    //resultEl = $("<div>");
                    //resultEl.attr("id","result");
                    if(responseObj.correct === true){
                        resultEl.text("Correct");
                        //add one to the score
                        score++;
                    }else{
                        resultEl.text("Wrong");

                        //subtract time if wrong
                        timeLeft -= 3;
                    }
                    //console.log(responseObj);
                    //questionBlockEl.append(resultEl);
                    setTimeout(function(){
                        resultEl.text("");

                        //console.log(questionEl.children());
                        //questionBlockEl.children(resultEl).remove();
                    },1000);
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


//high score page
function saveScore(initials,score){
    var highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
    
    if(highScoreList !== null){
        highScores = highScoreList;
        var scoreItem = {"initials":initials,"score":score};
        highScores.push(scoreItem);
        localStorage.setItem("highScoreList", JSON.stringify(highScores));
    }
    
    else{
        localStorage.setItem("highScoreList", JSON.stringify(highScores));
    }
}
function highScorePage(){
    highScoreLinkEl.css("display","none");

    introBlock.css("display","none");
    endBlock.css("display","none");
    highScoreBlock.css("display","block");
    console.log(highScores);
    
    

    var highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
    if(highScoreList === null){
        localStorage.setItem("highScoreList", JSON.stringify(highScores));
    }else{
        highScores = highScoreList;
    }
    //sort scores
    highScores.sort(function(a,b){return b["score"]-a["score"]});
    

    scoreListEl.empty();
    for(var i=0;i<highScores.length;i++){
        const scoreItem = $("<li>");
        scoreItem.text(`${highScores[i]["initials"]}-${highScores[i]["score"]}`);
        scoreListEl.append(scoreItem);
    }

    scorePageButtonEl.empty();
    const backButtonEl = $("<button>");
    backButtonEl.text("Back");
    const clearButtonEl = $("<button>");
    clearButtonEl.text("Clear Scores");

    backButtonEl.on("click",function(){
        init();
        
    });
    clearButtonEl.on("click", function(){
        highScores = [];
        var highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
        if(highScoreList !== null){
            localStorage.setItem("highScoreList", JSON.stringify(highScores));
        }
        highScorePage();
    }); 
    scorePageButtonEl.append(backButtonEl);
    scorePageButtonEl.append(clearButtonEl);


};
highScoreLinkEl.on("click", function(event){
    event.preventDefault();
    highScorePage();
});



//endBlock

function endPage(score,message){
    endBlock.css("display","block");
    messageEl.text(message);
    scoreEl.text(score);
    var score = score;
    console.log("quiz over");
    questionBlock.css("display","none");


    function handleFormSubmit(event,score){
        var initials = $('input[name="initials-input"]').val();
        if (!initials) {
            console.log('No initials filled out in form!!!');
            return;
        }
        saveScore(initials,score);
        
        var score = score;
        console.log("initials:",initials);
        console.log("score:",score);

        highScorePage();

    };

    initialsFormEl.on("submit", function(event){
        event.preventDefault();
        handleFormSubmit(event,score);
        
    })
}




init();