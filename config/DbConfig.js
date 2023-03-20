const mongoose = require('mongoose')

const connectDb = async(url)=>{

    mongoose.set("strictQuery", false);
    try{
        const Database ={dbName:'react'}
        await mongoose.connect(url,Database)
        console.log(Database.dbName +' Database connected successfully');

    }catch(error){
        console.log(error);
    }
}

module.exports = connectDb