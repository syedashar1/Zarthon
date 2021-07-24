import mongoose from 'mongoose';


const certificateSchema = new mongoose.Schema(
{

        to : {type : String } ,
        name : {type : String} ,
        type : {type : String} ,
        pic : {type : String} ,
        amount : {type : Number } ,
        text : {type : String } ,
        onDate : {type : Date , default : Date.now }


} ,
{
        timestamps: true,
}
);


const Certificate = mongoose.model('Certificates', certificateSchema);
export default Certificate;


      