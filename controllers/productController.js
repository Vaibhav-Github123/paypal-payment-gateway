const Product = require("../model/product");
const Cart = require("../model/cart");
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVxr6-4s5mWllfZIq3kQ_3uBX0eVCBzTMxLlOFEPt-C_rm1NK38cpfUQMz-PQv8nRKUX-kReKXr4Nzg2',
  'client_secret': 'EPpgj2S755MVISWBjrAHRVYDUctHCnsY2hNEW9-8E-YM73XbJhKCk1JaWz_ydh7OrqDNIs-CMS71Cpf1'
});

exports.AddProduct = async (req, res) => {
    try {
        const {product_name, price, category} = req.body
       const data = new Product({
        product_name: product_name,
            price: price,
            category: category,
        });
        await data.save()
        res.send(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
};

exports.productPage = async (req, res) => {
    try {
        const product = await Product.findAll()
        res.render('product',{products: product})
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
};

exports.AddToCart = async (req, res) => {
    try {
        const {product_name, price, category, product_quantity} = req.body
       const product = new Cart({
        product_name: product_name,
            price: price,
            category: category,
            product_quantity: product_quantity,
        });
        await product.save()
        res.send({
            status: true,
            data: product,
            message: "Product has been successfully added to the cart.",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}

exports.getCartPage = async (req,res) =>{
    try {
        const cartproduct = await Cart.findAll()
        res.render('cart',{
            carts: cartproduct
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}

exports.deleteProd = async (req, res) =>{ 
    try {
        const id = req.params.id;

    const productDel = await Cart.destroy({ where: { id },force: true });
    if (productDel) {
      res.redirect("/cartpage");
    }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}



exports.payment = async (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:9000/success",
          "cancel_url": "http://localhost:9000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "rocetery shop",
                  "sku": "001",
                  "price": "50.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "50.00"
          },
          "description": "new rocetery bar shop"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
};

exports.success = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "50.00"
        }
    }]
  };

 // Obtains the transaction details from paypal
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
  });
};