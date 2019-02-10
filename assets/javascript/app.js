$('#start').on('click', function(){
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function(e){
    game.clicked(e);
})
$(document).on('click', '#reset', function(){
    game.reset();
})

//trivia questions
    var questions = [{

        question: "What is The lead singers name for Metallica?",
        
        answers: ["Kirk Hammet", "Corey Taylor", "James Hetfield", "James Hetfield"],
        correctAnswer: "James Hetfield"
    }, {
        question: "How many members does Slipknot have?",

        answers: ["4", "9", "7", "8"],
        correctAnswer: "9"
    }, {
        question: "Jim Morrison is from what band ?",

        answers: ["Black Sabbath", "Pink Floyd", "The Bettles", "The Doors"],
        correctAnswer: "The Doors"
    }, {
        question: "Whos is known for biting a bat on stage ?",

        answers: ["Jimmy Page", "Ozzy Osborne", "Bruce Dickinson", "Brian Johnson"],
        correctAnswer: "Ozzy Osborne"
    }, {
        question: "Dimebag Darrel played what instrument in Pantera?",

        answers: ["Drums", "Bass", "guitar", "piano"],
        correctAnswer: "Guitar"
    }, {
        question: "What bad has a mascot named Eddie?",

        answers: ["Iron Maiden", "AC/DC", "Led Zeppelin", "Testament"],
        correctAnswer: "Iron Maiden"
    
}];


var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 10,
    correct: 0,
    incorrect: 0,
    

//time, questions flow, results

    countDown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countDown,1000);
        $('#subwrapper').html("<p>Hurry: <span id='counter'>10</span> Seconds </p>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');

        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 10;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
        
    },
    timeUp: function(){
        clearInterval(timer);
        $('#subwrapper').html('<h2>Out of Time!</h2>');
       
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,1*1000);
        } else {
            setTimeout(game.nextQuestion,1*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>Time is Up!!!</h2>");
        $('#subwrapper').append("<h3>Answers Correct: "+game.correct+ "</h3>");
        $('#subwrapper').append("<h3>Answers Incorrect: "+game.incorrect+ "</h3>");
        $('#subwrapper').append("<button id='reset'>Want to give it another shot?</button>");
   
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")===questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
            }
    },

    answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YES YOU ROCK!</h2>');
        
    
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,1*1000);
        } else {
            setTimeout(game.nextQuestion,1*1000);
        }
    },
    answeredIncorrectly: function(){
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>WRONG!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
       
    
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,1*1000);
        } else {
            setTimeout(game.nextQuestion,1*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 10;
        game.correct = 0;
        game.incorrect = 0;
        game.loadQuestion();
    }

}
