let isStarted = false;
let isPlayer = true;
let block = $(".single");
block.text("");
let display = $("#infodisplay");
let playercode = "";
let player = ""
display.text("Choose Your Letter");
$("#chooseX").click(function () {
  playercode = "X";
  player = "X"
  $(".playerchoice").addClass("hidden");
  $(".game-grid").removeClass("hidden");
  display.text("");
  isStarted = true;
});
$("#chooseO").click(function () {
  playercode = "O";
  player = "O"
  $(".playerchoice").addClass("hidden");
  $(".game-grid").removeClass("hidden");
  display.text("");
  isStarted = true;
});
let gamespace = [
  $("#11"),
  $("#12"),
  $("#13"),
  $("#21"),
  $("#22"),
  $("#23"),
  $("#31"),
  $("#32"),
  $("#33"),
];
function toggleplayer() {
  if (playercode == "X") {
    playercode = "O";
  } else if (playercode == "O") {
    playercode = "X";
  }
  if (isPlayer == true) {
    isPlayer = false;
  } else if (isPlayer == false) {
    isPlayer = true;
  }
}
function checkwin() {
  const currentDate = new Date
  if (
    (gamespace[0].text() == "X" &&
      gamespace[1].text() == "X" &&
      gamespace[2].text() == "X") ||
    (gamespace[3].text() == "X" &&
      gamespace[4].text() == "X" &&
      gamespace[5].text() == "X") ||
    (gamespace[6].text() == "X" &&
      gamespace[7].text() == "X" &&
      gamespace[8].text() == "X") ||
    (gamespace[0].text() == "X" &&
      gamespace[3].text() == "X" &&
      gamespace[6].text() == "X") ||
    (gamespace[1].text() == "X" &&
      gamespace[4].text() == "X" &&
      gamespace[7].text() == "X") ||
    (gamespace[2].text() == "X" &&
      gamespace[5].text() == "X" &&
      gamespace[8].text() == "X") ||
    (gamespace[0].text() == "X" &&
      gamespace[4].text() == "X" &&
      gamespace[8].text() == "X") ||
    (gamespace[2].text() == "X" &&
      gamespace[4].text() == "X" &&
      gamespace[6].text() == "X")
  ) {
    isPlayer = true;
    isStarted = false;
    display.text("X wins!");
    if(player === "X"){
      const data = JSON.parse(localStorage.getItem("gamesHistory")) || [];
      data.push({
        state: "win",
        date: formatDate(currentDate)
      })
      localStorage.setItem("gamesHistory", JSON.stringify(data))
    }else{
      const data = JSON.parse(localStorage.getItem("gamesHistory")) || [];
      data.push({
        state: "lose",
        date: formatDate(currentDate)
      })
      localStorage.setItem("gamesHistory", JSON.stringify(data))
    }
    $(".playagain").removeClass("hidden");
  } else if (
    (gamespace[0].text() == "O" &&
      gamespace[1].text() == "O" &&
      gamespace[2].text() == "O") ||
    (gamespace[3].text() == "O" &&
      gamespace[4].text() == "O" &&
      gamespace[5].text() == "O") ||
    (gamespace[6].text() == "O" &&
      gamespace[7].text() == "O" &&
      gamespace[8].text() == "O") ||
    (gamespace[0].text() == "O" &&
      gamespace[3].text() == "O" &&
      gamespace[6].text() == "O") ||
    (gamespace[1].text() == "O" &&
      gamespace[4].text() == "O" &&
      gamespace[7].text() == "O") ||
    (gamespace[2].text() == "O" &&
      gamespace[5].text() == "O" &&
      gamespace[8].text() == "O") ||
    (gamespace[0].text() == "O" &&
      gamespace[4].text() == "O" &&
      gamespace[8].text() == "O") ||
    (gamespace[2].text() == "O" &&
      gamespace[4].text() == "O" &&
      gamespace[6].text() == "O")
  ) {
    isPlayer = true;
    isStarted = false;
    display.text("O wins!");
    if(player === "O"){
      const data = JSON.parse(localStorage.getItem("gamesHistory")) || [];
      data.push({
        state: "win",
        date: formatDate(currentDate)
      })
      localStorage.setItem("gamesHistory", JSON.stringify(data))
    }else{
      const data = JSON.parse(localStorage.getItem("gamesHistory")) || [];
      data.push({
        state: "lose",
        date: formatDate(currentDate)
      })
      localStorage.setItem("gamesHistory", JSON.stringify(data))
    }
    $(".playagain").removeClass("hidden");
  } else if (
    gamespace[0].text() != "" &&
    gamespace[1].text() != "" &&
    gamespace[2].text() != "" &&
    gamespace[3].text() != "" &&
    gamespace[4].text() != "" &&
    gamespace[5].text() != "" &&
    gamespace[6].text() != "" &&
    gamespace[7].text() != "" &&
    gamespace[8].text() != ""
  ) {
    isPlayer = true;
    isStarted = false;
    display.text("Draw!");
    const data = JSON.parse(localStorage.getItem("gamesHistory")) || [];
      data.push({
        state: "draw",
        date: formatDate(currentDate)
      })
      localStorage.setItem("gamesHistory", JSON.stringify(data))
    $(".playagain").removeClass("hidden");
  }
}
let cpuChoice;
function cpuMakingChoice() {
  cpuChoice = Math.floor(Math.random() * 9);
  if (gamespace[cpuChoice].text() == "") {
    gamespace[cpuChoice].text(playercode);
    toggleplayer();
    checkwin();
  }
}
let cpuTurn = window.setInterval(function () {
  if (isPlayer == false) {
    cpuMakingChoice();
  }
}, 500);
block.click(function () {
  if ($(this).text() == "" && isPlayer && isStarted) {
    $(this).text(playercode);
    toggleplayer();
    checkwin();
  }
});
function resetEverything() {
  playercode = "";
  block.text("");
  display.text("Choose Your Letter");
  $(".playerchoice").removeClass("hidden");
  $(".playagain").addClass("hidden");
  $(".game-grid").addClass("hidden");
  isStarted = false;
}
$("#playagainyes").click(function () {
  console.log("Resetting variables and restarting the game.");
  resetEverything();
});


function formatDate(givenDate) {
  const yyyy = givenDate.getFullYear()
  let mm = givenDate.getMonth() + 1
  let dd = givenDate.getDate()
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  let seconds = givenDate.getSeconds()
  if (seconds < 10) seconds = '0' + seconds
  let minutes = givenDate.getMinutes()
  if (minutes < 10) minutes = '0' + minutes
  let hours = givenDate.getHours()
  let amOrPm
  if (hours >= 12) {
      hours -= 12
      amOrPm = "PM"
  }else{
      amOrPm = "AM"
  }
  if (hours < 10) hours = '0' + hours
  const formattedDate = `${hours}:${minutes}:${seconds}${amOrPm}, ${dd}/${mm}/${yyyy}`

  return formattedDate
}