// this section is model data / DTO
class MessageModel {
    constructor(data) {
        this.status = data.status;
        this.desc = data.desc;
    }
}

module.exports = MessageModel;