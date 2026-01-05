const calculateOrder = (cart)=>{
    let total = 0;
    let totalDiscount = 0;

    const products = cart.map(item=>{
        const product = item.product;
        
        const finalPrice = Math.floor(product.price -(product.price*product.discount / 100));

        const itemTotal = finalPrice*item.quantity;

        total+=itemTotal;
        totalDiscount +=(product.price - finalPrice) * item.quantity;

        return {
            product:product._id,
            quantity:item.quantity,
        };
    });
    
    return{
        products,total
    };
};


module.exports ={calculateOrder};