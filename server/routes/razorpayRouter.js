var express = require('express');
var router = express.Router();

const Razorpay = require('razorpay');
const request = require('request');
const keys = require('../keys');

const razorInstance = new Razorpay({
    key_id:keys.razorId,
    key_secret:keys.razorSecretId
})

router.get("/order",(req,res)=>{
    try{
        const options={
            amount : 10*100,
            currency : "INR",
            receipt : "receipt#1",
            payment_capture : 0,
        };
        razorInstance.orders.create(options,async function(err,order){
        if(err){
            return res.status(500).json({
                message:"something error"
            })
        }
        return res.status(200).json(order)
        });
    }
    catch(err){
        return res.status(500).json({
            message: "something is error"
        })
    }
});

router.post("/capture/:paymentId",(req,res)=>{
    try{
        return request(
            {
                method:"POST",
                url : 'https://${keys.razorkeyId}:${keys.razorkeySecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture',
                form:{
                    amount: 10 * 100,
                    currency: "INR"
                },

        },
        async function( err, response,body){
            if(err){
                return res.status(500).json(
                    {
                message: "something is error"
                    }
                )
            }
            return res.status(200).json(body)
        }
        )
    }
    catch(err){
        return res.status(500).json(
            {
                message:"something is error"
            }
        )
    }

})

module.exports = router;
