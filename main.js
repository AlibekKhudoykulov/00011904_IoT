
const firebaseConfig = {
    apiKey: "AIzaSyB-B-KoGTj01S4-TZXHtds-GYt5ikspXiI",
    authDomain: "project-4409677430906139265.firebaseapp.com",
    databaseURL: "https://project-4409677430906139265-default-rtdb.firebaseio.com",
    projectId: "project-4409677430906139265",
    storageBucket: "project-4409677430906139265.appspot.com",
    messagingSenderId: "834781276501",
    appId: "1:834781276501:web:fc4bc140635fd1d91de7dc"
};


// Initialize Firebase

//const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);

// getting reference to the database
var database = firebase.database();

//getting reference to the data we want
var dataRef1 = database.ref('temp');
var dataRef2 = database.ref('humid');
var dataRef3 = database.ref('soil_moisture');
var dataRef4 = database.ref('water_level');


//fetch the data
dataRef1.on('value', function(getdata1){
    var temp = getdata1.val();
    document.getElementById('temperature').innerHTML = temp + "&#8451";
})

dataRef2.on('value', function(getdata2){
    var humi = getdata2.val();
    document.getElementById('humidity').innerHTML = humi + "%";
})

dataRef3.on('value', function(getdata3){
    var soilMoisture = getdata3.val();
    document.getElementById('SM').innerHTML = soilMoisture + "%";
})

dataRef4.on('value', function(getdata4){
    var waterLevel = getdata4.val();
    document.getElementById('waterLevel').innerHTML = waterLevel + "%";
})


function press(type) {
    var button = document.getElementById(type);
    var databaseRef = database.ref(type);

    databaseRef.once('value').then(function(snapshot) {
        var data = snapshot.val();
        if (data === 1) {
            // If data is 1, turn off
            databaseRef.set(0);
            button.innerHTML = "turn on";
        } else {
            // If data is not 1 (it might be 0 or null), turn on
            databaseRef.set(1);
            button.innerHTML = "turn off";
        }
    });
}