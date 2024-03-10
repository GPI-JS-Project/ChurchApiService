// this section is service that handling service
const admin = require("firebase-admin");
const serviceAccount = {
    "type": "service_account",
    "project_id": "mosfraamtech-1558316179266",
    "private_key_id": "aff27e03f63fb5f60900566400f98cbf35f6c46b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvXB7R3IJddsXv\nuNRiwUW6SGPm3G6ttUHk9wL9jG5oIZWIDD+W/G0V8SQtgW64rnkfhLLgahF+rbBg\nRe1Lg0D4UpuLyTpiNI0GYa4QstkpjYrmRExrMg0X8sNl45XxA1COZH7YyWp3YMk3\ntZmsapjW/dI92ez7OAEHx/rufFE2k6b6kDnwIN7k95CRQqXS+h7dsD4VyeNxml4W\nMhlKAhe74NHZJOTAlXLEoRgNdnz9UZkom8uJy8SD9YmRz/onWnLmkLpe7QIMRlRC\npajYODNiSbpkV+7tqrIgNEFc/XO1nG2RC2wxn9KnmlJTXIe02DLDLYT/2IirGMUs\nRVNFhdJnAgMBAAECggEAJqaqUF1HCqy8MftOLLom0UlVY7QgXP8/l+Tt7s6+IwuL\n9uGkPnZC4Pw2miUWL3SdU9oexyH52y8TWhTvmZ5DerhSenwO90hX8RkkkZ+qB+Of\nwuM46MOuaSHj+ZgxG188qTXzU3sJkWhu0W2ggoU4TOLDLUjUWAbfC0UDxP73s4x4\ncbSUfF3r3UR2SE2JONEGZwC3dMU2LSjGtS63ciDKAb/tGHCUj7+CA6yw6lUjVdA5\nbP3sGgYf2T+TgAiZ8QljVIpP4P0MrQSMmarBZFv0jv9EEakdCpqgX0H5PWOnj4i+\nJJEF+E9LLi9FtBZ17emb9ZBX+kMISkXXnUwLbmRTOQKBgQDUF6XaWzw9PTjGkvXC\nwvZDyINl6s62gXbj4GmLykr/Gg+TMhMwrP37bxzq5KnJNBHqNFkNca6xD9pQTp1E\nAx1lgMHagcBPMweCjeMSnfGjakDdQYWJPMi/g+dgHIA3qYe9BQywlxLbpJGjess/\nMCes/NQbu2KB93QZFO8xRHjgQwKBgQDTqb4d/fG5ZmEZRRGvUxuQgaJV8+xuc39w\n9bETv7Bb/EGE06oZKMTJWZ2LXwd5w4zKEMmgRLL5aakK8WzXZSrhYGQyKVQ5u4nl\n41iSBoCazFELw9ObjeeMY8uRh7emAYxf7BU7EzM1wiTqsChUuPF+wPBFuSmvoE5H\nDaX6HvhlDQKBgQCBPefTJ8WNi8ENQICCLkvjAk0PzgYpMLtCIX4vsRYCXd8f02Pe\nRYx/qzXz7WOJODGyhjO9/Yh2XTKrvTwYNc20DMIUZPzLRk1NQSkeLyEQc68TJNo6\nxs+N5NMZvkRjpusQRAN3mJflQGN/O1SfLLkAsRCP1aAxkpksr5UScKc4AQKBgCv+\nniuxuuqkYw5Tkud0SMhyiYGAH+adTyH1j4bhUxDrj9rB/BsapDyNyfdMG0ut37eo\nYaBUZzb8RUym/c6Pkqgh1vGuMXmGh5Um+iPwAg8q5LWjUHqGtlgx7gAjy4JP1BOk\nCI2s4foMjovRbbCeeGO2SrrTT9zXXy3ZomQox8yJAoGAcQIQDaX6UgLy0w2B0iv8\nVYMxucV/m4zXW8TqVlE91fj4jiVy4r50oEV1QJ3ReYqE5qHd1lWkJ1VnZMdxkrt0\nTj3/hlB56+N2owHqGpBbbB0KxzrdUsDgN+WzfuZEy4q4jJuIUAZR4xy1aJvFCaet\nEy2MM747guojYIb5MIokVbQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-8er5b@mosfraamtech-1558316179266.iam.gserviceaccount.com",
    "client_id": "100449311974729456273",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8er5b%40mosfraamtech-1558316179266.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
class MessagingService {

    async messagingServiceAsync(req) {
        try {
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