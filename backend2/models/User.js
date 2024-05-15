const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userInfo: {
        username: String,
        nickname: String,
        firstName: String,
        lastName: String,
        position: String,
        nationality: String,
        phoneNumber: String,
        startDate: Date,
    },
    contactInfo: {
        address: String,
        subDistrict: String,
        district: String,
        province: String,
        postalCode: String,
        facebookId: String,
        lineId: String,
        instagram: String,
    },
    educationInfo: [{
        startYear: String,
        schoolName: String,
        educationLevel: String,
    }],
    jobExperienceInfo: [{
        startDate: Date,
        endDate: Date,
        companyName: String,
        role: String
    }],
    skillInfo: [{
        skillName: String,
        rate: Number,
    }],
    interestInfo: [{
        interestName: String,
    }],
    guildInfo: [{
        guildName: String
    }],
    profileImgUrl: String,
    coverImgUrl: String,
    updateAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', UsersSchema)