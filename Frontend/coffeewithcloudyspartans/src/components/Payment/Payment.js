import React from 'react';
// import './Login.css';
// import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import "../Payment/payment.css"
import axios from 'axios'

class Payment extends React.Component {
    constructor(props){
        super(props);

        this.state={
            name : "Genius srini",  //this.props.data.user
            orderCount : 105,
            orderPrice : null,
            orderId:null,
            amount:0,
            isBillGenerated:false,
            errors : "",
            orders:[]
        }
        this.getBill = this.getBill.bind(this)
        this.getOrderDetails=this.getOrderDetails.bind(this);
        this.amountHandler = this.amountHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }


    getOrderDetails(){

        if(!this.state.isBillGenerated){
            alert("You have to create payment to get order details");
            return;
        }

        const url = "http://localhost:4004/order/"+this.state.orderId
        axios.get(url).then(response => {
            console.log("RES",response.data);
            this.setState({orderPrice : response.data.amount});    
        }).catch(error=>{
                alert("Error in getting order details")
        })
    }

    getBill(e){

       // this.setState({orderPrice : 25})
        /*
        fetch('http://localhost:4004/amount', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          credentials : 'include',
          body: JSON.stringify({
          name : this.state.name,
          count: this.state.orderCount
          })
        })
        .then(response => {
            console.log(response);
          if(response.status === 400)
            {
              this.setState({errors : true})
            }
          else
            {
              alert("Your Payment has been Created")
              this.setState({isBillGenerated:true})
            }
          })
          */
         const data ={
            name : this.state.name,
            count: this.state.orderCount
         }

         axios.post('http://localhost:4004/amount',data).then((response)=>{
            
            if(response.status === 200){
                console.log(response.status);
                console.log(response.data.id);
                alert("Your payment has been created")
                this.setState({isBillGenerated:true,orderId:response.data.id})
            }else{
                alert("Sorry we could not create your order")
            }
            
         }).catch((error)=>{
                console.log(error);
         })

          
      }

      amountHandler =(e)=>{
          console.log("Inside amount"+e.target.value)
          this.setState({amount:e.target.value});
          
      }

      onSubmitHandler= (e)=>{
          //e.preventDefault();
        
        //   if(!this.state.isBillgenerated){
        //     alert("You have to create payment to get order details");
        //     return;
        //   }

        console.log("inside request submit handler");
          const data ={
                name : this.state.name,
                price:this.state.orderPrice
          }

          const id = this.state.orderId;
          const url = "http://localhost:4004/processOrders/"+id;
          console.log(url);
          axios.post(url,data).then((response)=>{

          if(response.status === 200){
              console.log("Successfully processes your order");
              alert("We have successfully processed your order");
          }

          }).catch((error)=>{
              console.log(error);
              alert("Sorry we could not process your order");
          })
      }

  render(){ 
      const {isBillGenerated,orderPrice} = this.state;
    return(
        // <div className="container-fluid">
        // <img className="bg-img"></img>  
        //  <div className="">
        //     <div>
        //        Customer Name :  {this.state.name}
        //     </div>
        //     <div>
        //        Item Order Count : {this.state.orderCount}
        //     </div>
        //     {this.state.orderPrice ? <div> Total Price : ${this.state.orderPrice}</div> : ""}
            
        //  <button onClick={this.getBill} className="btn btn-primary">Place Order</button><br/><br/>
        //  <button type="button" class="btn btn-outline-primary" onClick={this.getOrderDetails}>Get Order Details</button>
        //  </div>
        // </div>
        <div>
            <div className="row justify-content-center" style={{marginTop:'10%'}}>

                <div className="col-md-6" style={{ border: '1px solid grey' }}>
                    <p>Customer Name : {this.state.name}</p>
                    <p>Order Count : {this.state.orderCount}</p>
                    {orderPrice!=null ? <p>Order Price : {this.state.orderPrice}</p> : ""}
                    <button type="button" onClick={this.getBill} className="btn btn-primary float-left mb-1">Place Order</button>
                    <button type="button" onClick={this.getOrderDetails} className="btn btn-primary float-right mb-1">Order Details</button>
                </div>

            </div>
            {/* style={{display: isBillGenerated ? "" : "none" }} */}
            <div className="row justify-content-center mt-3">

                <div className="col-md-6" style={{ border: '1px solid grey',display: isBillGenerated ? "" : "none" }}>
                    <form>


                        <div className="form-group">
                            <label htmlFor="cardnumber">Card No</label>
                            <input type="text" className="form-control" id="cardnumber" name="cardnumber" placeholder="Enter Card Number" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter Your Name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" onChange={this.amountHandler} className="form-control" id="amount" name="amount"  placeholder="Enter Amount" value={this.state.amount} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="expirydate">Expiry Date</label>
                            <input type="text" className="form-control" id="expirydate" name="expirydate" placeholder="MM/YY" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input type="password" className="form-control" id="cvv" name="cvv" placeholder="CVV" />
                        </div>

                        <button type="button" onClick={this.onSubmitHandler} className="btn btn-primary float-center mb-2" >Submit</button>
                    </form>
                    

                </div>

            </div>

        </div>
    );
}
}
export default Payment;
