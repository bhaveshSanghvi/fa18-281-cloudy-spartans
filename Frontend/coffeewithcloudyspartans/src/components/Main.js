import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Navigation from './StarterPage/Navigation';
// import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import StarterPage from './StarterPage/StarterPage';
import DrinksCatalog from './DrinksCatalog/DrinksCatalog';
import Payment from "../components/Payment/Payment" 
import Login from "../components/Login/Login"

class Main extends Component {
  constructor (props) {
  super(props)
  this.state ={
    user: {
    name: ''
  }
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
        {/* <Route exact path="/addadrink" render={()=>(<AddDrink value={this.state.user.name} />)} />  */}
        {/* <Route path="/drinks" render={()=>(<DrinkDescription value={this.state.user.name} />)} />   */}
        <Route exact path="/payment" component={Payment} />
       </div>
  );
}
}

export default Main;



