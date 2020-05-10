"use strict";
// template for firebase basic chatroom
// YOU WILL NEED TO PASTE YOUR CONFIG INFO FROM FIREBASE LINE 31

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chat-usernamer"; // name of folder you create in db
let messageInput;
let usernameInput;
let sendBtn;
let chatsLoaded = false;
let messageDiv;



function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  messageDiv = document.querySelector('#messageDiv');


  usernameInput = select('#usernameInput');
  messageInput = select('#messageInput');

  sendBtn = select('#sendBtn');

  messageInput.changed(sendMessage);
  sendBtn.mousePressed(sendMessage);

  // PASTE YOUR FIREBASE CONFIG DATA HERE
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

  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);
}

function draw() {

}

function sendMessage() {
  if(usernameInput.value() !== '' && messageInput.value() != ''){

  let timestamp = Date.now();
  let chatObject = {
    username:usernameInput.value(),
    message: messageInput.value(),
    timestamp: timestamp,
  }

  createNode(folderName, timestamp, chatObject);
  messageInput.value('');

} else{
  alert('type username and message first!');
}
}


function displayPastChats() {
  let length = fbDataArray.length;

  for (let i = 0; i < length; i++) {
    let date = new Date(fbDataArray[i].timestamp);
    let p = createP(`${fbDataArray[i].username}: ${fbDataArray[i].message}`);
    p.parent('messageDiv');
  }

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;

}

function displayLastChat() {
  let index = fbDataArray.length - 1;
  let p = createP(`${fbDataArray[index].username}: ${fbDataArray[index].message}`);
  p.parent('messageDiv');

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;
}
