const Joi = require("joi"); // Joi is a class

class AppModel {

    constructor(id,code, name, manufacturer,price, weight) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
        this.weight = weight;
    }

    static validate(app) {
        const validationSchema = { // Book-מה מותר ומה אסור ב
            id: Joi.number().min(0),
            code:Joi.number().min(0),
            name: Joi.string().min(2).max(50),
            manufacturer: Joi.string().required().min(3).max(100),
            price: Joi.number().required().min(0).max(10000),
            code:Joi.number().min(0),
            weight:Joi.number().min(0)
        };

        const error = Joi.validate(app, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message); // שלוף רק את ההודעות
        }

        return null; // אין שום שגיאה
    }
}

module.exports = AppModel;