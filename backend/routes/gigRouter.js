import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gig from '../models/gigsModel.js';
import Professional from '../models/proModel.js';
import Teacher from '../models/teachModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const gigRouter = express.Router();


gigRouter.post( '/create' , isAuth ,expressAsyncHandler(async (req, res) => {
    
    console.log('creating new gig');
    const newGig = new Gig( );
    newGig.by = req.user._id ;
    const x = await newGig.save();
    res.send(x._id)
    console.log('created');    

  })
);





// gigRouter.get( '/delete/:id'  ,expressAsyncHandler(async (req, res) => {
    
// const deletedProduct = await Gig.findById(req.params.id);
//   if (deletedProduct) {
//     await deletedProduct.remove();
//     res.send({ message: 'Product Deleted' });
//   } else {
//     res.send('Error in Deletion.');
//   }  

// })
// );



gigRouter.post( '/suggestion' ,expressAsyncHandler(async (req, res) => {
    
  // const gigs = await User.find({  'tags': { $in: req.body.tags } } , '_id name profilePic email' );
  const gigs = await Gig.find({ });
  res.send(gigs)


})
);




gigRouter.get( '/'  ,expressAsyncHandler(async (req, res) => {
  const gigs = await Gig.find({ })
  res.send(gigs)

})
);


gigRouter.get( '/user/:id' , expressAsyncHandler(async (req, res) => {
    const gigs = await Gig.find({by : req.params.id })
    console.log(req.params.id);
    res.send(gigs)
  })
);


gigRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
    const gig = await Gig.findById(req.params.id)
    res.send(gig)
  })
);





gigRouter.post('/postpro' , isAuth , expressAsyncHandler( async (req , res) => {

    const existPro = await Teacher.findOne({by : req.user._id})
    if( existPro ) {
      res.status(401).send({ message: 'pro account already exists' });
      return;
    }

    const newPro = new Teacher(req.body);
    const x = await newPro.save();
    res.send(x)

}))


gigRouter.put('/update-gig/:id' , isAuth ,expressAsyncHandler( async (req , res) => {

    const gig = await Gig.findById(req.params.id)
    if(gig){
    
        
        gig.title = req.body.title || gig.title ;
        gig.description = req.body.description || gig.description ;
        gig.gigPics = req.body.gigPics || gig.gigPics ;
        gig.negotiable = req.body.negotiable || gig.negotiable ;
        gig.tags = req.body.tags || gig.tags ; 

        gig.beginner = req.body.beginner || gig.beginner ; 
        gig.standard = req.body.standard || gig.standard ; 
        gig.premium = req.body.premium || gig.premium ;

        await gig.save()
        console.log('gig updated' , gig._id);
        res.send(gig._id)


    }
    else{
      console.log('pro doesnt exist');
    }
    

}))



export default gigRouter