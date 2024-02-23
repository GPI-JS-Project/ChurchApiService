// birthdayModel.js
class BirthdayModel {
    constructor(data) {
        this.churchID = data.churchID;
        this.name = data.name;
        this.date = data.date;
        this.sex = data.sex;
        this.phone = data.phone;
        this.whatsapp = data.whatsapp;
        this.email = data.email;
        this.type = data.type;
        this.due = data.due;
    }
}

module.exports = BirthdayModel;