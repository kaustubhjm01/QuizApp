const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
// const time_off = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// If start quiz Button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

// If Exit button is clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(0);
    startTimer(15);
    startTimerLine(0);
}
let que_count = 0;
let que_numb = 0;
let counter;
let timevalue = 15;
let widthvalue = 0;
let userscore = 0;
const next_btn = quiz_box.querySelector(".next_btn");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
quit_quiz.onclick = () => {
    window.location.reload();
}

next_btn.onclick = () => {
    que_count++;
    que_numb++;
    timeText.textContent = "Time Left";

    if (que_count < questions.length) {
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timevalue);
        clearInterval(counterLine);
        startTimerLine(widthvalue);
        next_btn.style.display = "none";

    }
    else {
        console.log("completed");
        showResultBox();
    }
    // showQuestions(que_count);
}

// getting questions and options
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeText.textContent = "Time Left";

    que_count = 0;
    que_numb = 0;
    // counter;
    timevalue = 15;
    widthvalue = 0;
    userscore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timevalue);
    clearInterval(counterLine);
    startTimerLine(widthvalue);
    next_btn.style.display = "none";
}
let tickicon = '<div class="icon tick"> <i class="fas fa-check"></i></div>'
let crossicon = '<div class="icon cross"> <i class="fas fa-times"></i></div>'
const score_text = result_box.querySelector(".score_text");
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    // const option_list = document.querySelector(".option_list");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[3] + '<span></span></div>';

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + (index + 1) + '</p> of <p>' + questions.length + '</p> Questions </span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    next_btn.style.display = "block";
    let user_ans = answer.textContent;
    let correct_ans = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if (user_ans == correct_ans) {
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickicon);
        userscore++;
        // console.log(user_ans);
    }
    else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossicon);

        // if answers are incorrect then  we will automatically select the right answer
        let correct_ans = questions[que_count].answer;
        let alloptions = option_list.children.length;
        for (let i = 0; i < alloptions; i++) {
            if (option_list.children[i].textContent == correct_ans) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
            }

        }
    }
    // once user selected disabled all the options 
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

}
function startTimer(time) {

    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        if (time <= 9) {
            timeCount.textContent = "0" + timeCount.textContent;
        }
        if (time == 0) {
            clearInterval(counter);
            timeText.textContent = "Time Over";
            let correct_ans = questions[que_count].answer;
            let alloptions = option_list.children.length;
            for (let i = 0; i < alloptions; i++) {
                if (option_list.children[i].textContent == correct_ans) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
                }

            }
            for (let i = 0; i < alloptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";

            // timeCount.textContent = "00";
        }
        time--;
    }
}
function startTimerLine(time) {

    counterLine = setInterval(timer, 23);
    function timer() {
        time++;
        if (time > 660) {
            clearInterval(counterLine);
        }
        else {
            time_line.style.width = time + "px";
        }
    }
}

function showResultBox() {
    quiz_box.classList.remove("activeQuiz");
    info_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    let scoreTag;
    if (userscore >= 4) {
        scoreTag = '<span>and Congratulations, You got <p>' + userscore + '</p> out of <p>' + questions.length + '</p></span>';
    }
    else if (userscore >= 1) {
        scoreTag = '<span>and Good, You got  <p>' + userscore + '</p> out of <p>' + questions.length + '</p></span>';
    }
    else if (userscore == 0) {
        scoreTag = '<span>and  You got  <p>' + userscore + '</p> out of <p>' + questions.length + '</p>Please Try Again</span>';
    }
    score_text.innerHTML = scoreTag;
}
