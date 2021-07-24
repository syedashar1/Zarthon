import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser' ;
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRouter.js';
import fragranceRouter from './routes/fragranceRouter.js';
import chatRouter from './routes/chatRouter.js';
import likeCommentRouter from './routes/likeCommentRouter.js';
import postFeedRouter from './routes/postFeedRouter.js';
import professionalRouter from './routes/professionalRouter.js';
import teacherRouter from './routes/teacherRouter.js';
import gigRouter from './routes/gigRouter.js';
import jobRouter from './routes/jobRoutes.js';
import orderRouter from './routes/orderRouter.js';




const app = express();
app.use(bodyParser.json())



mongoose.connect("mongodb+srv://ashar1:ashar1@cluster0.ybb8j.mongodb.net/Zarthon?retryWrites=true&w=majority" , {
        useNewUrlParser : true ,
        useCreateIndex : true ,
        useUnifiedTopology : true } , 
        ()=>{console.log("connected to the DB")}
)



app.use('/api/users', userRouter);
app.use('/api/users', imageRouter);
app.use('/api/fragrance', fragranceRouter);
app.use('/api/chat', chatRouter);
app.use('/api/likecomment', likeCommentRouter);
app.use('/api/newsfeed', postFeedRouter);
app.use('/api/professionals', professionalRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/gigs', gigRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/orders', orderRouter);





const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`serving at port`, port ));
 

