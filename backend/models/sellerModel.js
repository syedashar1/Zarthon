import mongoose from 'mongoose';


const sellerSchema = new mongoose.Schema(
{
        seller : {type : Boolean , default : true} ,

        email: { type:String , required:true , unique : true},

        password:{ type:String , required:true},

        name : { type:String , required : true , unique : true },

        country : { type : String , required : true } ,

        city : { type : String , required : true  } ,
        
        address : { type : String , required : true  } ,

        profilePic : {type: String },

        location : {
                latitude : {type : Number} , 
                longitude : {type : Number}
                
        } ,


        posts : [{
                pic : {type : String} , 
                caption : {type : String} , 
        }] , 


        decants : [
                {
                        name : { type : String } ,
                        size : { type : Number } ,
                        avaliable : { type : Number } ,
                        price : { type : Number } ,
                        status : {type : String , default : "Avaliable"} ,
                        description : { type : String } , 
                        deliveryCharges : { type : Number },
                        pics : [String]
                }
        ] , 


        conversations : [{
                recipients : [String] , 
                messages : [
                        {sender : String  ,
                        text : String }  
                ]
        }] ,


        notification : [{
                type : { type : String } ,
                data : { type : String }
        }]



} ,
{
        timestamps: true,
}
);


const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;

