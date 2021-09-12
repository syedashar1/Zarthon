import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
{
        name : { type : String } ,

        email: { type:String , required:true , unique : true},


        password:{ type:String , required:true},

        resetToken:String,
        expireToken:Date,

        age : {type : Number } ,

        country : { type : String  } ,

        city : { type : String } ,
        
        bio : { type : String } ,

        profilePic : {type: String , default : 'https://cdn130.picsart.com/318381621277201.jpg?type=webp&to=min&r=640'},

        location : {
                latitude : {type : Number} , 
                longitude : {type : Number}
                
        } ,

        ratingsTo : [{
                product : {type: String},
                reviews : {type : String},
                rating : {type : String},
        }] ,



        posts : [{
                pic : {type : String} , 
                caption : {type : String} , 
                likes : [String] , 
                createdAt  : { type : Date, default: Date.now } ,


                comments : [{
                        id : {type : String} ,
                        comment : {type : String} ,
                }] ,

                showComments : {type:Boolean , default:true}

        }] ,
        
        
        savedPosts : [{
                postedBy : { type : String} ,
                postId : { type : String} ,
        }] ,






        forChat : [String] ,

        newMessages:[String] ,
        
        conversations : [{
                recipients : [String] , 
                messages : [
                        {sender : String ,
                        text : String }  
                ]
        }], 
        
        newNotifications : {type : Number , default : 0} ,

        notification : [{
                type : {type : String} ,
                byName : {type : String} ,
                text : {type : String} ,
                link : {type : String } ,
        }],


        userName:{type : String , unique:true ,required:true} ,
        proAccount :{type :Boolean , default : false},
        teachAccount :{type :Boolean , default : false},


        active : {type : Boolean , default : false} ,
        lastSeen  : { type : Date, default: Date.now } ,

        connects : {type : Number , default : 0 } ,


        proFav : [String] ,
        gigFav : [String] ,

        netIncome : {type : Number , default : 0} ,
        withdrawn : {type : Number , default : 0} ,
        usedForPurchases : {type : Number , default : 0} ,
        pendingClearance : {type : Number , default : 0} ,
        avaliableForWithdrawal : {type : Number , default : 0} ,

        transactions : [{
                type : {type : String} , 
                date : { type : Date , default: Date.now} ,
                detail : {type : String} ,
                amount : {type : Number},
        }]



} ,
{
        timestamps: true,
}
);


const User = mongoose.model('User', userSchema);
export default User;

