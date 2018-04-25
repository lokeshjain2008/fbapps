import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// It was asking about the Admin Options so i used requred style, so i don't need to input
//const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export interface ICom {
  id: string;
  name: string;
  topic: string;
  color?: string;
  sound?: string;
}

const Parashar = {
  id: "gq6OTIPISVYapo7rg2r8",
  topic: "parashar",
  name: "Parashar"
};
const ASPParty = {
  id: "5PHL9Gd8e5PzSmC5nEGm",
  topic: "asp",
  name: "ASP"
};

export interface Imessage {
  title: string;
  message: string;
  category: string;
}


// Add community details here to send Push notification on the new Message Add.
exports.sendMessageToParashar = createNotificationOnRowAdd(Parashar);
exports.sendMessageToASPparty = createNotificationOnRowAdd(ASPParty);

function sendPushNotification(
  topic: string,
  notification: { title: string; message: string }
) {
  // Send a message to devices subscribed to the provided topic.
 return  admin
    .messaging()
    .sendToTopic(topic, {
      data: { key: "Jai Hind!  Parashar Comunity" },
      notification
    })
    .then(response => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch(error => {
      console.log("Error sending message:", error);
    });
}

function createNotificationOnRowAdd(community: ICom) {
  return  functions.firestore
    .document(`communities/${community.id}/messages/{messageId}`)
    .onCreate((snapshot, context) => {
      const data = <Imessage>snapshot.data() || <Imessage>{};
      return sendPushNotification(community.topic, {
        title: `${community.name} Community | New Message in ${data.category} `,
        message:
          (data.title && data.title.substr(0, 50)) || `${community.name}`
      });
    });
}
