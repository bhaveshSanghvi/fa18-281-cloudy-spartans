package main

import(
	"net/http"
)

type Client struct {
	Endpoint string
	*http.Client
}

type CartItem struct {

	Name 		string			`json:"name"`
	Price       int             `json:"price"`
    Size        string          `json:"size"`
    Count		int				`json:"count"`

}


type Cart struct {

	UserID      string  		`json:"userid"`
	ProductID   string  		`json:"productid"`
	CartItem 	CartItem		`json:"cartItems"`
}


type Carts []Cart

type OrderList struct{
	ProductID 	string			`json:"productid"`
	InCart		int 			`json:"incart"`
}

type Keys struct{
	Keys 		[]string 
}

