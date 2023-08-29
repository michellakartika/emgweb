var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 23, 2, 3],
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

 function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
    }

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

var config = {
    apiKey: "AIzaSyAdA4Ug438Lf6tooT6sS67AbsByRg22P2Y",
    authDomain: "esp-web-7622f.firebaseapp.com",
    databaseURL: "https://esp-web-7622f-default-rtdb.firebaseio.com",
    projectId: "esp-web-7622f",
    storageBucket: "esp-web-7622f.appspot.com",
    messagingSenderId: "889539896290",
    appId: "1:889539896290:web:734077d8b57a55f26c0fbb"
};

firebase.initializeApp(config);

var valueRef = firebase.database().ref('3984');
valueRef.on('child_added', (snapshot) => {
    var temperature = snapshot.val();
    var time = snapshot.val()
    addData(myChart, time, temperature);
});
