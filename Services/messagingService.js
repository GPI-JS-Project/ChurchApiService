// this section is service that handling service
const admin = require("firebase-admin");

class MessagingService {

    async messagingServiceAsync(req) {
        try {
            const serviceAccount = require("./mosfraamtech-1558316179266-firebase-adminsdk-8er5b-aff27e03f6.json");
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            // This registration token comes from the client FCM SDKs.
            const registrationToken = req.token;
            const message = {
                notification: {
                    title: "Selamat Ulang Tahun",
                    body: "Batary Asyur Nauw, Tuhan Yesus memberkati."
                },
                webpush: {
                    fcmOptions: {
                        link: '/birthday'
                    }
                },
                token: registrationToken
            };
            // Send a message to the device corresponding to the provided
            // registration token.
            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {});
            return req;
        } catch (error) {
            console.error('Error executing message service:', error);

            throw error;
        }
    }
}

module.exports = MessagingService;