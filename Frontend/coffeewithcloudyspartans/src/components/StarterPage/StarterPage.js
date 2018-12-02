import React from 'react';
// import DatePicker from 'react-datepicker';
// import Paper from 'material-ui/Paper';
// import IconButton from 'material-ui/IconButton';
// //import DatePicker from 'material-ui/DatePicker'
// import ActionHome from 'material-ui/svg-icons/action/home';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
// //import NavBar from '../NavBar/NavBar';
// import TravelHistory from '../TripsBoard/TravelHistory';
import {Redirect} from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';
// import NavBar from '../NavBar/NavBar';
// import './StarterPage.css'
// import { DateTimePicker } from 'react-widgets'
import Navigation from './Navigation';
// import BackgroundImage from 'react-background-image-loader';
// import AliceCarousel from 'react-alice-carousel';
// import "react-alice-carousel/lib/alice-carousel.css";

import cookie from 'react-cookies'


class StarterPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render()
  {
    let Redirect_to_home = null;
    // if(cookie.load('cookie'))
    // {
        var USERTYPE = localStorage.getItem("ACCOUNTTYPE")
        //   if(cookie.load('cookie')){
    if(USERTYPE==="traveler"){
      Redirect_to_home = (<Redirect to="/home" />)
    }
    return (
        
        <div class="backgroundcontainer" >
        {Redirect_to_home}
      <div class="centering row centered">
                              <div class="info-form">
                                  {/* <form action="" class="form-inline justify-content-center">
                                      <div class="form-group">
                                          <input type="text" class="form-control form-control-lg roundy" placeholder="City" disabled/>
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="date" class="form-control form-control-lg roundy" disabled
                                       /> 
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="date" class="form-control form-control-lg roundy" disabled
                                           />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="text" class="reduce form-control form-control-lg roundy" placeholder="Adults" disabled />
                                          <input type="text" class="reduce form-control form-control-lg roundy" placeholder="Children" disabled />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <button type="button" class="bluebutton btn btn-primary btn-lg roundy" onClick = {this.onSubmit}>Search</button>
                                  </form> */}
                              </div>
                        <br />  
           </div>
</div>


    )
  }
}
export default StarterPage;

