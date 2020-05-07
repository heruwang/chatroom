"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let input;
let sendBtn;
let chatsLoaded = false;

function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below
input = select('#input');
sendBtn = select('#sendBtn');

sendBtn.mousePressed(sendMessage);

  let config = {
    apiKey: "AIzaSyAns57wfC4JE6_xq7J1VCUp_todVSX4tm8",
   authDomain: "socialmedia-912ca.firebaseapp.com",
   databaseURL: "https://socialmedia-912ca.firebaseio.com",
   projectId: "socialmedia-912ca",
   storageBucket: "socialmedia-912ca.appspot.com",
   messagingSenderId: "444827764383",
   appId: "1:444827764383:web:9ca16c4fde02456138c4aa",
   measurementId: "G-VYBJGNT549"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!
}

function draw() {

}

function sendMessage(){

  let timestamp = Date.now();
  let chatObject = {
    message: input.value(),
    timestamp: timestamp,
  }
  createNode(folderName, timestamp, chatObject);
  input.value('');
}

function displayPastChats(){
  for(let i = 0; i< fbDataArray.length; i++){
    let p = createP(fbDataArray[i].message);
  }
}

function displayLastChats(){
  let index = fbDataArray.length-1;
 let p = createP(fbDataArray[index].message);
}
