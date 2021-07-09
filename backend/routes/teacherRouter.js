import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Professional from '../models/proModel.js';
import Teacher from '../models/teachModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const teacherRouter = express.Router();


teacherRouter.get( '/' , expressAsyncHandler(async (req, res) => {
        
    const pros = await Teacher.find({})
    res.send(pros)

  })
);


teacherRouter.get( '/user' , isAuth , expressAsyncHandler(async (req, res) => {
        
    const pro = await Teacher.findOne({by : req.user._id })
    res.send(pro)

  })
);


teacherRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
        
    const pro = await Teacher.findById(req.params.id)
    res.send(pro)
    console.log(pro);

  })
);





teacherRouter.post('/postpro' , isAuth , expressAsyncHandler( async (req , res) => {

    const existPro = await Teacher.findOne({by : req.user._id})
    if( existPro ) {
      res.status(401).send({ message: 'pro account already exists' });
      return;
    }

    const newPro = new Teacher(req.body);
    const x = await newPro.save();
    res.send(x)

}))


teacherRouter.put('/editpro' , isAuth ,expressAsyncHandler( async (req , res) => {


    console.log(req.body);
    const pro = await Teacher.findOne({by : req.user._id })
    if(pro){
      pro.portfolio = req.body.portfolio || pro.portfolio  ;
      pro.negotiate = req.body.negotiate  ;
      pro.title = req.body.title || pro.title  ;
      pro.budget = req.body.budget || pro.budget  ;
      pro.avaliable = req.body.avaliable || pro.avaliable  ;
      pro.description = req.body.description || pro.description  ;
      pro.tags = req.body.tags || pro.tags  ;
      pro.languages = req.body.languages || pro.languages  ;
      pro.videos = req.body.videos || pro.videos  ;

    await pro.save()
    res.send(pro)
    }
    else{
      console.log('pro doesnt exist');
    }
    

}))



export default teacherRouter