const { Schema, model } = require('mongoose');

const accesorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'notFound.jpg' },
    price: { type: Number, min: 0 }
});

const Accessory = model('Accessory', accesorySchema);

module.exports = Accessory;