const mongoose = require('mongoose');

const Car = require('./Car.js');

const connectionString = 'mongodb://localhost:27017/carbicle';

async function init() {
    try{
       await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
        }); 
        console.log('Database connected');

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