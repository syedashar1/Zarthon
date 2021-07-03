import mongoose from 'mongoose';


const newsFeedSchema = new mongoose.Schema(
{

        postedBy : { type : String} ,
        postId : { type : String} ,

}
);


const NewsFeed = mongoose.model('NewsFeed', newsFeedSchema);
export default NewsFeed;


      