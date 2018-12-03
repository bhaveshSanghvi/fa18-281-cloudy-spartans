package ccs

import (
	"log"
	"fmt"
    s "strings"
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
	MongoDBHosts = "internal-LoadBalancer-GP-2070204421.us-west-1.elb.amazonaws.com:27017"
	AuthDatabase = "admin"
	AuthUserName = "admin"
	AuthPassword = "cmpe281"
	Server1 = "10.0.1.123"
	Server2 = "10.0.1.115"
	Server3 = "10.0.1.54"
	Server4 = "10.0.3.168"
	Server5 = "10.0.3.254"
)

//Initiate connection to database
func (m *CCSDB) Connect() {
	fmt.Printf("Came Here in connect1")
	mongoDBDialInfo := &mgo.DialInfo{
        Addrs:    []string{MongoDBHosts},
        Database: AuthDatabase,
        Username: AuthUserName,
        Password: AuthPassword,
    }
    session, err := mgo.DialWithInfo(mongoDBDialInfo)
	if err != nil {
        fmt.Printf("Came Here in connect error")
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
