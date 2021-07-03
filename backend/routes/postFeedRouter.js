import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import NewsFeed from '../models/newsFeedPostsModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const postFeedRouter = express.Router();

//single
postFeedRouter.get( '/getpost/:id/:postid' , expressAsyncHandler(async (req, res) => {
  
  const otherUser = await User.findById(req.params.id);

  var found = false

  if ( otherUser ) {
          
          for(var i = 0 ; i < otherUser.posts.length ; i++ ){
                  
                  if (otherUser.posts[i]._id == req.params.postid ) {
                    console.log('found it !  at' , i );
                    found = true
                    break
                  }
          }

          if (found) {   
                  res.send({_id : otherUser._id , name : otherUser.name , profilePic : otherUser.profilePic , post : otherUser.posts[i] })
          }
          else {
                  res.send(null)
          }

  }
})
);


// router.get('/getsubpost',requireLogin,(req,res)=>{

//         // if postedBy in following
//         Post.find({postedBy:{$in:req.user.following}})
//         .sort('-createdAt')
// })


postFeedRouter.get( '/' , expressAsyncHandler(async (req, res) => {
        
        const pageSize = 5 ;
        const page = Number(req.query.pageNumber) || 1;
        const totalUsers = await NewsFeed.find({}).count()
        if(totalUsers - (pageSize*page) >= 0){
                const users = await NewsFeed.find({}).skip(totalUsers - (pageSize*page) ).limit(pageSize);
                res.send(users.reverse());
        }
        else if(totalUsers - (pageSize*page) > -pageSize){
                const users = await NewsFeed.find({}).limit(totalUsers % pageSize);
                res.send(users.reverse());
        }
        else{
                res.send([])
        }
      })
);



postFeedRouter.get( '/explore' , expressAsyncHandler(async (req, res) => {
        
        const pageSize = 9 ;
        const page = Number(req.query.pageNumber) || 1;

        const allPosts = await User.find({} , 'posts')
        console.log(req.query.pageNumber);
        var Posts = [] 

        for (let i = 0; i < allPosts.length; i++) {
                for (let j = 0; j < allPosts[i].posts.length; j++) {
                        Posts.push( {
                                postID : allPosts[i].posts[j]._id ,
                                pic : allPosts[i].posts[j].pic ,
                                totalLikes : allPosts[i].posts[j].likes.length ,
                                postedBy : allPosts[i]._id ,
                        } )      
                }
        }

        // var Posts = Posts.sort((a, b) => b.totalLikes-a.totalLikes).skip( pageSize*(page-1) ).limit(pageSize);
        Posts.sort((a, b) => b.totalLikes-a.totalLikes)
        res.send(Posts.slice(pageSize*(page-1),pageSize*(page-1)+pageSize))



      })
);




export default postFeedRouter