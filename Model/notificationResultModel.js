// this section is model data / DTO
class NotificationResultModel {
    constructor(data) {
        this.status = data.status;
        this.desc = data.desc;
    }
}

module.exports = NotificationResultModel;