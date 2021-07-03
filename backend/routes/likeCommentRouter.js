import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';
import NewsFeed from '../models/newsFeedPostsModel.js';


const likeCommentRouter = express.Router();



likeCommentRouter.put( '/like/:id/:postid', isAuth , expressAsyncHandler(async (req, res) => {
          
        // const user = await User.findById(req.user._id);

        const otherUser = await User.findById(req.params.id);

        var found = false
        

        if ( otherUser ) {

                console.log('here');
                
                for(var i = 0 ; i < otherUser.posts.length ; i++ ){
                        
                        if (otherUser.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                      }

                if (found) {
                        
                        if( otherUser.posts[i].likes.indexOf(req.user._id) == -1 ){

                                otherUser.posts[i].likes.push(req.user._id)
                                console.log(otherUser.posts[i].likes);


                                //means add to otherUser's notification
                                
                                if(req.user._id != req.params.id){

                                        otherUser.notification.push({
                                                type : 'like' ,
                                                by : req.user._id ,
                                                post : req.params.postid ,
                                        })
                                        otherUser.newNotifications = otherUser.newNotifications + 1
                                }



                        }
                        else{

                                otherUser.posts[i].likes = otherUser.posts[i].likes.filter(e=>e != req.user._id )
                                

                                otherUser.notification = otherUser.notification.filter(x => 
                                        x.by != req.user._id || 
                                        x.post != req.params.postid || 
                                        x.type != 'like'
                                        
                                )
                                console.log(req.user._id);
                                console.log(req.params.postid);
                                console.log(otherUser.notification);




                        }

                        await otherUser.save()
                        res.send({message : 'liked'})

                }

          }
        
      
}))





likeCommentRouter.put( '/notificationreset' , isAuth  , expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        user.newNotifications = 0 ;
        await user.save()
        res.send('notification reseted')

}))







likeCommentRouter.get( '/getlikes/:id/:postid' , expressAsyncHandler(async (req, res) => {
          

        const otherUser = await User.findById(req.params.id);

        var found = false
        console.log('here');

        if ( otherUser ) {

                
                
                for(var i = 0 ; i < otherUser.posts.length ; i++ ){
                        
                        if (otherUser.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                }

                if (found) {   
                        const users = await User.find({  '_id': { $in: otherUser.posts[i].likes} } , ' _id name profilePic ' );
                        res.send(users)
                }
                else {
                        res.status(401).send({message : 'post not found'})
                }

        }
        
      
}))








likeCommentRouter.put( '/comment/:id/:postid', isAuth , expressAsyncHandler(async (req, res) => {
          

        const otherUser = await User.findById(req.params.id);

        var found = false
        

        if ( otherUser ) {

                console.log('here');
                
                for(var i = 0 ; i < otherUser.posts.length ; i++ ){
                        
                        if (otherUser.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                }

                if (found){
                        otherUser.posts[i].comments.push({id:req.user._id , comment: req.body.comment})
                        console.log('commented');


                        if(req.user._id != req.params.id){
                                
                                otherUser.notification.push({
                                        type : 'comment' ,
                                        by : req.user._id ,
                                        post : req.params.postid ,
                                        comment : req.body.comment ,
                                })
                                otherUser.newNotifications = otherUser.newNotifications + 1
                        }


                        await otherUser.save()
                        res.send({message : 'commented'})
                }
                

          }
        
      
}))






likeCommentRouter.put( '/savepost/:id/:postid', isAuth , expressAsyncHandler(async (req, res) => {
          
        const user = await User.findById(req.user._id);

        var found = false
        
        if ( user ) {
                

                for(var i = 0 ; i < user.savedPosts.length ; i++ ){
                        
                        if (user.savedPosts[i].postId == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                }


                if(found){ 

                        user.savedPosts = user.savedPosts.filter(x => 
                                x.postedBy != req.params.id || x.postId != req.params.postid  
                        )

                }

                else {
                        user.savedPosts.push({
                                postedBy : req.params.id ,
                                postId : req.params.postid ,
                        })
                }


                await user.save()
                res.send({message : 'saved'})
          }
        
      
}))








likeCommentRouter.put( '/editcaption/:id/:postid', isAuth , expressAsyncHandler(async (req, res) => {
          

        const user = await User.findById(req.params.id);

        var found = false
        

        if ( user ) {
                for(var i = 0 ; i < user.posts.length ; i++ ){
                        
                        if (user.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                      }

                if (found) {
                        
                        user.posts[i].caption = req.body.caption

                        await user.save()
                        console.log('edited caption');
                        res.send({message : 'edited caption'})

                }

          }
        
      
}))






// const deletedProduct = await Product.findById(req.params.id);
//   if (deletedProduct) {
//     await deletedProduct.remove();
//     res.send({ message: 'Product Deleted' });
//   } else {
//     res.send('Error in Deletion.');
//   }



likeCommentRouter.put( '/delete/:id/:postid', isAuth , expressAsyncHandler(async (req, res) => {
          

        const user = await User.findById(req.params.id);

        var found = false
        

        if ( user ) {
                for(var i = 0 ; i < user.posts.length ; i++ ){
                        
                        if (user.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                      }

                if (found) {
                        
                        user.posts.splice(i,1)
                        user.notification = user.notification.filter(x =>  x.post != req.params.postid)
                        await user.save()

                        

                        // const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        // .deleteOne({ name: nameOfListing });

                        const deletedPost = await NewsFeed.deleteOne({ postId : req.params.postid });;
                        console.log(deletedPost);


                }

          }
        
      
}))








likeCommentRouter.put( '/showcomments/:postid', isAuth , expressAsyncHandler(async (req, res) => {
          
        const user = await User.findById(req.user._id);

        var found = false
        
        if ( user ) {
                for(var i = 0 ; i < user.posts.length ; i++ ){
                        
                        if (user.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                }

                if(found){
                        
                if(user.posts[i].showComments){ 

                        user.posts[i].showComments = false

                }

                else {
                        user.posts[i].showComments = true
                }
                await user.save()
                console.log({message : 'changed Show comments'});
                res.send({message : 'changed Show comments'})


                }



          }
        
      
}))




export default likeCommentRouter