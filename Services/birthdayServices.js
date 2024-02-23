// birthdayService.js
const executeStoredProcedure = require('../Provider/providers');
const BirtdayModel = require('../Model/birthdayModel');

class BirthdayService {

    async getAllBirthdayAsync() {
        try {
            // Call the stored procedure with parameters
            const [results] = await executeStoredProcedure('getChurchCelebrate', 'birthday');
            const birthdayModels = results.map(birthdayData => new BirtdayModel(birthdayData));
            return birthdayModels;
        } catch (error) {
            console.error('Error executing stored procedure:', error);

            throw error;
        }
    }
}

module.exports = BirthdayService;