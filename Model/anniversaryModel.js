// this section is model data / DTO
class AnniversaryModel {
    constructor(data) {
        this.husbandID = data.husbandID;
        this.wifeID = data.wifeID;
        this.husband = data.husband;
        this.wife = data.wife;
        this.husbandPhotoUrl = data.husbandPhotoUrl;
        this.wifePhotoUrl = data.wifePhotoUrl;
        this.date = data.date;
        this.due = data.due;
    }
}

module.exports = AnniversaryModel;