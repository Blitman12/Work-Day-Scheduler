$(document).ready(function () {
    let tasks = [];

    var changeColorOnTime = function () {

    }


    let loadTasks = function () {
        let loadedTasks = JSON.parse(localStorage.getItem("tasks"))
        console.log(loadedTasks)
    }


    let saveTasks = function () {
        localStorage.setItem("tasks", JSON.stringify(tasks))
        loadTasks();
    }



    //everything works perfect until I refresh the screen and the submit again.....


    // Aquires the users input on a specific time and uploads it to localStorage
    $(".container").on("click", ".saveBtn", function () {
        let loadedTasks = localStorage.getItem("tasks")
        console.log(loadedTasks + " is the not parsed yet")
        let formatedTasks = JSON.parse(loadedTasks)
        console.log(formatedTasks + " is the formated")
        if (!formatedTasks) {
            // gets the value the user input into the textarea
            let taskInput = $($(this).siblings("textarea")).val()
            // gets the value of the time slot and removes the am/pm from it to leave a normal number
            let taskTime = $($(this).siblings("textarea").prev()).text().slice(0, -2)

            tasks = [{
                text: taskInput,
                time: taskTime
            }]

            saveTasks();
        } else {
            // gets the value the user input into the textarea
            let taskInput = $($(this).siblings("textarea")).val()
            // gets the value of the time slot and removes the am/pm from it to leave a normal number
            let taskTime = $($(this).siblings("textarea").prev()).text().slice(0, -2)
            let tempObject = {
                text: taskInput,
                time: taskTime
            }

            tasks.push(tempObject)

            saveTasks();
        }
    })

    loadTasks();

})