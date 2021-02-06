import mongoose from 'mongoose';
import chalk from 'chalk';

function initDB(){
    if(mongoose.connections[0].readyState)
    {
        console.log(chalk.green("alerady connected to a database"));
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
        // useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useFindAndModify:true
    })
    mongoose.connection.on("conneted",()=>{
        console.log(chalk.bgGreen("Mongodb to connect"))
    })
    mongoose.connection.on("error",(error)=>{
        console.log(chalk.bgRed("Error",error));
    })
}

export default initDB;