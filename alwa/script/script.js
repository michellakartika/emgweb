const ambil = document.querySelector(`[data-button="ambil"]`);
const hasil = document.querySelector(`[data-firebase="hasil"]`);


// ambil.onclick = () => {
    // firebase.database().ref('3984').limitToFirst(50).on("value", (snap) => {
        // hasil.innerHTML = (`
        //     <div>${snap.val()}</div>
        // `);
        // hasil.innerHTML = snap.numChildren();    

        // hasil.innerHTML = '';
        // let no = 1;

        // snap.forEach((user) => {
        //     hasil.innerHTML += (`
        //     <tr>
        //     <td>${no}</td>
        //     <td>${snap.val()}</td>
        //     </tr>
        //     `);
        //     no++;
        // });
        // data = Object.entries(snap)
        // console.log(snap)
    // });
// }

getData();
function getData(params){
    // fetch('https://esp-web-7622f-default-rtdb.firebaseio.com/3984.json')
    fetch('https://emgrealtime-default-rtdb.asia-southeast1.firebasedatabase.app/emg.json')
    .then((res) => res.json())
    .then((data) => {
        let tabel = '';
        let output = Object.entries(data);
        // console.log(output);
        output.forEach((row) => {
            // console.log(row[1])
            hasil.innerHTML +=`
            <p>${row[1]}</p>
            `
        })
    });
}