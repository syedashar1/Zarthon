import mongoose from 'mongoose';


const updateModel = new mongoose.Schema(
{
        title : {type : String , required : true },
        desc : {type : String}

} ,
{
        timestamps: true,
}
);


const Update = mongoose.model('Updates', updateModel);
export default Update;


      