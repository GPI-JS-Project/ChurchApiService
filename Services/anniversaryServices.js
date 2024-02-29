// this section is service that handling service
const executeStoredProcedure = require('../Provider/providers');
const AnniversaryModel = require('../Model/anniversaryModel');

class AnniversaryService {

    async getAllAnniversaryAsync() {
        try {
            // Call the stored procedure with parameters
            const [results] = await executeStoredProcedure('getChurchCelebrate', 'anniversary');
            const anniversaryModels = results.map(data => new AnniversaryModel(data));
            return anniversaryModels;
        } catch (error) {
            console.error('Error executing stored procedure:', error);

            throw error;
        }
    }
}

module.exports = AnniversaryService;