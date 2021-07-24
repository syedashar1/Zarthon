import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './screens/Home';
import RegisterScreen from './screens/RegisterScreen';
import signInScreen from './screens/signIn.Screen';
import Navbar from './components/Navbar'
import SellerRegister from './screens/SellerRegister';
import userProfileScreen from './screens/userProfileScreen';
import NewsFeedScreen from './screens/NewsFeedScreen';
import ChatApp from './chat/components/ChatApp'
import ProWorkUpdate from './screens/ProWorkUpdate';
import NotitificationScreen from './screens/NotitificationScreen';
import UserProfile from './screens/userProfile';
import ExploreScreen from './screens/ExploreScreen';
import ResetScreen from './screens/ResetScreen';
import AboutScreen from './screens/AboutScreen';
import joinAsProScreen from './screens/joinAsProScreen';
import ProPDFScreen from './screens/ProPDFScreen';
import ExplorePro from './screens/ExplorePro';
import ProWorkScreen from './screens/ProWorkScreen';
import joinAsTeacherScreen from './screens/joinAsTeacherScreen';
import TeachWorkUpdate from './screens/TeachWorkUpdate';
import TeachWorkScreen from './screens/TeachWorkScreen';
import ExploreTeach from './screens/ExploreTeach';
import TeachPDFScreen from './screens/TeachPDFScreen';
import GigUpdateScreen from './screens/GigUpdateScreen';
import adminUpdate from './screens/adminUpdate';
import UpdatesScreen from './screens/UpdatesScreen';
import ExploreGigs from './screens/ExploreGigs';
import GigScreen from './screens/GigScreen';
import Dashboard from './chat/components/Dashboard';
import DashboardScreen from './screens/DashboardScreen';
import ProVideo from './screens/ProVideo';
import PostAJobScreen from './screens/PostAJobScreen';
import JobScreen from './screens/JobScreen';
import UpdateJobScreen from './screens/UpdateJobScreen';
import ExploreJobs from './screens/ExploreJobs';
import ProPayment from './screens/ProPayment';
import GigPayment from './screens/GigPayment';
import CertificateScreen from './screens/CertificateScreen';
import GigOrdersPlaced from './screens/GigOrdersPlaced';
import GigOrdersScreen from './screens/GigOrdersScreen';
import SingleGigOrderScreen from './screens/SingleGigOrderScreen';
import JobReviewScreen from './screens/JobReviewScreen';
import MyJobsScreen from './screens/MyJobsScreen';





class App extends React.Component {


  render(){


    return (

      <BrowserRouter>
        <div className="App">

            <Navbar/>
            
            
            <main>
                <Route path="/register" component={RegisterScreen} exact></Route>
                <Route path="/registerSeller" component={SellerRegister} exact></Route>
                <Route path="/signin" component={signInScreen} exact></Route>
                <Route path="/profile" component={UserProfile} exact></Route>
                <Route path="/notifications" component={NotitificationScreen} exact></Route>
                <Route path="/explore" component={ExploreScreen} exact></Route>
                <Route path="/" component={Home} exact></Route>
                <Route path="/user/:id" component={UserProfile} exact></Route>
                <Route path="/chat" component={ChatApp}></Route>
                <Route path="/reset/:token" component={ResetScreen}></Route>
                <Route path="/about" component={AboutScreen}></Route>
                <Route path="/certificates" component={CertificateScreen}></Route>
                
                <Route path="/joinAsProWorker" exact component={joinAsProScreen}></Route>
                <Route path="/joinAsProWorker-portfolio" exact component={ProPDFScreen}></Route>
                <Route path="/proworker/:id" exact component={ProWorkScreen}></Route>
                <Route path="/proworker-update/:id" exact component={ProWorkUpdate}></Route>
                <Route path="/explore-pro" exact component={ExplorePro}></Route>
                <Route path="/joinAsProWorker-videos" exact component={ProVideo}></Route>
                <Route path="/payment/:job/:user/:type" exact component={ProPayment}></Route>
                <Route path="/explore-pro/title/:title/tags/:tags/min/:min/max/:max/successRatio/:successRatio/earned/:earned/country/:country/language/:language/sort/:sort/pageNumber/:pageNumber" exact component={ExplorePro}></Route>
                <Route path="/job-review/:job/:person" exact component={JobReviewScreen}></Route>
                <Route path="/my-jobs" exact component={MyJobsScreen}></Route>

                

                <Route path="/joinAsTeacher" exact component={joinAsTeacherScreen}></Route>
                <Route path="/joinAsTeacher-portfolio" exact component={TeachPDFScreen}></Route>
                <Route path="/teacher/:id" exact component={TeachWorkScreen}></Route>
                <Route path="/teacher-update/:id" exact component={TeachWorkUpdate}></Route>
                <Route path="/explore-teacher" exact component={ExploreTeach}></Route>
                <Route path="/explore-teacher/title/:title/tags/:tags/min/:min/max/:max/successRatio/:successRatio/earned/:earned/country/:country/language/:language/sort/:sort/pageNumber/:pageNumber" exact component={ExploreTeach}></Route>


                <Route path="/postAJob" exact component={PostAJobScreen}></Route>
                <Route path="/job/:id" exact component={JobScreen}></Route>
                <Route path="/job-update/:id" exact component={UpdateJobScreen}></Route>
                <Route path="/explore-jobs" exact component={ExploreJobs}></Route>



                <Route path="/edit-gig/:id" exact component={GigUpdateScreen}></Route>
                <Route path="/explore-gigs" exact component={ExploreGigs}></Route>
                <Route path="/gigs/:id" component={GigScreen}></Route>
                <Route path='/explore-gig/title/:title/tags/:tags/min/:min/max/:max/delivery/:delivery/country/:country/language/:language/sort/:sort/pageNumber/:pageNumber' exact component={ExploreGigs}></Route>
                <Route path="/gig-payment-gateway/:id/:offer" component={GigPayment}></Route>

                <Route path="/gig-orders" component={GigOrdersScreen}></Route>
                <Route path="/gig-orders-placed" component={GigOrdersPlaced}></Route>
                <Route path="/gig-order/:id" component={SingleGigOrderScreen}></Route>


                <Route path="/admin-updates" exact component={adminUpdate}></Route>
                <Route path="/updates" exact component={UpdatesScreen}></Route>
                <Route path="/dashboard" exact component={DashboardScreen}></Route>

                
                 

                

            </main>
            {/* <footer style={{backgroundColor :' #023246' ,color:'#f6f6f6'}} className="row center">All right reserved</footer> */}
        </div>
        </BrowserRouter>






    );

  }


}


export default App;
