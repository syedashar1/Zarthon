import mongoose from 'mongoose';


const refundSchema = new mongoose.Schema(
{

        gig : {type : String , required : true} ,
        orderId : {type : String , required : true } ,
        gigOwner : {type : String , required : true } ,
        buyerId : {type : String , required : true} ,
        buyerName : {type : String , required : true} ,
        amount : {type : Number , required: true} ,
        status : {type : String , default : 'pending'} ,
        datePlaced : {type : Date , default : Date.now} ,
        reason : {type : String} ,


} ,
{
        timestamps: true,
}
);


const Refund = mongoose.model('Refunds', refundSchema);
export default Refund;


      