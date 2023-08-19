const ambil = document.querySelector(`[data-button="ambil"]`);
const hasil = document.querySelector(`[data-firebase="hasil"]`);

ambil.onclick = () => {
    
    firebase.database().ref('users').limitToFirst(3).orderByKey().once("value", (snap) => {
        // hasil.innerHTML = (`
        //     <div>Nama: ${snap.val().nama}</div>
        //     <div>Domisili: ${snap.val().domisili}</div>
        // `);

        // hasil.innerHTML = snap.numChildren();

        hasil.innerHTML = '';

        snap.forEach((user) => {
            hasil.innerHTML += (`
                <div>Nama: ${user.val().nama}</div>
                <div>Domisili: ${user.val().domisili}</div>
                <br>
            `);
        });
    });

}