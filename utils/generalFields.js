export const generalFiled = {
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
    file: joi.object({
 	size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required()
 } )
};