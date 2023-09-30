import mongoose from "mongoose";

mongoose.set('strictQuery',true)

const ConnectDb = async() =>{
    try{
        const conn = await mongoose.connect(process.env.DATA_BASE,{
            useUnifiedTopology: true ,
            useNewUrlParser: true ,
        })
        console.log(`Db is connected`.blue.underline.bold)
    }
    catch(err){
        console.log(err)
    }
}
export default ConnectDb
