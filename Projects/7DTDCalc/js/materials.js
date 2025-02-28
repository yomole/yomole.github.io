//jQuery entry point
$(document).ready(function(){
  $("#submit").click(function(){
      console.log("jQuery detected a button press")
    $.getJSON("https://raw.githubusercontent.com/1MoreCompile/7dtd-calculator/master/18.4.json?token=AN3OLPHKM2AANWBW6G57PLK7TSNDS", function(item){
      document.getElementById('item').innerHTML
    }).fail(function(){
      console.log("The JSON file did not load correctly...")
    })
  });
});

function inputTableLoadNew(item, itemAmount){
  //This function will load a new table row in the input table.
  console.log("Loading New Item Row...");

  //Creates needed fields for the item info.
  var outputTable = document.getElementById('outputTable');
  var newRow = outputTable.insertRow();
  var newName = newRow.insertCell(0);
  var newCount = newRow.insertCell(1);
  newCount.innerHTML = itemAmount;
  newName.innerHTML = item;
}

//looks for the item in the JSON file.
function inputItemSearch(){
var searchItem = document.getElementById('item').value
var searchNeed = document.getElementById('need').value

//If there is nothing in the two input boxes then the browser will warn the User (to prevent empty rows).
if (searchItem !="" && searchNeed !=""){
inputTableLoadNew(searchItem, searchNeed);
}
else{
  window.alert("The item or amount you have chosen is not valid!");
}
//console.log(searchItem)
}
