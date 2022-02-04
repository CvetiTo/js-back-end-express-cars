const mongoose = require('mongoose');

require('./Car.js'); //const Car = 
require('./Accessory.js'); 

const connectionString = 'mongodb://localhost:27017/carbicle';

async function init() {
    try{
       await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
        }); 
        console.log('Database connected');

        //await Car.create({
        //    "name": "VW Golf 1.9 TDI 90ps High-Line",
        //    "description": "THE PRICE IS NON-NEGOTIABLE!!! Newly imported, 202 799 km, 90hp diesel. Manual transmission.",
        //    "imageUrl": "wtmgtj4g.jpg",
        //    "price": 2699
        //  });

        mongoose.connection.on('error', (err) =>{
            console.error('Database error');
            console.error('err');
        })
    } catch (err){
        console.error('Error connecting to database');
        process.exit(1);  //exit(0)-app ended sucsessfuly;
    }
}

module.exports = init;