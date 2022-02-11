const { Schema, model, Types: { ObjectId } } = require('mongoose');

const accesorySchema = new Schema({
    name: { type: String, required: [true, 'Accessory name is required'], 
        //match: [/^[\w\s]+^/gm, 'Name can only contain English words, numbers and whitespaces'],
        minlength: [5, 'Car listing must be at least 5 characters long'] 
        },
    description: { type: String, 
        minlength: [20, 'Description must be at least 20 characters long'], 
        //match: [/^[\w\s]+^/g, 'Description can only contain English words, numbers and whitespaces'] 
        },
    imageUrl: { type: String, default: 'noImage.jpg', 
        match: [/^https?:\/\//, 'Image URL must be valid URL']  
        },
    price: { type: Number, min: 0 },
    owner: { type: ObjectId, ref: 'User' }
});

const Accessory = model('Accessory', accesorySchema);

module.exports = Accessory;