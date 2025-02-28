//time.js code for 7 Days to Die Calculator
//Yovany Molina


//Hides potentially irrevalent fields until a user clicks the measurement they want.

function optionsHidden(){
  var form1 = document.getElementById('baseInput');
  var form2 = document.getElementById('hordeInput');
  form1.style.visibility = 'hidden';
  form2.style.visibility = 'hidden';
  document.getElementById('submit').style.visibility = 'hidden';
}

function optionsReveal(purpose){
  var form1 = document.getElementById('baseInput');
  var form2 = document.getElementById('hordeInput');
  if (purpose === 'day' || purpose === 'night'){
    form1.style.visibility = 'visible';
    form2.style.visibility = 'hidden';
    document.getElementById('gameDay').style.display= 'none';
    document.getElementById('gameDayDescription').style.display ='none';
    document.getElementById('submit').style.visibility = 'visible';
  }
  else if (purpose === 'horde'){
    form1.style.visibility = 'visible';
    form2.style.visibility = 'visible';
    document.getElementById('gameDay').style.display = 'initial';
    document.getElementById('gameDayDescription').style.display ='initial';
    document.getElementById('submit').style.visibility = 'visible';
  }
}

//Main function used to make the calculations.
function calculate(){

//get the integer values for the form elements and assigns them to easy-use variables.
var dayStart = parseInt(document.getElementById('gameDaylight').value);
var currentDay = parseInt(document.getElementById('gameDay').value);
var currentHour = parseInt(document.getElementById('gameHour').value);
var currentMinute = parseInt(document.getElementById('gameMinute').value);
var hordeFreq = parseInt(document.getElementById('gameHorde').value);
var hordeRange = parseInt(document.getElementById('gameRange').value);
var dayDuration = parseInt(document.getElementById('gameDuration').value);
var conversion = dayDuration/24;

  if (document.getElementById('day').checked){
    console.log('*Day calculation requested.*')

  }
  else if (document.getElementById('night').checked){
    console.log('*Night calculation requested.*')
  }
  //Calculates time until Horde Night. If given Horde Range, possible times until Horde Night.

  else if (document.getElementById('horde').checked){
    console.log('*Horde night calculation requested.*');

    //Adjusts the hordeFreq variable if it is during horde night.
    if ((currentDay/hordeFreq == 1 && currentHour/22 >= 1 && currentMinute > 0) || currentDay/hordeFreq > 1) hordeFreq = hordeFreq * Math.ceil(currentDay/hordeFreq);

    //adjusts gtHordeHour if there are any minutes in the value.
    let gtHordeHour = 24 * (hordeFreq - currentDay) + (22 - currentHour);
      if (currentMinute > 0){
        gtHordeHour--
        var gtHordeMinute = 60 - currentMinute;
      }
      else if (currentMinute == 0){
        var gtHordeMinute = 0;
      }

    //Conversion from game time to real minutes.
    var rtMinutes = (gtHordeHour + (gtHordeMinute/60)) * conversion;

    //cuts rtMinutes into rtHours and rtMinutes before figuring out rtSeconds.

    if (rtMinutes % 60 !== 0){
        var rtHours = Math.floor(rtMinutes / 60);
        rtMinutes -= rtHours * 60;
    }
    else rtHours = 0;

    console.log(rtMinutes);
    var rtDecimal = decimalReturn(rtMinutes);

    function decimalReturn(rtInput){
      var rtDecimalPart = parseInt(rtInput.toString().split('.')[1]);
      if (isNaN(rtDecimalPart) === false){
        return parseInt(rtInput.toString().split('.')[1].slice(0,2));
      }
      else{
        return 0;
      }
    }

    var rtSeconds = (60 * rtDecimal * Math.pow(10, -1 * rtDecimal.toString().length)).toFixed();
    rtMinutes = Math.floor(rtMinutes);

    //Calculates the duration of horde night using the duration of a day and daylight time.
    var gtHordeDuration = 24 + (dayStart - 22);
    var rtHordeDuration = conversion * gtHordeDuration;

    console.log ('In game, the time until horde night is ' + gtHordeHour + ' hours and ' + gtHordeMinute + ' minutes.');
    console.log('It will take approximately ' + rtMinutes + ' minutes and ' + rtSeconds + ' seconds to get to horde night.');
    console.log('Horde night will last ' + gtHordeDuration + ' in-game hours, but ' + rtHordeDuration + ' minutes in real life.');

    let descriptionText1 = 'In-game, the next horde night will be in:';
    let descriptionText2 = 'In real life, the next horde night will be in:';

    //checks for and amends a ranged calculations
    if (hordeRange !== 0){
      var resultText1 = (gtHordeHour - (hordeRange * 24)) + ' : ' + gtHordeMinute + ' - ' + (gtHordeHour + (hordeRange * 24)) + ' : ' + gtHordeMinute;
      var resultText2 = rtHours - ((hordeRange * 24 * conversion) / 60) + ' : ' + rtMinutes + ' : ' + rtSeconds + ' - ' + (rtHours + ((hordeRange * 24 * conversion) / 60)) + ' : ' + rtMinutes + ' : ' + rtSeconds;
    }
    else{
      var resultText1 = gtHordeHour + ' : ' + gtHordeMinute;
      var resultText2 = rtHours + ' : ' + rtMinutes + ' : ' + rtSeconds;
    }


    createResults([descriptionText1,resultText1,descriptionText2,resultText2]);


  }
  function createResults(timerText){

    if (resultsText.innerHTML == ''){
      for (i = 0; i < timerText.length; i++){
        resultsText.innerHTML += timerText[i] + '<br/>';
      }
    }
    else{
      resultsText.innerHTML = '';
      calculate();
    }
  }
  //Creates a timer element below the sectionHeader that uses hordeRange to generate possible times for Hoarde night.
  function createRange(){




  }
}
