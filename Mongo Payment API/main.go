package main

import (
	"encoding/json"
	"log"
	"net/http"
	"gopkg.in/mgo.v2/bson"
	"github.com/gorilla/mux"
	. "./ccs"
)

var ccs = CCSDB{}

// API Ping Handler
func testPing(w http.ResponseWriter, req *http.Request) {
	fmt.Printf("testping")
	respondWithJson(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
}

//Get all the order status
func allOrderStatus(w http.ResponseWriter, r *http.Request) {
	orders, err := ccs.FindAll()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	fmt.Println("Orders: ", orders)
	respondWithJson(w, http.StatusOK, orders)
}


func respondWithError(w http.ResponseWriter, code int, msg string) {
	respondWithJson(w, code, map[string]string{"error": msg})
}

func respondWithJson(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func init() {
	ccs.Connect()
	ccs.ConnecttoPrimary()
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/ping", testPing).Methods("GET")
	r.HandleFunc("/order", allOrderStatus).Methods("GET")
	if err := http.ListenAndServe(":3001", r); err != nil {
		log.Fatal(err)
	}
}









