package main

import "gopkg.in/mgo.v2/bson"

type Order struct {
	Id             	string 	`bson:"name" json:"name"`
	// OrderStatus 	string	`bson:"name" json:"name"`
	OrderCount  	int 	`bson:"count" json:"count"`
}

var orders map[string] Order

//type orders1 []Order