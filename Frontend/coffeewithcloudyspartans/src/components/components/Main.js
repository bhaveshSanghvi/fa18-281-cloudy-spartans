import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Navigation from './StarterPage/Navigation';
import StarterPage from './StarterPage/StarterPage';
import DrinksCatalog from './DrinksCatalog/DrinksCatalog';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import AddDrink from './AddDrink/AddDrink';
import DrinkDescription from './DrinkDescription/DrinkDescription';
import CartCatalog from './Cart/CartCatalog';

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
        <Route exact path="/home" render={()=>(<DrinksCatalog value={this.state.user.name} />)} />  
        <Route exact path="/login" render={()=>(<Login value={this.state.user.name} />)} />   
        <Route exact path="/signup" render={()=>(<SignUp value={this.state.user.name} />)} />  
        <Route exact path="/addadrink" render={()=>(<AddDrink value={this.state.user.name} />)} /> 
        <Route path="/drinks" render={()=>(<DrinkDescription value={this.state.user.name} />)} />
        <Route path="/mycart" render={()=>(<CartCatalog value={this.state.user.name} />)} />              
       </div>
  );
}
}

export default Main;



