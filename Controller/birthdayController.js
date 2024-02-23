// this section is controller
class BirthdayController {
    constructor(birthdayService) {
        this.birthdayService = birthdayService;
    }

    async getBirthday(req, res) {
        try {
            const result = await this.birthdayService.getAllBirthdayAsync();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                error: 'Error fetching birthday from database',
                message: error
            });
        }
    }
}

module.exports = BirthdayController;