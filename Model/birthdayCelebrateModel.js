// this section is model data / DTO
class BirthdayCelebrateModel {
    constructor(today, tomorrow, yesterday, thisMonth) {
        this.today = today;
        this.tomorrow = tomorrow;
        this.yesterday = yesterday;
        this.thisMonth = thisMonth;
    }
}

module.exports = BirthdayCelebrateModel;