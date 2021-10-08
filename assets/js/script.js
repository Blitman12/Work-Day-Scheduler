$(document).ready(function () {
    // if tasks exists in localStorage it will be placed here, otherwise it will be an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentTime = moment().format('LT').slice(0, -6)
    
    //Change color based off of the current time
    var changeColorOnTime = function () {
        $(".container").find("h3").each(function(index) {
            let timeBlock = $(this).text().slice(0, -2)
            console.log(timeBlock)
            console.log("the current time is: " + currentTime)
            // if its inbetween the hour block make red
            if (currentTime === timeBlock) {
                $(this).siblings("textarea").addClass("present").removeClass("bg-secondary")
            } 
            // if its above hour block make green
            else if (currentTime > timeBlock) {
                $(this).siblings("textarea").addClass("future").removeClass("bg-secondary")
            } 
            //if its below hour block make grey
            else {
                $(this).siblings("textarea").addClass("past").removeClass("bg-secondary")
            }
        })
    }

    //call the function to change classes based off of time
    changeColorOnTime()

    let loadTasks = function () {
        let loadedTasks = JSON.parse(localStorage.getItem("tasks"))
        console.log(loadedTasks)
    }


    let saveTasks = function () {
        localStorage.setItem("tasks", JSON.stringify(tasks))
        loadTasks();
    }


    // Aquires the users input on a specific time and uploads it to localStorage
    $(".container").on("click", ".saveBtn", function () {
        let loadedTasks = localStorage.getItem("tasks")
        let formatedTasks = JSON.parse(loadedTasks)
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