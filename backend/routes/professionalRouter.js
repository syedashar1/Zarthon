import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Professional from '../models/proModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const professionalRouter = express.Router();


professionalRouter.get( '/' , expressAsyncHandler(async (req, res) => {
        
    // const pros = await Professional.find({})
    // res.send(pros)

  console.log(req.query);

  const title = req.query.title || '';
  const titleFilter = title ? { title: { $regex: title=== "all" ? '' : title , $options: 'i' } } : {};

  var tagsFilter = {};
  if(req.query.tags && req.query.tags != 'all' ){
  const tags = req.query.tags.split(' ') || '';
  var tagsFilter = tags ?  { tags: { $all : tags } }  : {}; 
  }


  
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const successRatio = req.query.successRatio && Number(req.query.successRatio) !== 0 ? Number(req.query.successRatio) : 0;
  const earned = req.query.earned && Number(req.query.earned) !== 0 ? Number(req.query.earned) : 0;
  
  const earnedFilter = earned  ?  { earned : { $gte: earned  } } : {};
  const successRatioFilter = successRatio  ?  { appliedSuccess : { $gte: successRatio  } } : {};
  const minpriceFilter = min  ?  { budget : { $gte: min  } } : {};
  const maxpriceFilter = max  ? { budget : { $lte: max  } } : {};

  
  const order = req.query.order || '';
  const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

  
  const sortOrder = order === 'rating' ? { finalRating : 1 } : 
                    order === 'mostjobs' ? { jobDone : -1 } : 
                    order === 'new' ?  { _id: -1 } : {_id : 1}



  const country = req.query.country || '';

  const countryFilter = country ? { country: { $regex: country=== "all" ? '' : country , $options: 'i' } } : {};

  const language = req.query.language || '';
  const languageFilter = language && language !== 'all' ? { languages : { $in: language } } : {};
  console.log(languageFilter);
  console.log(tagsFilter);

  const pageSize = 9 ;
  const page = Number(req.query.pageNumber) || 1;

  const totalPros = await Professional.count({

    ...titleFilter ,
    ...minpriceFilter ,
    ...maxpriceFilter ,
    ...tagsFilter ,
    // ...countryFilter ,
    ...languageFilter ,
    ...earnedFilter ,

  })


  const pros = await Professional.find({ 
    ...titleFilter ,
    ...minpriceFilter ,
    ...maxpriceFilter ,
    ...tagsFilter ,
    // ...countryFilter ,
    ...languageFilter ,
    ...earnedFilter ,

  }).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);


  res.send({pros , totalPros, page , pages: Math.ceil(totalPros / pageSize) })
  

  })
);


professionalRouter.get( '/user/:id'  , expressAsyncHandler(async (req, res) => {
        
    const pro = await Professional.findOne({by : req.params.id })
    res.send(pro)

  })
);


professionalRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
        
    const pro = await Professional.findById(req.params.id)
    res.send(pro)
    console.log(req.params.id);

  })
);





professionalRouter.post('/postpro' , isAuth , expressAsyncHandler( async (req , res) => {

    const existPro = await Professional.findOne({by : req.user._id})
    if( existPro ) {
      res.status(401).send({ message: 'pro account already exists' });
      return;
    }

    const newPro = new Professional(req.body);
    const x = await newPro.save();
    res.send(x)

}))


professionalRouter.put('/editpro' , isAuth ,expressAsyncHandler( async (req , res) => {


    console.log(req.body);
    const pro = await Professional.findOne({by : req.user._id })
    if(pro){
    pro.portfolio = req.body.portfolio || pro.portfolio  ;
    pro.negotiate = req.body.negotiate   ;
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



export default professionalRouter