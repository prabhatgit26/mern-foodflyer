import userModel from '../models/userModel.js';

// add items to user cart
const addToCart = async (req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Item Added To Cart."})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error ! Item Not Added To Cart"})
        
    }
}


// remove items from user cart
const removeFromCart = async (req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Item Removed From Cart Successfully."})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error !Item didn't Remove From Cart"})
    }
}


// fetch user cart data
const getCart = async (req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error ! Fetching Cart Items."});
    }
}


export { addToCart, removeFromCart, getCart };