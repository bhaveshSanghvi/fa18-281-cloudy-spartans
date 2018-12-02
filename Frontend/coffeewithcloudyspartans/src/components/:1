import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Navigation from './StarterPage/Navigation';
/*import TripsBoard from './TripsBoard/TripsBoard.js';
import SignIn from './SignIn/SignIn';
import PlaceFinder from './PlaceFinder/PlaceFinder';
import SearchPlaces from './SearchPlaces/SearchPlaces';
import TravelerAccount from './TravelerAccount/TravelerAccount';
import SignUp from './SignUp/SignUp';
import database from './Database';
import SearchBar from './SearchBar/SearchBar'
import PlaceDescription from './PlaceDescription/PlaceDescription';
import NavBar from './NavBar/NavBar'*/
import StarterPage from './StarterPage/StarterPage';
import DrinksCatalog from './DrinksCatalog/DrinksCatalog';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
//import Inbox from './Inbox/Inbox';

class Main extends Component {
  constructor (props) {
  super(props)
  this.state ={
    user: {
    name: ''
  },
  startdate: '',
  enddate: '',
  guests: '' 
  }
}

  componentDidMount()
  {
    var userabc = localStorage.getItem("usernamey")
    console.log("LOCAL STORAGE value is " + userabc)
    if(userabc) {
    this.setState({user: {
    name: userabc
    }});
  }
}

  loadUser = (data) => {
    console.log("DATA IS " + JSON.stringify(data));
    this.setState({user: {
    name: data
  }})

    localStorage.setItem("usernamey", data)
    console.log("SET localStorage ITEM AS " +  localStorage.getItem("usernamey"))

}
render() {
console.log("STATE IS  " + this.state.user.name);
  return (
        <div>
        <Route exact path="/" render={()=>(<StarterPage value={this.state.user.name} />)} />    
        <Route exact path="/" render={()=>(<DrinksCatalog value={this.state.user.name} />)} />  
        <Route exact path="/login" render={()=>(<Login value={this.state.user.name} />)} />   
        <Route exact path="/signup" render={()=>(<SignUp value={this.state.user.name} />)} />            
       </div>
  );
}
}

export default Main;



