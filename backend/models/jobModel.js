import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema(
{
        by : {type : String},
        title : {type : String},
        description : {type : String} , 
        tags :[String] ,
        scale : {type : String} ,
        maxBudget : {type : Number } ,
        minBudget : {type : Number}  ,
        type : {type : String , default : 'hourly' }  ,
        location : {type : String , default : 'all' } ,
        budget : {type : Number}  ,
        status : {type : String , default : 'hiring' } ,
        // hiring , nothiring , completed


        responses : [{
                by : {type : String} ,
                response : {type : String}
        }] ,

        hired : [String] ,


        payRoll : [{
                user : {type:String} ,
                totalPayed : {type : Number  , default : 0 } ,
                paymentHistory : [{
                        amount : {type : Number , default : 0 } ,
                        paidOn : {type : Date , default: Date.now }
                }]
        }]



} ,
{
        timestamps: true,
}
);


const Job = mongoose.model('Jobs', jobSchema);
export default Job;


      