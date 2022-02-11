const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: [true, 'Listing name is required'],
        match: [/^[\w\s]+^/gm, 'Name can only contain English words, numbers and whitespaces'],
        minlength: [5, 'Car listing must be at least 5 characters long'],
        },
    description: { type: String, default: '', 
        minlength: [20, 'Description must be at least 20 characters long'], 
        match: [/^[\w\s]+^/, 'Description can only contain English words, numbers and whitespaces'] },
    imageUrl: { type: String, default: 'notFound.jpg',
        match: [/^https?:\/\//, 'Image URL must be valid URL'] 
        },
    price: { type: Number, required: true, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    isDeleted: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;