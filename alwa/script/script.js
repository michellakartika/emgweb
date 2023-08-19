const ambil = document.querySelector(`[data-button="ambil"]`);
const hasil = document.querySelector(`[data-firebase="hasil"]`);


// ambil.onclick = () => {
    
    firebase.database().ref('3984').limitToFirst(50).on("value", (snap) => {
        // hasil.innerHTML = (`
        //     <div>${snap.val()}</div>
        // `);
        hasil.innerHTML = snap.numChildren();    

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
    });


// }