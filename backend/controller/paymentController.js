const stripe = require("stripe")(process.env.STRIPE_KEY)

const handlePayment = async(req,res)=>{
  const cartItems = req.body.products;
    const lineItems = cartItems?.map((product)=>{
      return{
        price_data:{
          currency:"usd",
          product_data:{
            name:product?.name
          },
          unit_amount:product?.price,
        },
        quantity:product?.quantity
      }
    })
  
    const session = await stripe.checkout.sessions.create({
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:5174/success",
      cancel_url:"http://localhost:5174/cancel"
    })
    res.json({id:session.id})
}
module.exports ={handlePayment}