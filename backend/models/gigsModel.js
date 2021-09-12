import mongoose from 'mongoose';


const gigsSchema = new mongoose.Schema(
{

        title : {type : String},
        description : {type : String} , 
        gigPics : [String] ,
        negotiable : {type : Boolean , default: false},
        tags : [String] , 
        by : {type : String} ,

        beginner : {
                title : {type : String} ,
                desc : {type : String} , 
                delivery : {type : Number} ,
                revisions : {type : Number } ,
                offers : [String] ,
                price : {type : Number , default : 0},
        } , 


        standard : {
                title : {type : String} ,
                desc : {type : String} , 
                delivery : {type : Number} ,
                revisions : {type : Number } ,
                offers : [String],
                price : {type : Number},
        } , 


        premium : {
                title : {type : String} ,
                desc : {type : String} , 
                delivery : {type : Number} ,
                revisions : {type : Number } ,
                offers : [String],
                price : {type : Number},
        } , 

        reviews : [{
                by : {type : String},
                name : {type : String} ,
                review : {type : String } ,
                rating : {type : Number} ,
                pic :  {type : String } ,
        }],

        languages : [String] ,

        jobDone : {type : Number , default:0 },
        totalRatings : {type : Number , default : 0} ,
        finalRating : {type : Number , default:0 } ,
        country : {type : String } ,

        earned : {type : Number , default : 0} ,
        orderPlaced : [ String ] 


} ,
{
        timestamps: true,
}
);


const Gig = mongoose.model('Gigsss', gigsSchema);
export default Gig;


      