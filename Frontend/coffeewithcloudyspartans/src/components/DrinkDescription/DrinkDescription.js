import React,{Component} from 'react';
import  { Carousel, CarouselInner, CarouselItem, View, Container } from 'mdbreact';
import {Redirect} from 'react-router'
import cookie from 'react-cookies'
import './DrinkDescription.css'

class DrinkDescription extends Component 
{
	 constructor(props) {
	    super(props);
	    this.state = {
            photos : []
	    }
	}

	componentDidMount()
	{

	 var id = localStorage.getItem("activekey");


	     fetch('http://localhost:4004/getDrinkImg', {
		      method: 'post',
		      headers: {'Content-Type': 'application/json'},
		      credentials : 'include',
		      body : JSON.stringify({
		      	id : id
		      })
		    })
		    .then(response => response.json())
		    .then(data => {
		    	var imageArr = [];
		    	console.log("length is "+ data.results.length)
		    	for (let i = 0; i < data.results.length; i++) {
		    	let imagePreview = 'data:image/jpg;charset=utf-8;base64, ' + data.results[i];
                                imageArr.push(imagePreview);
                                const photoArr = this.state.photos.slice();
                                photoArr[i] = imagePreview;
                                this.setState({
                                    photos: photoArr
                                });
                                console.log('Photo State: ', this.state.photos);
                  }
		    })

	}

	onSubmit = () => {
		var id = localStorage.getItem("activekey");
		var name = localStorage.getItem("usernamey")
		var url= 'http://localhost:4004/book/property'
		fetch(url, {
      		method: 'post',
      		headers: {'Content-Type': 'application/json'},
      		body: JSON.stringify({
       			 property_id: id,
       			 username: name,
       			 startdate : this.state.startdate,
       			 enddate : this.state.enddate
      })
    })

   .then(response => {
      if(response.status === 400)
        {
          alert("This Property Cannot be booked")
        }
      else
        {
          response.json()
          .then(places => {
          this.setState({Redirecty : true})
           alert("Property Booked Successfully")
          })

        }
      })
	}
 
  render()
  {
  	let Redirection_Value = null;
  	let Error_Display = null;  	

  	let carousalBlock = this.state.photos.map(function (item, index) {

            return (
                <div className={index == 0 ? "carousel-item active" : "carousel-item"} key={index}>
                    <img className=" carousel-img property-display-img" src={item} width="900" height="400" alt="property-image" />
                </div>
            )
        });

        let carousalIndicator = this.state.photos.map(function (item, index) {

            return (                
                    <li data-target="#myCarousel" data-slide-to={index} className={index == 0 ? "active" : ""} key={index}></li>     
            )
        });
  	return(
<div class="row rowy">
	<div class="col-md-8 bordering shadowingcontainertraveller">
	 <div id="myCarousel" className="carousel slide" data-ride="carousel">
                                <ul className="carousel-indicators">
                                    {carousalIndicator}
                                </ul>
                                <div className="carousel-inner">
                                    {carousalBlock}
                                </div>
                                <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                    <span className="carousel-control-prev-icon"></span>
                                </a>
                                <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                                    <span className="carousel-control-next-icon"></span>
                                </a>
      </div>
		<hr />
		
		</div>
		<div class="col-md-4 shadowingcontainertraveller bordering booking">
				    <div class="contenty">	
				      <a class="header"><h1>{localStorage.getItem("activekey")}</h1></a>
                      <p><h3>Price : 5 $</h3></p>
                     <br />
                     <button type="button" class="booknow btn" onClick = {this.onSubmitMenu}>Go to Menu  </button>
                     <br />
                     <br />
                     <button type="button" class="booknow btn" onClick = {this.onSubmit}> Add to Cart</button>
                     <br />
                     <br />
				     <button type="button" class="booknow btn" onClick = {this.onSubmitCheckOut}>Check Out </button>
                     <br />
                     <br />
				     </div>
				  <br />
				  </div>
				  {Redirection_Value}
		</div>
		);
  }
}



export default DrinkDescription;