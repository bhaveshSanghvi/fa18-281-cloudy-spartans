import React from 'react';
import './DrinksCatalog.css'
import {Redirect} from 'react-router';
import Drinks from '../Drinks/Drinks'
import Navigation from '../StarterPage/Navigation'

class DrinksCatalog extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      Drinks: []
    };
    this.handleClickPage = this.handleClickPage.bind(this);
  }

  handleClickPage(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
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
           <table class="tabledef">
           <tbody>
           {
             this.state.Drinks.map((drink, index) => {
               console.log("TRIPS IS ", drink)
                 return ( 
                   <Drinks
                    key={index}
                    name={drink.name}
                    sizes={drink.sizes}
                    price={drink.price}
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
