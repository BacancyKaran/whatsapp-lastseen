let sessionCount = 0

// createing local session object
let sessionData = {}
    // Testing if there is a data in local storage
if (JSON.parse(localStorage.getItem('sessionData'))) {
    sessionData = JSON.parse(localStorage.getItem('sessionData'));
}



let Name = document.querySelector("._21nHd").innerText
let onlineAt = []
let offlineAt = []
let timestampOnline = []
    // let userOnline = []
let online = false

function GetLS() {
    // console.log("GetLS")
    //debugger
    let child = document.querySelector("._24-Ff").children
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    var date = {
        date: dt.getDate().toString(),
        month: (dt.getMonth() + 1).toString(),
        year: dt.getFullYear().toString(),
        day: dt.getDay().toString(),
    }
    let timestamp = dt.getHours() * 60 * 60 + dt.getMinutes() * 60 + dt.getSeconds()


    if (child.length == 2) {
        let status = document.querySelector("._3e6xi.zzgSd").children[0].title

        if (status == "online") {
            console.log("Got online at " + time)
                // online = true
                //adding online time in seconds ( For getting duration)
            timestampOnline[sessionCount] = timestamp
            onlineAt[sessionCount] = time
        } else {
            console.log(status)
                // online = false
        }





    } else {

        console.log("Got Offline at " + time)
        offlineAt[sessionCount] = time

        let setIn = {
                startTime: onlineAt[sessionCount],
                endTime: offlineAt[sessionCount],
                Duration: (timestamp - timestampOnline[sessionCount]) + 's'
            }
            // debugger

        if (sessionData[Name]) {
            if (sessionData[Name][date.year]) {
                if (sessionData[Name][date.year][date.month]) {

                    if (sessionData[Name][date.year][date.month][date.date]) {

                        let count = sessionData[Name][date.year][date.month][date.date].length
                        sessionData[Name][date.year][date.month][date.date][count] = setIn
                    } else {
                        sessionData[Name][date.year][date.month][date.date] = []
                        sessionData[Name][date.year][date.month][date.date][0] = setIn
                    }

                } else {

                    sessionData[Name][date.year][date.month] = []
                    sessionData[Name][date.year][date.month][date.date] = [setIn]
                }
            } else {
                sessionData[Name][date.year] = []
                sessionData[Name][date.year][date.month] = []
                sessionData[Name][date.year][date.month][date.date] = [setIn]
            }

        } else {
            sessionData[Name] = []
            sessionData[Name][date.year] = []
            sessionData[Name][date.year][date.month] = []
            sessionData[Name][date.year][date.month][date.date] = [setIn]
        }
        localStorage.setItem('sessionData', JSON.stringify(sessionData))
        sessionCount += 1


    }
}

let LSToday = (user) => {
    var dt = new Date();
    let date = {
        date: dt.getDate().toString(),
        month: (dt.getMonth() + 1).toString(),
        year: dt.getFullYear().toString(),
        day: dt.getDay().toString(),
    }
    return sessionData[user][date.year][date.month][date.date]
}

$("#app").on("DOMSubtreeModified", function() {
    
    let UserName = document.querySelector("._21nHd").innerText

    if (Name != UserName) {
        console.log("=========================================")
        console.log(`User iS Now ${UserName}`)
        GetLS()
        $("._24-Ff").on("DOMSubtreeModified", GetLS)
        
        Name = UserName
    }
})
