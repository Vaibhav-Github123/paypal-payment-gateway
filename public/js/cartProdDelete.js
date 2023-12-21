const Cart = require('../../model/cart')

// window.RemoveCart = function () {
//     try {
//         debugger
//         const productDel = Cart.destroy({ force: true });
//         if (productDel) {
           
//             window.location.href = "/success-paymet";
//         }
//     } catch (error) {
//         console.error(error);
       
//     }
// };



function RemoveCart(){
    try {
        debugger
        const productDel = Cart.deleteMany({ force: true });
      
        if (productDel) {
            window.location.href = "/success-paymet";
          }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}

RemoveCart()