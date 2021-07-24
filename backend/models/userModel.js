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


        favouriteNotes : [String] ,


        sotd : {
                scent : {type : String} ,
                about : {type : String} ,
        } ,

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


} ,
{
        timestamps: true,
}
);


const User = mongoose.model('User', userSchema);
export default User;

