firebase.initializeApp(firebaseConfig);
var dbRef = firebase.database();
var dataaa = dbRef.ref("emg");
dataaa.on("value", (snap) => {
    // console.log(JSON.stringify(snap))
    // console.log(snap.numChildren())
    let emg_val = [];
    // var timestamp_val
    // var servo_val
    snap.forEach((emg) => {
        //   emg_val += JSON.stringify(emg.val().emg)
        //   timestamp_val += JSON.stringify(emg.val().timestamp)
        //   servo_val += emg.val()
        //   console.log(JSON.stringify(emg.servo))
        // emg_val += emg.val().emg;
        // console.log(emg.val().emg)
        emg_val += emg.val().emg
    });
    console.log(emg_val)
    // console.log(timestamp_val)
    // console.log(servo_val)
    // console.log([1,2,3])
    const ctx = document.getElementById('myChart').getContext('2d');
            
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: emg_val,
                datasets: [{
                    label: '# of Votes',
                    data: emg_val,
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    
});