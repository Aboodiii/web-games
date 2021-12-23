

const question=document.querySelector('#question'); // QS targets both class and id
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progressText');
const scoreText=document.querySelector('#score');
const progressBarFull=document.querySelector('#progressBarFull');
const playAgain=document.querySelector('.playAgain')
const timer=document.getElementById("timer");
let currentQuestion={}   // Empty Object
let acceptingAnswers=true;
let score=0
let questionCounter=0
let availableQuestions=[]

let questions=[
    {
        question: 'Who hosted the 2010 FIFA WORLD CUP?',
        choice1: 'USA',
        choice2: 'Paris',
        choice3: 'South Africa',
        choice4: 'London',
        answer: 3,
    },
    {
        question: "People who think Mohammed Salah is better than Enden Hazard are what?",
        choice1: "Psychopaths",
        choice2: "Hopeless Virgins",
        choice3: "Blinded Liverpool Fans",
        choice4: "All",
        answer: 4,
    },
    {
        question: "Which football club in England has gone trphyless for 4 years now?",
        choice1: "Arsenal FC",
        choice2: "Manchester United",
        choice3: "Manchester City",
        choice4: "Liverpool",
        answer: 2,
    },
    {
        question: " \" AGUEROOOOOO... I swear,  you'll never see anything like this ever again!\" Whose commentary is this?  ",
        choice1: "Peter Drury",
        choice2: "Mesele Mengistu",
        choice3: "Martin Taylor",
        choice4: "Jim Beglin",
        answer: 3,
    },

    {
        question: 'Which player is commonly known as "Mr.Champions League" ?',
        choice1: 'Lionel Messi',
        choice2: 'P.E.Aubameyang',
        choice3: 'The Suiiii Merchant',
        choice4: 'Lingard',
        answer: 3,
    },
    {
        question:
            "With 260 goals, who is the Premier League's all-time top scorer?",
        choice1: "Wayne Rooney",
        choice2: "Didier Drogba",
        choice3: "Alan Shearer",
        choice4: "Gareth Bale",
        answer: 3,
    },
    {
        question: "Which country won the first ever World Cup in 1930?",
        choice1: "Ethiopia",
        choice2: "Brazil",
        choice3: "Uruguay",
        choice4: "England",
        answer: 3,
    },
    {
        question: "The fastest goal scored in Premier League history came in 7.69 seconds. Who scored it?",
        choice1: "Alan Shearer",
        choice2: "Mohamed Salah",
        choice3: "Shane Long",
        choice4: "Patrick Vieira",
        answer: 3,
    },
    {
        question: "Who is the GOAT of Football?",
        choice1: "Abebaw Butako",
        choice2: "Cristiano Ronaldo",
        choice3: "Lionel Messi",
        choice4: "Wilfred Bonny",
        answer: 1,
    },
    {
        question: "Which country has won the most World Cups?",
        choice1: "Ethiopia",
        choice2: "Brazil",
        choice3: "Uruguay",
        choice4: "England",
        answer: 2,
    }
]

const SCORE_POINTS=10
const MAX_QUESTIONS=10


startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions] // ... is spread operator which will target all values in particular array(variable).
getNewQuestion()
}

getNewQuestion=()=>{ //Arrow Function
    if(availableQuestions.length ===0 || questionCounter>MAX_QUESTIONS )  // strict equality operator ( === ) checks whether its two operands are equal, returning a Boolean result. 
    {
localStorage.setItem('mostRecentScore',score)
return window.location.assign('end.html')
    }
    questionCounter++;
    progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}` // 1/10
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*10}%`

    //random question number generator
const questionIndex= Math.floor(Math.random()*availableQuestions.length) //to calculate the value of question index
currentQuestion=availableQuestions[questionIndex]
question.innerText=currentQuestion.question;

choices.forEach(choice=>{
    const number=choice.dataset['number']
    choice.innerText=currentQuestion['choice' +number]
})
    
availableQuestions.splice(questionIndex,1)// splice Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
acceptingAnswers=true;

}

choices.forEach(choice =>{
    choice.addEventListener('click', e=>{
        if(!acceptingAnswers) return

        acceptingAnswers=false;
        const selectedChoice=e.target
        const selectedAnswer=selectedChoice.dataset['number']

        let classToApply=selectedAnswer==currentQuestion.answer? 'correct': 'incorrect'

        if (classToApply==='correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },100)


    })
})


// Set the date we're counting down to
var countDownDate = new Date(" dec 22, 2021 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  

  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML =  seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
 



  
cuteAlert({
    type: "question",
    title: "TIME IS UP",
    message: "PLAY AGAIN?",
    confirmText: "Okay",
    cancelText: "Naah"
  }).then((e)=>{
    if ( e == (window.location.assign('end.html'))){
        
  } 
  else {
    window.location.assign('UFQ.html')
    }
  })
  } 


}, 3000);




incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

