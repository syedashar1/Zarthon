import mongoose from 'mongoose';


const teachSchema = new mongoose.Schema(
{

        by : {type : String , required : true , unique : true} ,
        title : {type : String , required : true} ,
        budget : { type : Number , required : true} , 
        description : {type : String },
        tags : [String] ,
        languages : [String] ,
        negotiate : {type : Boolean , default : false},
        link : {type : String},

        earned : {type : Number} ,
        lastPay : {type : String} ,

        reviews : [{
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


} ,
{
        timestamps: true,
}
);


const Teacher = mongoose.model('Teachers', teachSchema);
export default Teacher;


      