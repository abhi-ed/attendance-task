const joi = require ('joi')
const createSchema = (obj) => {
    try {
        let schema = joi.object({
            user_id :joi.number().required(),
            user_name:joi.string().required(),
            attendance_type:joi.string().valid('present','absent').required(),
            attendance_date:joi.date().required()
        })
        let { error, value } = schema.validate(obj);
        return { error, value }
    } catch (e) {
        console.log("Error while validating create schema", e);
    }
}

const readSchema = (obj) => {
    try {
        let schema = joi.object({
            id : joi.number(),
            user_id: joi.number(),
            attendance_date:joi.date()
        })
        let { error, value } = schema.validate(obj);
        return { error, value }
    } catch (e) {
        console.log("Error while validating read schema", e);
    }
}

module.exports = {
    createSchema,readSchema
}