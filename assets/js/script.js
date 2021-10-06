$(document).ready(function() {
let tasks = {};

var changeColorOnTime = function () {

}

$(".container").on("click", ".saveBtn", function () {
   // gets the value the user input into the textarea
   let taskInput = $($(this).siblings("textarea")).val()
   // gets the value of the time slot and removes the am/pm from it to leave a normal number
   let taskTime = $($(this).siblings("textarea").prev()).text().slice(0, -2)
 
   console.log(taskInput, taskTime)
})





})