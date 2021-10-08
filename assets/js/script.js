$(document).ready(function () {
    // if tasks exists in localStorage it will be placed here, otherwise it will be an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentTime = moment().format("HH")
    console.log(tasks)
    //Change color based off of the current time
    var changeColorOnTime = function () {
        $(".container").find("h3").each(function () {
            let timeBlock = $(this).data("time")
            // if its inbetween the hour block make red. Using double equals because of the string to number
            if (currentTime == timeBlock) {
                $(this).siblings("textarea").removeClass("bg-secondary").addClass("present")
            }
            // if its above hour block make green
            if (timeBlock > currentTime) {
                $(this).siblings("textarea").removeClass("bg-secondary").addClass("future")
            }
            //if its below hour block make grey
            if (currentTime < timeBlock) {
                $(this).siblings("textarea").removeClass("bg-secondary").addClass("past")
            }
        })
    }

    //call the function to change classes based off of time
    changeColorOnTime()


    // load tasks from local storage then placing them in their right spaces
    let loadTasks = function () {
        let loadedTasks = JSON.parse(localStorage.getItem("tasks"))
        // if there is nothing in localStorage then get out of this function
        if (!loadedTasks) {
            return
        }
        //if there is something in localStorage then place it in its respective spot
        $(".container").find("h3").each(function () {
            let textToReplace = $(this).siblings("textarea")
            let timeBlock = $(this).data("time")
            for (let i = 0; i < loadedTasks.length; i++) {
                if (timeBlock == loadedTasks[i].time) {
                    textToReplace.val(loadedTasks[i].text)
                }
            }
        })
    }

    // Save tasks to localStorage and then loading those tasks
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
            let taskTime = $($(this).siblings("textarea").prev()).data("time")
            tasks = [{
                text: taskInput,
                time: taskTime
            }]
            saveTasks();
        } else {
            // gets the value the user input into the textarea
            let taskInput = $($(this).siblings("textarea")).val()
            // gets the value of the time slot and removes the am/pm from it to leave a normal number
            let taskTime = $($(this).siblings("textarea").prev()).data("time")

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].time == taskTime) {
                    tasks[i].text = taskInput
                    saveTasks()
                } else {
                    let tempObject = {
                        text: taskInput,
                        time: taskTime
                    }
                    tasks.push(tempObject)
                    saveTasks();
                }
            }
        }
    })
    loadTasks();


    //call the changeColor function once every 30 minutes
    setInterval(function () {
        changeColorOnTime()
    }, (1000 * 60) * 30)

})