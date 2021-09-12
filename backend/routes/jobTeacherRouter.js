import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Certificate from '../models/certificateModel.js';
import Gig from '../models/gigsModel.js';
import Job from '../models/jobModel.js';
import JobTeacher from '../models/jobTeachModel.js';
import Professional from '../models/proModel.js';
import Teacher from '../models/teachModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const jobTeacherRouter = express.Router();


jobTeacherRouter.post( '/postjob' , isAuth ,expressAsyncHandler(async (req, res) => {
    

    const user = await User.findById(req.user._id)
    if( user.connects < 6 ){ res.send('not enough') ; return }
    user.connects = user.connects - 6
    await user.save()

    const newJob = new JobTeacher(req.body);
    const x = await newJob.save();
    res.send(x)
    console.log('created');    

  })
);


jobTeacherRouter.get( '/my-certificate/:id',expressAsyncHandler(async (req, res) => {
  const certs = await Certificate.find({to : req.params.id})
  res.send(certs)
})
);

jobTeacherRouter.get( '/auth-certificate/:id',expressAsyncHandler(async (req, res) => {
  const cert = await Certificate.findById(req.params.id)
  res.send(cert)
})
);


jobTeacherRouter.put( '/submitproposal/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await JobTeacher.findById(req.params.id)
  job.responses.push({
    by : req.user._id ,
    response : req.body.response
  })

  const user = await User.findById(req.user._id)
  if( user.connects < 5 ){ res.send('not enough') ; return }
  user.connects = user.connects - 5
  await user.save()
   
  const pro = await Teacher.findOne({by : req.user._id })
  pro.totalApplied = pro.totalApplied + 1

  await job.save()  
  await pro.save()

  res.send('proposal accepted')


})
);

jobTeacherRouter.put( '/end-payroll/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await JobTeacher.findById(req.params.job)
  job.payRoll = job.payRoll.filter(x =>(x.user !== req.params.person) )
  await job.save()  
  res.send('removed')


})
);


jobTeacherRouter.put( '/payment-gateway/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    
  console.log('entered');
  const job = await JobTeacher.findById(req.params.job)
  
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

   
  const pro = await Teacher.findOne({by : req.params.person })
  pro.earned = pro.earned + Number(req.body.amount)
  pro.lastPay = Date.now()



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





  const sellerUser = await User.findById(pro.by)
  sellerUser.netIncome = sellerUser.netIncome + Number(req.body.amount)
  sellerUser.transactions.push({
    type : 'Pro Earning' , 
    date : Date.now() ,
    detail : `You got paid for your teaching service for job : ${job.title}` ,
    amount : Number(req.body.amount) ,
  })
  await job.save()  
  await pro.save()

  res.send('payment confirmed')
  console.log('payment confirmed');
  }

})
);


jobTeacherRouter.put( '/job-review/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {

  const job = await JobTeacher.findById(req.params.job)
  const pro = await Teacher.findById(req.params.person)
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






jobTeacherRouter.put( '/hire/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await JobTeacher.findById(req.params.job)
  
  if(job.by === req.user._id){
  
  job.hired.push(req.params.person)
  job.payRoll.push({
    user : req.params.person 
  })
  console.log(job.responses.length);
  job.responses = job.responses.filter(x =>(x.by !== req.params.person) )
  console.log(job.responses.length);
   
  const pro = await Teacher.findOne({by : req.params.person })
  pro.appliedSuccess = pro.appliedSuccess + 1
  pro.jobsAt.push(job._id)

  
  await job.save()  
  await pro.save()
  res.send('hired')
  console.log('hired');
  }

})
);


jobTeacherRouter.get( '/singlejobinfo/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
    
  const job = await JobTeacher.findById(req.params.id)
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




jobTeacherRouter.get( '/'  ,expressAsyncHandler(async (req, res) => {
  
  console.log(req.query);

  const title = req.query.title || '';
  const titleFilter = title ? { title: { $regex: title=== "all" ? '' : title , $options: 'i' } } : {};

  var tagsFilter = {};
  if(req.query.tags && req.query.tags != 'all' ){
  const tags = req.query.tags.split(' ') || '';
  var tagsFilter = tags ?  { tags: { $all : tags } }  : {}; 
  }


  const totalJobs = await JobTeacher.count({
    ...titleFilter , 
    ...tagsFilter
  })
  const jobs = await JobTeacher.find({ 
    ...titleFilter , 
    ...tagsFilter})
  
  res.send({jobs , totalJobs })


})
);


jobTeacherRouter.get( '/user/:id' , expressAsyncHandler(async (req, res) => {
    const jobs = await JobTeacher.find({by : req.params.id })
    res.send(jobs)
  })
);


jobTeacherRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
    const job = await JobTeacher.findById(req.params.id)
    res.send(job)
  })
);




export default jobTeacherRouter


