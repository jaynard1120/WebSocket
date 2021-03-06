var connection = false;
var client;
function connect() {
    document.getElementById("status").value = "Connecting ...";
    var broker = document.getElementById("broker").value;
    client = mqtt.connect(broker)
    client.on("connect", () => {
        connection = true;
        document.getElementById("status").value = "Connected!";
        console.log("Connected to " + broker);
    });

    client.on('message', function (topic, message) {
        console.log(message.toString())
        document.getElementById('m-table').innerHTML += `<tr><td>${topic}</td><td>${message}</td><td>${getDate()}</td></tr>`
    })
}

function publish() {
    if (
        document.getElementById("topic").value != "" &&
        document.getElementById("payload").value != "" && connection
    ) {
        var topic = document.getElementById("topic").value;
        var payload = document.getElementById("payload").value
        console.log(getDate())
        client.publish(topic, payload)
        document.getElementById("p-table").innerHTML += `<tr><td>${topic}</td><td>${payload}</td><td>${getDate()}</td></tr>`
    }
}

function subscribe() {
    if (document.getElementById('s-topic').value != "" && connection) {
        client.subscribe(document.getElementById('s-topic').value, function (err) {
            if (err) {
                console.error("Error in subscribing topic!")
            } else {
                document.getElementById("s-table").innerHTML += `<tr><td>${document.getElementById("s-topic").value
                    }</td > <td>${getDate()}</td></tr > `
            }
        })
    }
}



function getDate() {
    var date = new Date();
    var listDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var listMonth = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var hour = date.getHours();
    var stat = (hour > 12) ? " PM" : " AM"
    hour = (hour > 12) ? hour - 12 : hour;
    return listDay[date.getDay()] + " " + listMonth[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + hour + ":" + date.getMinutes() + ":" + date.getSeconds() + stat;
}
