$(document).ready(function() {

    var config = {
    apiKey: "AIzaSyCCJcg-eGM1IGY4uaUypfZv_b3FJBMdZi8",
    authDomain: "rockpaperscissor-5b7c1.firebaseapp.com",
    databaseURL: "https://rockpaperscissor-5b7c1.firebaseio.com",
    projectId: "rockpaperscissor-5b7c1",
    storageBucket: "rockpaperscissor-5b7c1.appspot.com",
    messagingSenderId: "530855390395",
    appId: "1:530855390395:web:a3c6c2bedf5c0d52"
};

      firebase.initializeApp(config)

      var trainData = firebase.database()
     
$('#addTrainBtn').on('click',function(){
    var trainName = $('#trainNameInput').val().trim()
    var destination = $('#destinationInput').val().trim()
    var firstTrain = moment($('#firstTrainInput').val().trim(),'HH:mm').subtract(10,'years').format('x')
    var frequency = $('#frequencyInput').val().trim()

    console.log(firstTrain)



var newTrain = { 
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
}


trainData.ref().push(newTrain)
alert('Train Added!')

$('#trainNameInput').val('')
$('#destinationInput').val('')
$('#firstTrainInput').val('')
$('#frequencyInput').val('')

return false


})   

trainData.ref().on('child_added', function(snapshot){
var name = snapshot.val().name()
var destination = snapshot.val().destination
var firstTrain = snapshot.val().firstTrain
var frequency = snapshot.val().frequency

var remainder = moment().diff(moment.unix(firstTrain),'minutes')%frequency
var minutes = frequency - remainder
var arrival = moment().add(minutes,'m').format('hh:mm A')

$('#trainTable > tBody').append('<tr><td>' +name+'</td><td>' +destination+ '</td><td>'+frequency+ '</td><td>'+arrival+ '</td><td>'+minutes+ '</td></tr>')
})
})