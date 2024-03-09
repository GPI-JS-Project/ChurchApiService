// this section is controller
class MessagingController {
    constructor(messagingService) {
        this.messagingService = messagingService;
    }

    async postMessaging(req, res) {
        try {
            const model = req.body;
            const result = await this.messagingService.messagingServiceAsync(model);
            res.json(result);
        } catch (error) {
            req.json({
                error: 'Error fetching anniversary from database',
                message: error
            });
        }
    }
}

module.exports = MessagingController;