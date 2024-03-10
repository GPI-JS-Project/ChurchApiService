// this section is model data / DTO
class NotificationModel {
    constructor(data) {
        this.id = data.id;
        this.token = data.token;
        this.ip = data.ip;
        this.location = data.location;
        this.device = data.device;
        this.status = data.status;
        this.createdDate = data.createdDate;
        this.updatedDate = data.updatedDate;
    }
}

module.exports = NotificationModel;