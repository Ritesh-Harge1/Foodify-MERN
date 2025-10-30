import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://hargeritesh_db_user:Vq80vcPOaJBiUj1X@cluster0.sg3cd1j.mongodb.net/test').then(()=>{
       console.log('DB connected') ;
    })
}