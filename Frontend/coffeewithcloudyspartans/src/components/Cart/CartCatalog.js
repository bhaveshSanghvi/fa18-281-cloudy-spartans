import React from 'react';
import {Redirect} from 'react-router';
import Cart from './Cart'
import Navigation from '../StarterPage/Navigation'
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import axios from 'axios'
import {Link} from 'react-router-dom';


      class CartCatalog extends React.Component {
      
       constructor(props) {
          super(props);
          this.state = {
            Cart: [],
            cartnumber: 0
          };
          this.handleClickPage = this.handleClickPage.bind(this);
          this.handleClickDrinkAdd = this.handleClickDrinkAdd.bind(this);
          this.handleClickDrinkDelete = this.handleClickDrinkDelete.bind(this);
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
      
      handleClickDrinkAdd(key)
      {
          console.log("KEY IS ", key)

        fetch('http://localhost:4004/addtocart', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials : 'include',
            body: JSON.stringify({
                userid : "test_user1",
                cartItems : {
                productid: key.productid,
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
                var Userid="test_user1"
                axios.get('http://localhost:4004/cart/'+Userid).then(response=>
                {
                    console.log("response is ", JSON.stringify(response.data))
                    this.setState({
                        Cart : response.data
                    })
                })
             }
            })

      }


      handleClickDrinkDelete(key)
      {
        fetch('http://localhost:4004/addtocart', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            credentials : 'include',
            body: JSON.stringify({
                userid : "test_user1",
                cartItems : {
                productid: key.productid,
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
                var Userid="test_user1"
                axios.get('http://localhost:4004/cart/'+Userid).then(response=>
                {
                    console.log("response is ", JSON.stringify(response.data))
                    this.setState({
                        Cart : response.data
                    })
                })
             }
            })


      }
      
        componentDidMount() {
            var Userid="test_user1"
            axios.get('http://localhost:4004/cart/'+Userid).then(response=>
            {
                console.log("response is ", JSON.stringify(response.data))
                this.setState({
                    Cart : response.data

                })
            })
      
        }
      
        render() {
      
          let Redirect_to_login = null;
              let redirecty_value = null;
              redirecty_value  = (
                <div class="middle">
                 <Link to="/payments"><button className="btn btn-primary">Check Out</button></Link>
                 <table class="tabledef">
                 <tbody>
                 {  
                   this.state.Cart.map((drink, index) => {
                     console.log("Drinks in Cart ", drink)
                       return ( 
                         <Cart
                          key={index}
                          name = {drink.name}
                          drinkinfo={drink}
                          sizes={drink.size}
                          price={drink.price}
                          count = {drink.count}
                          clicked={this.handleClick}
                          drinkclicked= {this.handleClickDrink}
                          drinkadd = {this.handleClickDrinkAdd}
                          drinkdelete = {this.handleClickDrinkDelete}
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
      
      export default CartCatalog;