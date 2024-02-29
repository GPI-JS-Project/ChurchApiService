// this section is controller
class AnniversaryController {
    constructor(anniversaryService) {
        this.anniversaryService = anniversaryService;
    }

    async getAnniversary(req, res) {
        try {
            const result = await this.anniversaryService.getAllAnniversaryAsync();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                error: 'Error fetching anniversary from database',
                message: error
            });
        }
    }
}

module.exports = AnniversaryController;