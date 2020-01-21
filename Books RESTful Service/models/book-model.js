const Joi = require("joi"); // Joi is a class

class BookModel {

    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    static validate(book) {
        const validationSchema = { // Book-מה מותר ומה אסור ב
            id: Joi.number().min(0),
            name: Joi.string().required().min(2).max(50),
            price: Joi.number().required().min(0).max(1000)
        };

        const error = Joi.validate(book, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message); // שלוף רק את ההודעות
        }

        return null; // אין שום שגיאה
    }
}

module.exports = BookModel;