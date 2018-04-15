$(document).ready(function() {
  //Input team names here
  var teamNames = ["Team Açia", "42", "Minecraft PVP math mod", "Turkish Ice Cream", "DO", "The Legendary Liver Scammers", "Talbot's Timbits", "Da Daring Dragons", "hen", "Sources of Error", "Lethargic Walnuts", "LeMao"];

  //For each team, set up a button, progress bar and time adder thing
  for (var i = 0; i < teamNames.length; i++) {
    contents.innerHTML += "<div class = 'box'><div class='button name'>" + teamNames[i] + "</div><div class='bar'><div class='progress'></div></div><div class = 'other'><div class = 'button penalty'>00:00</div></div></div>";
    if (teamNames[i].length > 17) {
      document.getElementsByClassName("name")[i].style.fontSize = "2.4vh";
      document.getElementsByClassName("name")[i].style.lineHeight = "3.5vh";
    }
  }

  //Time stored here
  var time = [0, 0, 0];

  $(document).ready(function() {
    //If a team name button is clicked, add to the progress bar
    $(".name").click(
      function() {

        //Find the team...
        var index = teamNames.indexOf(this.innerHTML);
        var progress = document.getElementsByClassName("progress")[index];
        //Calculate the current width
        var progresswidth = Math.round($(progress).width() / $(progress).parent().width() * 100);
        var initial = progresswidth;
        var id = setInterval(frame, 20);
        //Animate
        function frame() {
          //6 problem sets
          if (progresswidth >= initial + 100 / 6 || progresswidth == 100) {
            clearInterval(id);
          } else {
            progresswidth++;

            //Don't go past 100%; disable buttons
            if (progresswidth == 100) {
              document.getElementsByClassName("name")[index].classList.add("disabled");

              //Get the time penalty and add it
              var penalty = document.getElementsByClassName("penalty")[index].innerHTML;
              var penaltyIndex = penalty.indexOf(":");
              var penaltyMinutes = parseInt(penalty.slice(0, penaltyIndex));
              var penaltySeconds = parseInt(penalty.slice(penaltyIndex + 1, penalty.length));
              //Final time
              var newtime = [];
              for (var i = 0; i < 3; i++) {
                newtime.push(time[i]);
              }
              newtime[0] += penaltyMinutes;
              newtime[1] += penaltySeconds;
              //Don't let it show stupid shit
              if (newtime[1] >= 60) {
                newtime[0]++;
                newtime[1] -= 60;
              }

              //Stringify
              var timeString = "";
              if (newtime[0] < 10) {
                timeString += "0"
              }
              timeString += newtime[0] + " : ";
              if (newtime[1] < 10) {
                timeString += "0"
              }
              timeString += newtime[1] + " : ";
              if (newtime[2] < 10) {
                timeString += "0"
              }
              timeString += newtime[2];
              document.getElementsByClassName("penalty")[index].innerHTML = timeString;
              document.getElementsByClassName("penalty")[index].classList.add("disabled");
            }
            progress.style.width = progresswidth + '%';
          }
        }
      }
    );

    //Add time
    $(".penalty").click(
      function() {
        var text = this.innerHTML;
        var index = text.indexOf(":");
        var minutes = parseInt(text.slice(0, index));
        var seconds = parseInt(text.slice(index + 1, text.length));
        seconds += 5;

        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        if (seconds == 60) {
          seconds = "00";
          minutes += 1;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        this.innerHTML = minutes + ":" + seconds;
      });

    var setTimer = false;

    //Start/stop timer
    $("#timer").click(
      function() {
        if (setTimer == false) {
          //Start counting
          setTimer = setInterval(timer, 10);

          function timer() {
            time[2]++;

            //Prevent timer from doing stupid shit
            if (time[2] == 100) {
              time[2] = 0;
              time[1]++;
              if (time[1] == 60) {
                time[1] = 0;
                time[0]++;
              }
            }

            //Stringify
            var timeString = "";
            if (time[0] < 10) {
              timeString += "0"
            }
            timeString += time[0] + " : ";
            if (time[1] < 10) {
              timeString += "0"
            }
            timeString += time[1] + " : ";
            if (time[2] < 10) {
              timeString += "0"
            }
            timeString += time[2];

            //Display
            document.getElementById("timer").innerHTML = timeString;
          }
        } else {
          clearInterval(setTimer);
          setTimer = false;
        }
      })

    //Reset everything
    $("#timer").dblclick(
      function() {
        var x = confirm("Reset?");
        if (x) {
          time = [0, 0, 0];
          this.innerHTML = "00 : 00 : 00";
          if (setTimer != false) {
            clearInterval(setTimer);
            setTimer = false;
          }
          for (var i = 0; i < teamNames.length; i++) {
            document.getElementsByClassName("penalty")[i].classList.remove("disabled");
            document.getElementsByClassName("penalty")[i].innerHTML = "00:00";
            document.getElementsByClassName("progress")[i].style.width = "0%";
            document.getElementsByClassName("name")[i].classList.remove("disabled");
          }
        }
      });
  });
});
