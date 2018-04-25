"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// It was asking about the Admin Options so i used requred style, so i don't need to input
//const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
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
// Add community details here to send Push notification on the new Message Add.
exports.sendMessageToParashar = createNotificationOnRowAdd(Parashar);
exports.sendMessageToASPparty = createNotificationOnRowAdd(ASPParty);
function sendPushNotification(topic, notification) {
    // Send a message to devices subscribed to the provided topic.
    return admin
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
function createNotificationOnRowAdd(community) {
    return functions.firestore
        .document(`communities/${community.id}/messages/{messageId}`)
        .onCreate((snapshot, context) => {
        const data = snapshot.data() || {};
        return sendPushNotification(community.topic, {
            title: `${community.name} Community | New Message in ${data.category} `,
            message: (data.title && data.title.substr(0, 50)) || `${community.name}`
        });
    });
}
//# sourceMappingURL=index.js.map