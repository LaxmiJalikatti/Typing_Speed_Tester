let typingArea = document.getElementById("type");
let timeLeftSpan = document.getElementById("time-left");
let wpmSpan = document.getElementById("wpm");
let mistakeSpan = document.getElementById("mistakes");
let accuracySpan = document.getElementById("accuracy");
let restartBtn = document.getElementById("restart");
let para = document.getElementById("para");
let currentLevelText = document.getElementById("currentLevelText");

let timerStart = false;
let timeleft = 30;
let countdown;
let currentLevel = 1;
let totalTime = 30;

let level1Btn = document.getElementById("level1");
let level2Btn = document.getElementById("level2");
let level3Btn = document.getElementById("level3");
let level4Btn = document.getElementById("level4");

typingArea.addEventListener("input", function(){
    let typedText = typingArea.value;
    let expectedOutput = para.textContent;
    let totalTyped = typedText.length;
    let mistakes = 0;

    for(let i = 0; i < typedText.length; i++){
        if(typedText[i] != expectedOutput[i]){
            mistakes++;
        }
    }

    let accuracy;
    if(totalTyped === 0){
        accuracy = 100;
    } else {
        let correctChar = totalTyped - mistakes;
        accuracy = (correctChar / totalTyped) * 100;
    }

    let elapsedSeconds = totalTime - timeleft;
    let wpm;
    if(elapsedSeconds === 0){
        wpm = 0;
    } else {
        let words = typedText.length / 5;
        let elapsedMinutes = elapsedSeconds / 60;
        wpm = words / elapsedMinutes;
    }

    wpmSpan.textContent = Math.round(wpm);
    accuracySpan.textContent = Math.round(accuracy);
    mistakeSpan.textContent = mistakes;

    if(typedText === expectedOutput){
        clearInterval(countdown);
        typingArea.disabled = true;
        alert(
`Level Completed!

WPM: ${wpmSpan.textContent}
Accuracy: ${accuracySpan.textContent}%
Mistakes: ${mistakeSpan.textContent}`
        );
    }

    if(timerStart === false){
        timerStart = true;

        countdown = setInterval(function(){
            if(timeleft > 0){
                timeleft--;
                timeLeftSpan.textContent = timeleft;
            }
            if(timeleft === 0){
                clearInterval(countdown);
                typingArea.disabled = true;
                alert("⏰ Time's Up!");
            }
        }, 1000);
    }
});

restartBtn.addEventListener("click", function(){
    typingArea.value = "";
    typingArea.disabled = false;
    timeLeftSpan.textContent = totalTime;
    wpmSpan.textContent = 0;
    mistakeSpan.textContent = 0;
    accuracySpan.textContent = 100;
    timerStart = false;
    timeleft = totalTime;
    clearInterval(countdown);
    loadRandomParagraph();
});

let level1Paragraphs = [
    "Practice every day to improve your skills and confidence.",
    "Small efforts repeated daily lead to great achievements.",
    "Learning step by step makes difficult tasks easier.",
    "Consistency is more important than temporary motivation.",
    "Every mistake teaches a lesson and helps you grow."
];

let level2Paragraphs = [
    `Success comes from consistent effort and patience.
Small improvements every day create remarkable results over time.`,
    `Reading books regularly expands knowledge and vocabulary.
A strong reading habit develops better thinking and focus.`,
    `Technology continues to evolve at a rapid pace.
Learning new skills helps people adapt to changing opportunities.`,
    `Good communication builds stronger relationships and teamwork.
Listening carefully is as important as speaking clearly.`,
    `Time management helps people complete important tasks efficiently.
Planning ahead reduces stress and improves productivity.`
];

let level3Paragraphs = [
    `Success is not achieved overnight. It is the result of small actions repeated consistently over a long period of time.
People who stay focused on their goals often achieve more than those who rely only on motivation.
Every challenge provides an opportunity to learn something valuable.
Persistence and patience are essential qualities for long term growth.`,
    `Programming is a skill that improves through practice and experimentation.
Developers solve problems by breaking them into smaller manageable parts.
Writing clean and readable code makes projects easier to maintain.
Every project teaches lessons that improve future development work.`,
    `Education provides knowledge, but learning extends beyond the classroom.
Curiosity encourages people to explore new ideas and perspectives.
Continuous learning helps individuals stay relevant in a changing world.
Knowledge becomes valuable when it is applied to solve real problems.`,
    `Good habits shape the quality of our lives and influence future success.
Simple actions such as exercising, reading, and planning can create lasting benefits.
Building positive routines requires discipline and commitment.
Small daily improvements often lead to significant long term results.`,
    `Teamwork allows individuals to combine their strengths and abilities.
Sharing knowledge and supporting one another improves outcomes.
Respect and communication build trust among team members.
Strong collaboration often produces creative and effective solutions.`
];

let level4Paragraphs = [
    `Technology has transformed the way people learn, work, and communicate across the world.
Access to information is easier than ever before, allowing individuals to develop new skills from almost anywhere.
However, knowledge alone is not enough to achieve meaningful progress in life.
Practical experience, problem solving ability, and consistent effort are equally important.
People who apply what they learn through projects and real world practice gain deeper understanding.
Continuous learning helps individuals remain adaptable in a rapidly changing environment.
Growth becomes possible when curiosity, discipline, and action work together.`,
    `Software development is both a technical and creative process that requires logical thinking and attention to detail.
Developers design solutions that solve real world problems while considering performance and usability.
Writing maintainable code is important because software often evolves over time.
Testing helps identify issues early and improves reliability for users.
Collaboration among team members encourages better decision making and innovation.
Successful projects require planning, communication, and continuous improvement.
Every completed project contributes valuable experience to a developer's journey.`,
    `Time is one of the most valuable resources available to every person.
Unlike money or material possessions, time cannot be recovered once it is spent.
People who manage their time effectively are often able to achieve more with less stress.
Setting priorities helps focus attention on activities that matter most.
Avoiding unnecessary distractions improves concentration and productivity.
Consistent effort applied over months and years creates meaningful progress.
Wise use of time is one of the strongest foundations for long term success.`,
    `Problem solving is a skill that extends far beyond programming and technology.
Every challenge presents an opportunity to analyze situations and discover effective solutions.
Breaking complex problems into smaller components makes them easier to understand and manage.
Critical thinking helps identify patterns and evaluate possible approaches.
Learning from mistakes improves judgment and strengthens decision making abilities.
Persistence often determines whether a difficult problem is eventually solved.
Strong problem solving skills create value in nearly every profession and field.`,
    `Personal growth begins when individuals choose to move beyond their comfort zones and embrace learning opportunities.
Developing new skills requires patience, dedication, and a willingness to make mistakes.
Challenges may seem difficult at first, but they often become stepping stones toward improvement.
Confidence grows through experience and repeated effort rather than perfection.
Seeking feedback helps identify areas that need attention and development.
A positive mindset encourages resilience during periods of difficulty and uncertainty.
Long term success is often the result of continuous learning and consistent action.`
];

let allLevels = [level1Paragraphs, level2Paragraphs, level3Paragraphs, level4Paragraphs];

function loadRandomParagraph(){
    let levelIndex = currentLevel - 1;
    let selectedLevelArray = allLevels[levelIndex];

    let randomIndex = Math.floor(Math.random() * selectedLevelArray.length);
    para.textContent = selectedLevelArray[randomIndex];
}

function updateLevelButtons(){
    level1Btn.classList.remove("active-level");
    level2Btn.classList.remove("active-level");
    level3Btn.classList.remove("active-level");
    level4Btn.classList.remove("active-level");

    if(currentLevel === 1){
        level1Btn.classList.add("active-level");
    } else if(currentLevel === 2){
        level2Btn.classList.add("active-level");
    } else if(currentLevel === 3){
        level3Btn.classList.add("active-level");
    } else {
        level4Btn.classList.add("active-level");
    }

    currentLevelText.textContent = "Current Level: " + currentLevel;
}

function selectLevel(level, time){
    currentLevel = level;
    timeleft = time;
    totalTime = time;
    updateLevelButtons();
    timeLeftSpan.textContent = timeleft;
    wpmSpan.textContent = 0;
    mistakeSpan.textContent = 0;
    accuracySpan.textContent = 100;
    clearInterval(countdown);
    timerStart = false;
    typingArea.disabled = false;
    typingArea.value = "";
    loadRandomParagraph();
}

level1Btn.addEventListener("click", function(){ selectLevel(1, 30); });
level2Btn.addEventListener("click", function(){ selectLevel(2, 45); });
level3Btn.addEventListener("click", function(){ selectLevel(3, 60); });
level4Btn.addEventListener("click", function(){ selectLevel(4, 90); });

updateLevelButtons();
loadRandomParagraph();