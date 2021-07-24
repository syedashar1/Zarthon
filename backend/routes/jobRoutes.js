import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Certificate from '../models/certificateModel.js';
import Gig from '../models/gigsModel.js';
import Job from '../models/jobModel.js';
import Professional from '../models/proModel.js';
import Teacher from '../models/teachModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const jobRouter = express.Router();


jobRouter.post( '/postjob' , isAuth ,expressAsyncHandler(async (req, res) => {
    
    const newJob = new Job(req.body);
    const x = await newJob.save();
    res.send(x)
    console.log('created');    

  })
);


jobRouter.get( '/my-certificate/:id',expressAsyncHandler(async (req, res) => {
  const certs = await Certificate.find({to : req.params.id})
  res.send(certs)
})
);

jobRouter.get( '/auth-certificate/:id',expressAsyncHandler(async (req, res) => {
  const cert = await Certificate.findById(req.params.id)
  res.send(cert)
})
);


jobRouter.put( '/submitproposal/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await Job.findById(req.params.id)
  job.responses.push({
    by : req.user._id ,
    response : req.body.response
  })
   
  const pro = await Professional.findOne({by : req.user._id })
  pro.totalApplied = pro.totalApplied + 1

  await job.save()  
  await pro.save()

  res.send('proposal accepted')


})
);

jobRouter.put( '/end-payroll/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await Job.findById(req.params.job)
  job.payRoll = job.payRoll.filter(x =>(x.user !== req.params.person) )
  await job.save()  
  res.send('removed')


})
);


jobRouter.put( '/payment-gateway/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    
  console.log('entered');
  const job = await Job.findById(req.params.job)
  
  if(job.by === req.user._id){
  
  
  for (let i = 0; i < job.payRoll.length; i++) {

    if(job.payRoll[i].user === req.params.person ){

      job.payRoll[i].totalPayed = job.payRoll[i].totalPayed + Number(req.body.amount)
      job.payRoll[i].paymentHistory.push({
          amount : Number(req.body.amount) ,
          paidOn : Date.now()
      })

    }
    
  }

   
  const pro = await Professional.findOne({by : req.params.person })
  pro.earned = pro.earned + Number(req.body.amount)



  if(pro.earned >= 100 ){
  const certificate = await Certificate.findOne({to : req.params.person , type : 'pro' , amount : 100 })
    if(!certificate){
      const newCertificate = new Certificate({
        to : req.params.person ,
        name : req.user.userName ,
        type : 'pro' ,
        pic : '' ,
        amount : 100 ,
        text : 'Congratulations on reaching 100 dollar milestone on Zarthon' ,
        onDate : Date.now()
      })
      await newCertificate.save()
      console.log(newCertificate);
    }
  }


  if(pro.earned >= 1000 ){
    const certificate = await Certificate.findOne({to : req.params.person , type : 'pro' , amount : 1000 })
      if(!certificate){
        const newCertificate = new Certificate({
          to : req.params.person ,
          name : req.user.userName ,
          type : 'pro' ,
          pic : '' ,
          amount : 1000 ,
          text : 'Congratulations on reaching 1000 dollar milestone on Zarthon' ,
          onDate : Date.now()
        })
        await newCertificate.save()
      }
    }

  
    if(pro.earned >= 5000 ){
      const certificate = await Certificate.findOne({to : req.params.person , type : 'pro' , amount : 5000 })
        if(!certificate){
          const newCertificate = new Certificate({
            to : req.params.person ,
            name : req.user.userName ,
            type : 'pro' ,
            pic : '' ,
            amount : 5000 ,
            text : 'Congratulations on reaching 5000 dollar milestone on Zarthon' ,
            onDate : Date.now()
          })
          await newCertificate.save()
        }
    }



    if(pro.earned >= 10000 ){
      const certificate = await Certificate.findOne({to : req.params.person , type : 'pro' , amount : 10000 })
        if(!certificate){
          const newCertificate = new Certificate({
            to : req.params.person ,
            name : req.user.userName ,
            type : 'pro' ,
            pic : '' ,
            amount : 10000 ,
            text : 'Congratulations on reaching 10000 dollar milestone on Zarthon' ,
            onDate : Date.now()
          })
          await newCertificate.save()
        }
    }


    if(pro.earned >= 50000 ){
      const certificate = await Certificate.findOne({to : req.params.person , type : 'pro' , amount : 50000 })
        if(!certificate){
          const newCertificate = new Certificate({
            to : req.params.person ,
            name : req.user.userName ,
            type : 'pro' ,
            pic : '' ,
            amount : 50000 ,
            text : 'Congratulations on reaching 50000 dollar milestone on Zarthon' ,
            onDate : Date.now()
          })
          await newCertificate.save()
        }
    }





  
  await job.save()  
  await pro.save()

  res.send('payment confirmed')
  console.log('payment confirmed');
  }

})
);


jobRouter.put( '/job-review/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {

  const job = await Job.findById(req.params.job)
  const pro = await Professional.findById(req.params.person)
  console.log('here');
  if(job.by !== req.user._id ) {return}


  pro.reviews.push({
    by : req.user._id,
    name : req.user.userName ,
    review : req.body.review ,
    rating : req.body.rating ,
    pic :  req.body.pic ,
    jobTitle : job.title
  })
  await pro.save()
  
  console.log(pro.reviews);
  res.send(job._id)  
})
);






jobRouter.put( '/hire/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await Job.findById(req.params.job)
  
  if(job.by === req.user._id){
  
  job.hired.push(req.params.person)
  job.payRoll.push({
    user : req.params.person 
  })
  console.log(job.responses.length);
  job.responses = job.responses.filter(x =>(x.by !== req.params.person) )
  console.log(job.responses.length);
   
  const pro = await Professional.findOne({by : req.params.person })
  pro.appliedSuccess = pro.appliedSuccess + 1
  pro.jobsAt.push(job._id)

  
  await job.save()  
  await pro.save()
  res.send('hired')
  console.log('hired');
  }

})
);


jobRouter.get( '/singlejobinfo/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
    
  const job = await Job.findById(req.params.id)
  console.log('jere');

  for (let i = 0; i < job.payRoll.length ; i++) {
    if(job.payRoll[i].user === req.user._id ){
      console.log(job.payRoll[i]);
      res.send({
        job : job ,
        myPayRoll : job.payRoll[i]
      })
      return ;
    }
  }
  res.send(null)
  }
)
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



jobRouter.get( '/'  ,expressAsyncHandler(async (req, res) => {
  
  const jobs = await Job.find({ })
  res.send(jobs);
  return;

  console.log(req.query);

  const title = req.query.title || '';
  const titleFilter = title ? { title: { $regex: title=== "all" ? '' : title , $options: 'i' } } : {};

  var tagsFilter = {};
  if(req.query.tags && req.query.tags != 'all' ){
  const tags = req.query.tags.split(' ') || '';
  var tagsFilter = tags ?  { tags: { $all : tags } }  : {}; 
  }


  const delivery = req.query.delivery && Number(req.query.delivery) !==  0 ? Number(req.query.delivery) : 0;
  const deliveryFilter = delivery  ?  {'beginner.delivery' : { $lte: delivery  } } : {};

  
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const minpriceFilter = min  ?  { 'beginner.price' : { $gte: min  } } : {};
  const maxpriceFilter = max  ? {'premium.price' : { $lte: max  } } : {};

  
  const order = req.query.order || '';
  const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

  
  const sortOrder = order === 'rating' ? { finalRating : 1 } : 
                    order === 'mostjobs' ? { jobDone : -1 } : 
                    order === 'new' ?  { _id: -1 } : {_id : 1}



  const country = req.query.country || '';
  const countryFilter = country ? { country: { $regex: country=== "all" ? '' : country , $options: 'i' } } : {};

  const language = req.query.language || '';
  const languageFilter = language ? { languages : { $in: language } } : {};
  

  const pageSize = 9 ;
  const page = Number(req.query.pageNumber) || 1;

  const totalGigs = await Gig.count({

        // ...titleFilter ,
    // ...minpriceFilter ,
    // ...maxpriceFilter ,
    // ...tagsFilter ,
    // ...countryFilter ,
    // ...languageFilter ,
    // ...deliveryFilter

  })


  const gigs = await Gig.find({ 
    // ...titleFilter ,
    // ...minpriceFilter ,
    // ...maxpriceFilter ,
    // ...tagsFilter ,
    // ...countryFilter ,
    // ...languageFilter ,
    // ...deliveryFilter
  }).sort(sortOrder)


  // .skip(pageSize * (page - 1)).limit(pageSize);


  res.send({gigs , totalGigs , page , pages: Math.ceil(totalGigs / pageSize) })





})
);


jobRouter.get( '/user/:id' , expressAsyncHandler(async (req, res) => {
    const jobs = await Job.find({by : req.params.id })
    res.send(jobs)
  })
);


jobRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id)
    res.send(job)
  })
);





jobRouter.post('/postpro' , isAuth , expressAsyncHandler( async (req , res) => {

    const existPro = await Teacher.findOne({by : req.user._id})
    if( existPro ) {
      res.status(401).send({ message: 'pro account already exists' });
      return;
    }

    const newPro = new Teacher(req.body);
    const x = await newPro.save();
    res.send(x)

}))


jobRouter.put('/update-job/:id' , isAuth ,expressAsyncHandler( async (req , res) => {

    const gig = await Job.findById(req.params.id)
    if(gig && gig.by ==req.user._id ){
    
        
        gig.title = req.body.title || gig.title ;
        gig.description = req.body.description || gig.description ;
        gig.tags = req.body.tags || gig.tags ; 
        gig.scale = req.body.scale || gig.scale ; 
        gig.maxBudget = req.body.maxBudget || gig.maxBudget ; 
        gig.minBudget = req.body.minBudget || gig.minBudget ; 
        gig.location = req.body.location || gig.location ; 
        gig.budget = req.body.budget || gig.budget ; 

        await gig.save()
        console.log('job post updated' , gig._id);
        res.send(gig._id)


    }
    else{
      console.log('gig doesnt exist');
    }
    

}))



export default jobRouter