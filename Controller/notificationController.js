// this section is controller
class MessagingController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }

    async postNotification(req, res) {
        try {
            const model = req.body;
            const result = await this.notificationService.createNotificationService(model);
            res.json(result);
        } catch (error) {
            res.json({
                error: 'Error fetching postMessaging from database',
                message: error
            });
        }
    }

    async getNotification(req, res) {
        try {
            const result = await this.notificationService.getNotificationService();
            res.json(result);
        } catch (error) {
            res.json({
                error: 'Error fetching get notification from database',
                message: error
            });
        }
    }
}

module.exports = MessagingController;