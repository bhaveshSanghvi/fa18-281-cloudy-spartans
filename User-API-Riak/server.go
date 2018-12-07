package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	// "github.com/streadway/amqp"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	// "github.com/satori/go.uuid"
	// "gopkg.in/mgo.v2"
	// "gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"time"
	"strings"
	// "strconv"
)

var debug = true
var cluster1_elb = "http://internal-Cluster1-ELB-1830172783.us-west-1.elb.amazonaws.com:80"

type Client struct {
	Endpoint string
	*http.Client
}

var tr = &http.Transport{
	MaxIdleConns:       10,
	IdleConnTimeout:    30 * time.Second,
	DisableCompression: true,
}

// Create a new client
func NewClient(server string) *Client {
	return &Client{
		Endpoint: server,
		Client:   &http.Client{Transport: tr},
	}
}


// NewServer configuration 
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.UseHandler(mx)
	return n
}

func init() {

	// Riak KV Setup	

	elb1 := NewClient(cluster1_elb)
	msg, err := elb1.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server4: ", msg)		
	}
	
}

func (c *Client) Ping() (string, error) {
	resp, err := c.Get(c.Endpoint + "/ping" )
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return "Ping Error!", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { 
		fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/ping => " + string(body)) 
	}
	return string(body), nil
}


// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/signup", signupHandler(formatter)).Methods("POST")
	mx.HandleFunc("/login", loginHandler(formatter)).Methods("POST")
	mx.HandleFunc("/allusers", allusersHandler(formatter)).Methods("GET")
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

func signupHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var ord user
		decoder := json.NewDecoder(req.Body)
		error := decoder.Decode(&ord)

		if error != nil{
			ErrorWithJSON(w, "incorrect body", http.StatusBadRequest)
			fmt.Println("[HANDLER DEBUG]", error.Error())
			return 
		}

		requestbody, _ := json.Marshal(ord)

		elb1 := NewClient(cluster1_elb)

		chk_user, _ := c1.GetUser(ord.UserId)

		if (ord.UserId == chk_user.UserId){
			// stat_ok := "ok"
			formatter.JSON(w, http.StatusOK, "user exists")
			fmt.Println("user exists")
		} else  {
			value_res, error := c1.RegisterUser(ord.UserId,string(requestbody))
		
			if error != nil {
				log.Fatal(error)
				formatter.JSON(w, http.StatusBadRequest, error)
			} else {
				formatter.JSON(w, http.StatusOK, value_res)
			}
		}

	}
}

func loginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var ord user
		decoder := json.NewDecoder(req.Body)
		error := decoder.Decode(&ord)

		if error != nil{
			ErrorWithJSON(w, "incorrect body", http.StatusBadRequest)
			fmt.Println("[HANDLER DEBUG]", error.Error())
			return 
		}

		elb1 := NewClient(cluster1_elb)

		user_details, error := c1.GetUser(ord.UserId)

		if error != nil {
			log.Fatal(error)
			formatter.JSON(w, http.StatusBadRequest, error)
		}

		if (ord.Password == user_details.Password){
			// stat_ok := "ok"
			formatter.JSON(w, http.StatusOK, "SUCCESS")
			fmt.Println("Login Successful")
		} else {
			formatter.JSON(w, http.StatusOK, "INVALID CREDENTIALS")
			fmt.Println("Invalid credentials")
		}
		
	}
}

func allusersHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		elb1 := NewClient(cluster1_elb)
		list_users, error := elb1.GetAllUsers()

		if error != nil {
			log.Fatal(error)
			formatter.JSON(w, http.StatusBadRequest, error)
		} else {
			formatter.JSON(w, http.StatusOK, list_users)	
		}
	}
}

func (c *Client) RegisterUser(key string, reqbody string) (user, error) {
	var ord_nil = user {}

	resp, err := c.Post(c.Endpoint + "/buckets/users/keys/"+key+"?returnbody=true", 
	"application/json", strings.NewReader(reqbody) )
	
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return ord_nil, err
	}	
 	defer resp.Body.Close()
 	body, err := ioutil.ReadAll(resp.Body)
 	if debug { 
		 fmt.Println("[RIAK DEBUG] POST: " + c.Endpoint + "/buckets/users/keys/"+key+"?returnbody=true => "  + string(body)) 
		}
 	var place user
 	msg1 := json.Unmarshal(body, &place); 
 	if msg1 != nil {
		fmt.Println("[RIAK DEBUG] JSON unmarshaling failed: %s", msg1)
		return ord_nil, msg1
	}	
	fmt.Println("place", place)
 	return place, nil
}

func (c *Client) GetUser(key string) (user, error) {
	var ord_nil = user {}
	
	resp, err := c.Get(c.Endpoint + "/buckets/users/keys/"+key)
	
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return ord_nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/buckets/maps/keys/"+key +" => " + string(body)) }
	var ord = user { }
	if err := json.Unmarshal(body, &ord); err != nil {
		fmt.Println("RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return ord_nil, err
	}
	fmt.Println("ord is",ord)
	return ord, nil
}

func (c *Client) GetAllUsers() ([]string, error) {
	fmt.Println("inside getall")
	var all_keys []string
	
	resp, error := c.Get(c.Endpoint + "/buckets/users/keys?keys=true")
	
	if error != nil {
		fmt.Println("[RIAK DEBUG] " + error.Error())
		return all_keys, error
	}
	
	defer resp.Body.Close()

	rbody, error := ioutil.ReadAll(resp.Body)

	if debug { 
		fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/buckets/users/keys/keys?true => " + string(rbody)) 
	}

	// var ord1 = user { }
	var all_keys_list Keys

	if err := json.Unmarshal(rbody, &all_keys_list); err != nil {		
		fmt.Println("RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return all_keys_list.Keys, err
	}
	fmt.Println("Keys are",all_keys_list.Keys)
	return all_keys_list.Keys, nil
	
	
}

func ErrorWithJSON(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	fmt.Fprintf(w, "{message: %q}", message)
}
