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
import BiddingBuyScreen from './screens/BiddingBuyScreen';
import ExploreJobTeacher from './screens/ExploreJobTeacher';
import './components/ImageUpload.css'
import RefundsScreen from './screens/RefundsScreen';
import WihdrawAmin from './screens/WihdrawAmin';




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
                <Route path="/job-review/:job/:person/:type" exact component={JobReviewScreen}></Route>
                <Route path="/my-jobs" exact component={MyJobsScreen}></Route>
                <Route path="/buy-connects/:msg" exact component={BiddingBuyScreen}></Route>

                

                <Route path="/joinAsTeacher" exact component={joinAsTeacherScreen}></Route>
                <Route path="/joinAsTeacher-portfolio" exact component={TeachPDFScreen}></Route>
                <Route path="/teacher/:id" exact component={TeachWorkScreen}></Route>
                <Route path="/teacher-update/:id" exact component={TeachWorkUpdate}></Route>
                <Route path="/explore-teacher" exact component={ExploreTeach}></Route>
                <Route path="/explore-teacher/title/:title/tags/:tags/min/:min/max/:max/successRatio/:successRatio/earned/:earned/country/:country/language/:language/sort/:sort/pageNumber/:pageNumber" exact component={ExploreTeach}></Route>


                <Route path="/postAJob/:type" exact component={PostAJobScreen}></Route>
                <Route path="/job/:id" exact component={JobScreen}></Route>
                <Route path="/job-update/:id" exact component={UpdateJobScreen}></Route>
                <Route path="/explore-jobs/title/:title/tags/:tags" exact component={ExploreJobs}></Route>


                <Route path="/postAJob-teacher" exact component={PostAJobScreen}></Route>
                <Route path="/job-teacher/:id" exact component={JobScreen}></Route>
                <Route path="/job-update-teacher/:id" exact component={UpdateJobScreen}></Route>
                <Route path="/explore-jobs-teacher/title/:title/tags/:tags" exact component={ExploreJobTeacher}></Route>

                

                <Route path="/edit-gig/:id" exact component={GigUpdateScreen}></Route>
                <Route path="/explore-gigs" exact component={ExploreGigs}></Route>
                <Route path="/gigs/:id" component={GigScreen}></Route>
                <Route path='/explore-gig/title/:title/tags/:tags/min/:min/max/:max/delivery/:delivery/country/:country/language/:language/sort/:sort/pageNumber/:pageNumber' exact component={ExploreGigs}></Route>
                <Route path="/gig-payment-gateway/:id/:offer" component={GigPayment}></Route>

                <Route path="/gig-orders" component={GigOrdersScreen}></Route>
                <Route path="/gig-orders-placed" component={GigOrdersPlaced}></Route>
                <Route path="/gig-order/:id" component={SingleGigOrderScreen}></Route>
                <Route path="/payrefunds" component={RefundsScreen}></Route>


                <Route path="/admin-updates" exact component={adminUpdate}></Route>
                <Route path="/updates" exact component={UpdatesScreen}></Route>
                <Route path="/dashboard" exact component={DashboardScreen}></Route>


                <Route path="/adminconfirmwithdraw" exact component={WihdrawAmin}></Route>
                
                 

                

            </main>
            <footer>
          <section class="ft-main">
            <div class="ft-main-item">
              <h2 class="ft-title">About</h2>
              <ul>
                <li><a href="#">Services</a></li> <li><a href="#">Portfolio</a></li>  <li><a href="#">Pricing</a></li>
                <li><a href="#">Customers</a></li> <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div class="ft-main-item">
              <h2 class="ft-title">Resources</h2>
              <ul>
                <li><a href="#">Docs</a></li> <li><a href="#">Blog</a></li>
                <li><a href="#">eBooks</a></li> <li><a href="#">Webinars</a></li>
              </ul>
            </div>
            <div class="ft-main-item">
              <h2 class="ft-title">Contact</h2>
              <ul>
                <li><a href="#">Help</a></li> <li><a href="#">Sales</a></li> <li><a href="#">Advertise</a></li>
              </ul>
            </div>
            <div class="ft-main-item">
              
            </div>
          </section>

  <section class="ft-social">
    <ul class="ft-social-list">
      <li><a href="#"><i class="fab fa-facebook"></i></a></li>
      <li><a href="#"><i class="fab fa-twitter"></i></a></li>
      <li><a href="#"><i class="fab fa-instagram"></i></a></li>
      <li><a href="#"><i class="fab fa-github"></i></a></li>
      <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
      <li><a href="#"><i class="fab fa-youtube"></i></a></li>
    </ul>
  </section>
  <section class="ft-legal">
    <ul class="ft-legal-list">
      <li><a href="#">Terms &amp; Conditions</a></li>
      <li><a href="#">Privacy Policy</a></li>
      <li>&copy; 2021 Copyright Zarthon Inc.</li>
    </ul>
  </section>
</footer>
            {/* <footer style={{backgroundColor :' #023246' ,color:'#f6f6f6'}} className="row center">All right reserved</footer> */}
        </div>
        </BrowserRouter>



// Sandbox account
// sb-hzsjh6931270@business.example.com
// Client ID
// AQWIDtlMclrR7Ke4CBgssWf-NqukUdf7mQZNIZcsAuG--hDNFrVWnVvVxkkTkI8PddxYtRe08ZWf37Eo

// EIGbXZh5crf6wYhhq5SRyXgJaPYUL2HGJjjm9yGA5bwqaUdwSmBMlrgIc2V0D4OfMkV3QF9OZlVBpcoD

    );

  }


}



export default App;
