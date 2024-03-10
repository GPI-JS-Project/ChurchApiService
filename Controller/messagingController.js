// this section is controller
class MessagingController {
    constructor(messagingService) {
        this.messagingService = messagingService;
    }

    async postMessaging(req, res) {
        try {
            const model = req.body;
            const result = await this.messagingService.createNotificationService(model);
            res.json(result);
        } catch (error) {
            res.json({
                error: 'Error fetching postMessaging from database',
                message: error
            });
        }
    }
}

module.exports = MessagingController;