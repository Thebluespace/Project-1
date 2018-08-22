var gameo = {
    questions: {
        questionOne: ["What is the Gravity on Mars?", "9.807 m/s&#178", "3.711 m/s&#178","24.79 m/s&#178","1.62 m/s&#178", 2],
        questionTwo: ["How cold is space?", "12&deg; Fahrenheit", "12&deg; Celsius","2.7&deg; Kelvin","2.7&deg; Fahrenheit", 3],
        questionThree: ["How many hours of pilot-in-command experience on a jetcraft are needed?", "1,000 Hours", "1,500 Hours","800 Hours","5 Hours", 1],
        questionFour: ["What minimum visual acutity is required to pass the eye test?","15/20","20/10","20/20","25/25", 3],
        questionFive: ["How long could you survive in open space if you were holding a oxygen producing plant?" ,"6 Minutes", "45 Minutes", "15 Minutes","Oh he ded",4],
    },
    currentUser: "",
    currentAnswer: 0,
    currentAnswerText: "",
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    gameState: false,
    currentInterval: "",
    currentTimer: "",
    currentTime: 0,

    makeGuess: function(event) {
        try {
            if (gameo.currentTime > 0) {
                if (gameo.currentAnswer == $(event.target).attr("data-number")){
                    clearInterval(gameo.currentInterval);
                    gameo.correctAnswers++;
                    gameo.gifevent("correct");
                    setTimeout(gameo.nextQuestion,3500);
                } else {
                    clearInterval(gameo.currentInterval);
                    gameo.wrongAnswers++;
                    gameo.gifevent("wrong");
                    setTimeout(gameo.nextQuestion,3500);
                }
            }
        } catch(error){
            console.error(error);
        }
    },
    formReset: function(){
        try {
            $(document).off("click");
            //reset variables
            gameo.currentUser = sessionStorage.getItem("username");
            if (gameo.currentUser == "" || gameo.currentUser == null){
                gameo.forceLogin();
                return;
            }
            gameo.currentAnswer = 0;
            gameo.gameState = false;
            gameo.currentInterval = "";
            gameo.currentTimer = "";

            $(".gamecontainer").empty();
            var form = $("<div>");
            form.attr("id","gamecard");
            $(form).append($("<br>"),$("<br>"));
            var qheader = $("<h1>");
            qheader.text("Welcome to Mars Exploration Assessment!");
            $(form).append(qheader);
            $(form).append($("<br>"));

            var grules = $("<p>");
            grules.text("This is a short assessment to test your readiness for space. Each question has a 30 second timer, click on an answer within the time limit to continue.");
            $(form).append(grules);
            $(form).append($("<br>"));
            var gruless = $("<p>");
            gruless.text("Whenever you're ready, click the start button");
            $(form).append(gruless);
            $(form).append($("<br>"));
            $(form).append($("<br>"));

            var sbutton = $("<button>");
            sbutton.text("Start Assessment");
            sbutton.attr("type", "button");
            sbutton.attr("id","startbutton");
            $(form).append(sbutton);

            $(".gamecontainer").append(form);
            sbutton.on("click", gameo.startGamme);
        } catch (error) {
            console.error(error);
        }
    },
    nextQuestion: function(){

        try {
            gameo.currentQuestion++;
            var currentQuestions = [];
            var qheader = $("<h1>");
            qheader.attr("id","qheader")
            switch (gameo.currentQuestion) {
                case 2:
                    currentQuestions = gameo.questions.questionTwo;
                    qheader.text("Second Question!");
                break;
                case 3:
                    currentQuestions = gameo.questions.questionThree;
                    qheader.text("Third Question!");
                break;
                case 4:
                    currentQuestions = gameo.questions.questionFour;
                    qheader.text("Fourth Question!");
                break;
                case 5:
                    currentQuestions = gameo.questions.questionFive;
                    qheader.text("Last Question!");
                break;
                default:
                    gameo.endGame();
                return;
            }
            
            gameo.currentAnswer = currentQuestions[5];
            gameo.currentAnswerText = currentQuestions[gameo.currentAnswer];
            var timer = $("<h1>");
            timer.attr("id","timer")
            timer.text("30");

            var qheader2 = $("<h2>");
            qheader2.attr("id","question")
            qheader2.text(currentQuestions[0]);

            $("#gamecard").empty();
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(qheader);
            $("#gamecard").append(qheader2);
            $("#gamecard").append($("<br>"));
            for (i = 1; i < 5; i++) {
                var answer = $("<h3>");
                answer.attr("id", "answer")
                answer.attr("data-number", i);
                answer.html(currentQuestions[i]);

                $("#gamecard").append(answer);
                $("#gamecard").append($("<br>"));
                answer.on("click", gameo.makeGuess);
            }
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(timer);
            gameo.currentTime = 30;
            gameo.currentInterval = setInterval(gameo.timer,1000);
        } catch (error) {
            console.error(error);
            gameo.gameState = false;
        }
        

    },
    endGame: function(){
            clearInterval(gameo.currentInterval);
            gameo.gifevent("gameover");
    },
    gifevent: function(type) {
        switch(type) {
            case "correct":
                var header = $("<h1>");
                header.text("Correct!");
                header.attr("id","qheader2");
                $("#gamecard").empty();
                $("#gamecard").append(header);
            break;
            case "wrong":
                var header = $("<h1>");
                header.html("Wrong! The correct answer was: \n" + gameo.currentAnswerText);
                header.attr("id","qheader2");
                $("#gamecard").empty();
                $("#gamecard").append(header);
            break;

            case "timer":
                var header = $("<h1>");
                header.text("Times Up!");
                header.attr("id","qheader2");
                $("#gamecard").empty();
                $("#gamecard").append(header);
            break;

            case "gameover":
                var header = $("<h1>");
                header.attr("id","qheader");
                header.text("Here are your results:");
                var guesses1 = $("<h2>");
                guesses1.attr("id","qheader2");
                guesses1.text("Correct Answers: " + gameo.correctAnswers);
                var guesses2 = $("<h2>");
                guesses2.attr("id","qheader2");
                guesses2.text("Wrong Answers: " + gameo.wrongAnswers);

                var sbutton = $("<button>");
                sbutton.text("Sign Up");
                sbutton.attr("type", "button");
                sbutton.attr("id","startbutton");

                $("#gamecard").empty();
                $("#gamecard").append($("<br>"));
                $("#gamecard").append(header);
                $("#gamecard").append($("<br>"));
                $("#gamecard").append(guesses1);
                $("#gamecard").append($("<br>"));
                $("#gamecard").append(guesses2);
                $("#gamecard").append($("<br>"));
                if (gameo.correctAnswers > 2){
                    var signup = $("<h1>");
                    signup.html("You qualify for our space program! \n You can sign up by clicking below!");
                    $("#gamecard").append(signup,sbutton);
                    sbutton.on("click", gameo.signUp);
                } else {
                    var signup = $("<h1>");
                    signup.text("Sorry, you do not meet the mimnum requirements for the space program. Keep trying!");
                    sbutton.text("Try Again");
                    $("#gamecard").append(signup,sbutton);
                    sbutton.on("click", gameo.startGamme);
                }
                gameo.uploadResults();
            break;
        }
    },
    startGamme: function(event){
        try {
            gameo.currentAnswer = 0;
            gameo.correctAnswers = 0;
            gameo.currentQuestion = 0;
            gameo.wrongAnswers = 0;
            gameo.gameState = false;
            gameo.currentInterval = "";
            gameo.currentTimer = "";
            gameo.gameState = true;
            gameo.currentAnswer = gameo.questions.questionOne[5];
            gameo.currentAnswerText = gameo.questions.questionOne[2];
            gameo.currentQuestion++;
            var qheader = $("<h1>");
            qheader.attr("id","qheader")
            qheader.text("First Question!");

            var timer = $("<h1>");
            timer.attr("id","timer")
            timer.text("30");

            var qheader2 = $("<h2>");
            qheader2.attr("id","question")
            qheader2.text(gameo.questions.questionOne[0]);

            $("#gamecard").empty();
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(qheader);
            $("#gamecard").append(qheader2);
            $("#gamecard").append($("<br>"));
            for (i = 1; i < gameo.questions.questionOne.length - 1; i++) {
                var answer = $("<h3>");
                answer.attr("id", "answer")
                answer.attr("data-number", i);
                answer.html(gameo.questions.questionOne[i]);

                $("#gamecard").append(answer);
                $("#gamecard").append($("<br>"));
                answer.on("click", gameo.makeGuess);
            }
            $("#gamecard").append($("<br>"));
            $("#gamecard").append(timer);
            gameo.currentTime = 30;
            gameo.currentInterval = setInterval(gameo.timer,1000);
        } catch (error) {
            console.error(error);
            gameo.gameState = false;
        }
    },
    uploadResults: function(){
            try {
                var results = {
                    correct: gameo.correctAnswers,
                    wrong: gameo.wrongAnswers
                };
                database.ref("dbo_users_table/users/" + gameo.currentUser).update({results});
            } catch (error) {
                console.error(error);
            }
    },
    timer: function(){
        gameo.currentTime--;
        $("#timer").text(gameo.currentTime);
        if (gameo.currentTime === 0){
            clearInterval(gameo.currentInterval);
            gameo.gifevent("timer");
        }
    },
    forceLogin: function() {
        var form = $("<h1>");
        form.text("User is not logged in! Redirecting to landing page...");
        $(".gamecontainer").append(form);
        setTimeout(function(){
            window.location.href = "index.html";
        },1500);
    },
    signUp: function(){
        var adduserform = $("<form>")
        var label4 = $("<label>").text("Please Enter Your Full Name");
        var userRealName = $("<input>").addClass("realname").attr("type", "text");
        var label5 = $("<label>").text("Please enter an email");
        var userEmail = $("<input>").addClass("userEmail").attr("type", "text");
        var label6 = $("<label>").text("Explain Why You'd Like To Go To Mars");
        var marsExplanation = $("<textarea>").addClass("marsInput").attr("type", "text");
        var label7 = $("<label>").text("Please Elaborate On Your Skill Set And Experience");
        var skillSet = $("<textarea>").addClass("skillSet").attr("type", "text");
        var submit3 = $("<button>");
        submit3.text("submit");
        submit3.attr("type", "button");
        submit3.addClass("submit3button");
        submit3.on("click",gameo.userSignUp);
        adduserform.append(label4, $("<br>"), userRealName, $("<br>"), label5, $("<br>"), userEmail, $("<br>"), label6, $("<br>"), marsExplanation, $("<br>"), label7, $("<br>"), skillSet, $("<br>"), submit3);
        $("#gamecard").empty();
        $("#gamecard").append(adduserform);
    },
    userSignUp: function(event){
        var userUser = sessionStorage.getItem("username");
        var dataset = {
            name: $(".realname").val(),
            email: $(".userEmail").val(),
            marsExplanation: $(".marsInput").val(),
            skillSet: $(".skillSet").val(),
        }
        try {
            $(".submit3button").remove();
            database.ref("app/" + userUser).update({dataset});
            var h1 = $("<label>");
            h1.text("Application submitted!");
            $("#gamecard").append(h1);
            setTimeout(function(){
                window.location.href = "index.html";
            },3500);
        } catch (error) {
            console.error(error);
        }
    }
}