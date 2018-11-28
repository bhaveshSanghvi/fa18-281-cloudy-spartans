package ccs

import (
	"log"
	"fmt"
        s "strings"
	. "../models"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type CCSDB struct {
	Server   string
	Database string
	Username string
	Password string
}

var db *mgo.Database
var dbprimary *mgo.Database

const (
	COLLECTION = "ccscatalog"
)

const (
	MongoDBHosts = "internal-Mongo-Loadbalancer-1320543684.us-west-1.elb.amazonaws.com:27017"
	AuthDatabase = "admin"
	AuthUserName = "admin"
	AuthPassword = "admin"
	Server1 = "10.0.1.142"
	Server2 = "10.0.1.148"
	Server3 = "10.0.1.113"
	Server4 = "10.0.1.131"
	Server5 = "10.0.1.253"
)

//Initiate connection to database
func (m *CCSDB) Connect() {
	mongoDBDialInfo := &mgo.DialInfo{
                Addrs:    []string{MongoDBHosts},
                Database: AuthDatabase,
                Username: AuthUserName,
                Password: AuthPassword,
        }
	session, err := mgo.DialWithInfo(mongoDBDialInfo)
	if err != nil {
		log.Fatal(err)
	}
	db = session.DB("CCS")
}

// Make sure the write happens to Master of the Mongo Database
func (m *CCSDB) ConnecttoPrimary() {
	result := make(map[string]interface{})
	fmt.Printf("Came Here")
	err := db.Run(bson.M{"isMaster": 1}, result)
	 if err != nil {
                log.Fatal(err)
        }
	value := result["primary"].(string)
	if s.Contains(value,"primary"){
		fmt.Printf("Yes Primary")
            mongoDBDialInfo := &mgo.DialInfo{
                Addrs:    []string{Server1},
                Database: AuthDatabase,
                Username: AuthUserName,
                Password: AuthPassword,
        }
        sessionone, err := mgo.DialWithInfo(mongoDBDialInfo)
        if err != nil {
                log.Fatal(err)
        }
        dbprimary = sessionone.DB("CCS")
	}
	if s.Contains(value,"secondary1"){
                fmt.Printf("Yes Secondary1")
            mongoDBDialInfo := &mgo.DialInfo{
                Addrs:    []string{Server2},
                Database: AuthDatabase,
                Username: AuthUserName,
                Password: AuthPassword,
        }
        sessionone, err := mgo.DialWithInfo(mongoDBDialInfo)
        if err != nil {
                log.Fatal(err)
        }
        dbprimary = sessionone.DB("CCS")
        }
	if s.Contains(value,"secondary2"){
                fmt.Printf("Yes Secondary2")
		  mongoDBDialInfo := &mgo.DialInfo{
                Addrs:    []string{Server3},
                Database: AuthDatabase,
                Username: AuthUserName,
                Password: AuthPassword,
        }
        sessionone, err := mgo.DialWithInfo(mongoDBDialInfo)
        if err != nil {
                log.Fatal(err)
        }
        dbprimary = sessionone.DB("CCS")
        }
	if s.Contains(value,"secondary3"){
                fmt.Printf("Yes Secondary3")
		  mongoDBDialInfo := &mgo.DialInfo{
                Addrs:    []string{Server4},
                Database: AuthDatabase,
                Username: AuthUserName,
                Password: AuthPassword,
        }
        sessionone, err := mgo.DialWithInfo(mongoDBDialInfo)
        if err != nil {
                log.Fatal(err)
        }
        dbprimary = sessionone.DB("CCS")
        }
	if s.Contains(value,"secondary4"){
                fmt.Printf("Yes Secondary4")
		  mongoDBDialInfo := &mgo.DialInfo{
                Addrs:    []string{Server5},
                Database: AuthDatabase,
                Username: AuthUserName,
                Password: AuthPassword,
        }
        sessionone, err := mgo.DialWithInfo(mongoDBDialInfo)
        if err != nil {
                log.Fatal(err)
        }
        dbprimary = sessionone.DB("CCS")
        }
}
// Find list of All Drinks in the Catalog
func (m *CCSDB) FindAll() ([]Drink, error) {
	var drinks []Drink
	err := db.C(COLLECTION).Find(bson.M{}).All(&drinks)
	return drinks, err
}

// Find a Drink by its id
func (m *CCSDB) FindById(id string) (Drink, error) {
	var drink Drink
	err := db.C(COLLECTION).FindId(bson.ObjectIdHex(id)).One(&drink)
	return drink, err
}

// Insert a New Drink into CCS Menu
func (m *CCSDB) Insert(drink Drink) error {
	err := dbprimary.C(COLLECTION).Insert(&drink)
	return err
}

// Delete a Drink from the Catalog
func (m *CCSDB) Delete(drink Drink) error {
	err := db.C(COLLECTION).Remove(&drink)
	return err
}

// Update an existing Drink in the Catalog
func (m *CCSDB) Update(drink Drink) error {
	err := db.C(COLLECTION).UpdateId(drink.ID, &drink)
	return err
}
