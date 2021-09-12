import mongoose from 'mongoose';


const withdrawSchema = new mongoose.Schema(
{

        amount : {type : Number , required : true} ,
        requestDate : {type : Date , default : Date.now} ,
        by : {type : String , required : true} ,

        typeOfWithdrawal : {type : String , required:true},
        paypalEmail : {type : String} ,
        name : {type : String , required : true } ,
        iban : {type : String  } ,

        status : {type : String , default : 'pending'} ,


} ,
{
        timestamps: true,
}
);


const Withdraw = mongoose.model('Withdraw', withdrawSchema);
export default Withdraw;


      