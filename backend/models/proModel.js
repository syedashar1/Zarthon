import mongoose from 'mongoose';


const proSchema = new mongoose.Schema(
{

        by : {type : String , required : true , unique : true} ,
        title : {type : String , required : true} ,
        budget : { type : Number , required : true} , 
        description : {type : String },
        tags : [String] ,
        languages : [String] ,
        negotiate : {type : Boolean , default : false},
        link : {type : String},
        country : {type : String} ,

        earned : {type : Number , default : 0} ,
        lastPay : {type : Date} ,

        reviews : [{
            
            jobTitle : {type : String} ,
            by : {type : String},
            name : {type : String} ,
            review : {type : String } ,
            rating : {type : Number} ,
            pic :  {type : String } ,
        }],

        avaliableHours : {type : Number , default : 0 },

        portfolio : {type : String} ,

        totalApplied : {type : Number , default : 0},
        appliedSuccess : {type : Number , default : 0},

        videos : [{
                title : {type : String },
                video : {type : String},
                description : {type : String},
        }] ,

        jobsAt : [String]


} ,
{
        timestamps: true,
}
);


const Professional = mongoose.model('Professionals', proSchema);
export default Professional;


      