// import mongoose from "mongoose";

// export const connectDB = async ()=>{
//     await mongoose.connect('mongodb+srv://prabhatyadav98311:Iiiaspy42@cluster0.qynf7.mongodb.net/FoodFlyer').then(()=>console.log("\nDatabase Connected Successfully..!"));
// }


import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://prabhatyadav98311:Iiiaspy42@cluster0.qynf7.mongodb.net/FoodFlyer', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("\nDatabase Connected Successfully..!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure code
  }
};
