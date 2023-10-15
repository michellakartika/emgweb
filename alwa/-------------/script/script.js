const ppg_div = document.querySelector(`[data-firebase="ppg"]`)


firebase.initializeApp(firebaseConfig);
var dbRef = firebase.database();
var dataaa = dbRef.ref("data");
dataaa.on("value", (snap) => {
    const ppg = snap.child('ir');
    const millis = snap.child('millis');
    // console.log(JSON.stringify(snap.child('ir')));
    // console.log(snap.numChildren())
    // snap.forEach((data) => {
    //     //   emg_val += JSON.stringify(emg.val().emg)
    //     //   servo_val += emg.val()
    //     //   console.log(JSON.stringify(ppg))
    //     // ppg_val += data.val();
    //     // console.log(data.val())
    //     // emg_val += emg.val().emg
    //     ppg_div.innerHTML += (`
    //     <div>${snap.val()}</div>
    //     `)
    // });
    const ctx = document.getElementById('myChart').getContext('2d');
            
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: millis.val(),
                datasets: [{
                    label: 'PPG',
                    data: ppg.val(),
                    backgroundColor: [
                    // 'rgba(255, 99, 132, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                    // 'rgba(255,99,132,1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                    ],
                    // borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:false
                        }
                    }]
                }
            }
        });
    
});