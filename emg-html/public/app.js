//Database Paths
//var datatimePath = "emg-html/time";
var dataemgPath = "emg-html/emg";
var dataservoPath = "emg-html/servo";
var databasePath = "emg-html";

//Get a database reference 
//const databasetime = database.red(datatimePath);
const databaseemg = database.ref(dataemgPath);
const databaseservo = database.ref(dataservoPath);
const databasevalue = database.ref(databasePath);

//Variables to save database current values
//var timereading;
var emgreading;
var servoReading;
var currentTime;

//Attach an asynchronous callback to read data


databasevalue.on("value", (snapshot) => {
    var emgreading = snapshot.val().emg;
    var servoReading = snapshot.val().servo; 
    console.log(emgreading, "EMG data");

    // Update the HTML table
    var table = document.getElementById("dataTable");
    var newRow = table.insertRow(1); // Add new row after headings

    // Add cells to the new row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    // Set the content of the cells
    var currentTime = new Date().toLocaleTimeString();
    cell1.innerHTML = currentTime;
    cell2.innerHTML = emgreading;
    cell3.innerHTML = servoReading; // Leave % Servo cell empty for now

    // Scroll the table to show the latest row
    table.scrollTop = table.scrollHeight;
    updateGraph(currentTime,emgreading, servoReading);
}, (errorObject) => {
    console.log("The read failed: " + errorObject.name);
});


// databaseemg.on("value", (snapshot) => {
//     var emgreading = snapshot.val();
//     console.log(emgreading, "EMG data");

//     // Update the HTML table
//     var table = document.getElementById("dataTable");
//     var newRow = table.insertRow(1); // Add new row after headings

//     // Add cells to the new row
//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     var cell3 = newRow.insertCell(2);

//     // Set the content of the cells
//     var currentTime = new Date().toLocaleTimeString();
//     cell1.innerHTML = currentTime;
//     cell2.innerHTML = emgreading;
//     cell3.innerHTML = ""; // Leave % Servo cell empty for now

//     // Scroll the table to show the latest row
//     table.scrollTop = table.scrollHeight;
//     updateGraph(currentTime,emgreading, servoReading);
// }, (errorObject) => {
//     console.log("The read failed: " + errorObject.name);
// });

// // Listen for changes in Servo data
// databaseservo.on("value", (snapshot) => {
//     var servoReading = snapshot.val();
//     console.log(servoReading, "% Servo data");

//     // Find the most recent row and update the % Servo cell
//     var table = document.getElementById("dataTable");
//     var lastRow = table.rows[1]; // The row right below headings
//     if (lastRow) {
//         var servoCell = lastRow.cells[2]; // % Servo cell
//         servoCell.innerHTML = servoReading;
//     }
//     updateGraph(currentTime,emgreading, servoReading);
// }, (errorObject) => {
//     console.log("The read failed: " + errorObject.name);
// });

