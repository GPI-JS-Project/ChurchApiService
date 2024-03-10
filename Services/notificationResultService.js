// this section is service that handling service
const admin = require("firebase-admin");
const executeStoredProcedure = require('../Provider/providers');
const NotificationResultModel = require('../Model/notificationResultModel');
const NotificationModel = require('../Model/notificationModel');

let responseData = {};
class NotificationService {

    async messagingServiceAsync(req) {
        try {
            // This registration token comes from the client FCM SDKs.
            responseData.payload = req;
            const registrationToken = req.token;
            const message = {

                data: {
                    title: "Selamat Ulang Tahun",
                    body: "Batary Asyur Nauw, Tuhan Yesus memberkati.",
                    icon: 'https://gpijalansuci.org/img/logowebDark.1e4d74bd.png',
                },
                token: registrationToken
            };
            // Send a message to the device corresponding to the provided
            // registration token.
            admin.messaging().sendToDevice(message)
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
        const resultData = results[0].map(data => new NotificationResultModel(data));
        return resultData[0];
    }

    async getNotificationListService() {
        const results = await executeStoredProcedure('getNotifications');
        const resultData = results[0].map(data => new NotificationModel(data));
        return resultData;
    }

    async getNotificationService() {
        try {
            const notificationList = await this.getNotificationListService(); // Calling getNotificationService function
            const registrationTokens = notificationList.map(notification => notification.token); // Extracting tokens from notificationList
            const promises = registrationTokens.map((token) => {
                const message = {
                    "token": token,
                    "notification": {
                        "title": "Match update",
                        "body": "Arsenal goal in added time, score is now 3-0"
                    },
                    "webpush": {
                        "headers": {
                            "Urgency": "high"
                        }
                    }
                };
                return admin.messaging().send(message)
                    .then((response) => {
                        console.log('Successfully sent message:', response);
                        return {
                            token: token,
                            status: "success",
                            message: response
                        };
                    })
                    .catch((error) => {
                        console.error('Error sending message:', error);
                        return {
                            token: token,
                            status: "error",
                            message: error

                        };
                    });
            });

            const responses = await Promise.all(promises);
            return responses;
        } catch (error) {
            console.error('Error executing pushNotification:', error);
            throw error;
        }

    }
}

module.exports = NotificationService;