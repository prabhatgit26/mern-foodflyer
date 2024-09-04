import mongoose from 'mongoose';

// Define the schema
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },         // Use `type` instead of `Types`
    description: { type: String, required: true },  // Use `type` instead of `Types`
    price: { type: Number, required: true },        // Use `type` instead of `Types`
    image: { type: String, required: true },        // Use `type` instead of `Types`
    category: { type: String, required: true }      // Use `type` instead of `Types`
});

// Create the model
const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

export default foodModel;
