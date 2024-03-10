// this section is service that handling service
const admin = require("firebase-admin");
const executeStoredProcedure = require('../Provider/providers');
const MessagingModel = require('../Model/messagingModel');
let responseData = {};
class MessagingService {

    async messagingServiceAsync(req) {
        try {
            // This registration token comes from the client FCM SDKs.
            responseData.payload = req;
            const registrationToken = req.token;
            const message = {
                notification: {
                    title: "Selamat Ulang Tahun",
                    body: "Batary Asyur Nauw, Tuhan Yesus memberkati."
                },
                webpush: {
                    notification: {
                        // Custom notification options for web clients
                        icon: 'https://gpijalansuci.org/img/logowebDark.1e4d74bd.png', // URL to the icon image
                        image: 'https://www.sacode.web.id/assets/img/sacodesweekend/sacodesweekend-noval.png', // URL to the image
                        click_action: 'https://jaktim.gpijalansuci.org/birthday' // Action to perform when the notification is clicked
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
                    responseData.res = {
                        status: "success",
                        message: response
                    };
                })
                .catch((error) => {
                    responseData.res = {
                        status: "error",
                        message: error
                    };
                });
            return responseData;
        } catch (error) {
            console.error('Error executing message service:', error);

            throw error;
        }
    }

    async createNotificationService(req) {
        // Example usage: 
        let token = req.token;
        let ip = req.ip;
        let location = req.location;
        let device = req.device;

        const paramsArray = [token, ip, location, device];

        const results = await executeStoredProcedure('createNotification', paramsArray);
        const resultData = results[0].map(data => new MessagingModel(data));
        return resultData[0];
    }
}

module.exports = MessagingService;