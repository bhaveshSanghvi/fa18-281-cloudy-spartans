import React from 'react';
 import './DrinksCatalog.css'
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Drinks from '../Drinks/Drinks'
import Navigation from '../StarterPage/Navigation'
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
class DrinksCatalog extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      Drinks: [],
      drinkid: ""
    };
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleClickDrink = this.handleClickDrink.bind(this);
  }

  handleClickPage(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleClick(key){
    console.log("KEY IS " +key);
    localStorage.setItem("activekey" , key)
    this.setState(
      {propId:key})
    console.log(this.state)
}

handleClickDrink(key){
  console.log("Drink ID " + JSON.stringify(key));
  localStorage.setItem("DrinkItem" , key)
  fetch('http://localhost:4004/addtocart', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    credentials : 'include',
    body: JSON.stringify({
        userid : "test_user1",
        cartItems : {
          productid : key.id,
          name : key.name,
          price : key.price,
          size : key.size,
          count : 1
        }
    })
  })
  .then(response => {
    if(response.status === 400)
      {
        this.setState({errors : true})
      }
    else
      {
        alert("Drink Added")
     }
    })

}

  componentDidMount() {
    var result = []
    fetch('http://localhost:4004/getalldrinks')
    .then((response) => {
    response.json()
    .then(drinks => {
            this.setState({Drinks : drinks})
           })
          })
  }

  render() {

    let Redirect_to_login = null;
        let redirecty_value = null;
        redirecty_value  = (
          <div class="middle">
          <div className="float-right">
           <Link to="/mycart"><button className="btn btn-primary">Go to Cart</button></Link>
           </div>
           <table class="tabledef">
           <tbody>
           {  
             this.state.Drinks.map((drink, index) => {
               console.log("TRIPS IS ", drink)
                 return ( 
                   <Drinks
                    key={index}
                    drinkinfo={drink}
                    id = {drink.productid}
                    name={drink.name}
                    sizes={drink.size}
                    price={drink.price}
                    clicked={this.handleClick}
                    drinkclicked= {this.handleClickDrink}
                   />  
                 );
               })
             }
             </tbody>
             </table>
           </div>
         );

    return (
      <div>
      <Navigation />
      {Redirect_to_login}
      <div class="divide">
      </div>
      <div id="bodydiv" >
      {redirecty_value}
      </div>
    </div>
    );
  }
}

export default DrinksCatalog;