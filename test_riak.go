package main

import(
	"fmt"
	riak "github.com/basho/riak-go-client"
)

var debug = true
var riak1 = "10.0.1.218:8087"
var riak2 = "10.0.1.53:8087"
var riak3 = "10.0.1.90:8087"
var riak4 = "10.0.3.50:8087"
var riak5 = "10.0.3.237:8087"

func main(){

	riak1_Opts := &riak.NodeOptions{
		RemoteAddress: riak1,
	}

	riak2_Opts := &riak.NodeOptions{
		RemoteAddress: riak2,
	}

	riak3_Opts := &riak.NodeOptions{
		RemoteAddress: riak3,
	}

	riak4_Opts := &riak.NodeOptions{
		RemoteAddress: riak4,
	}

	riak5_Opts := &riak.NodeOptions{
		RemoteAddress: riak5,
	}

	var riakNode1, riakNode2, riakNode3, riakNode4, riakNode5 *riak.Node
	var err error

	if riakNode1, err = riak.NewNode(riak1_Opts); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
	}

	if riakNode2, err = riak.NewNode(riak2_Opts); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
	}

	if riakNode3, err = riak.NewNode(riak3_Opts); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
	}

	if riakNode4, err = riak.NewNode(riak4_Opts); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
	}

	if riakNode5, err = riak.NewNode(riak5_Opts); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
	}

	riakNodes := []*riak.Node{riakNode1, riakNode2, riakNode3, riakNode4, riakNode5}

	opts := &riak.ClusterOptions{
		Nodes: riakNodes,
	}

	cluster, err := riak.NewCluster(opts)
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
	}

	defer func() {
		if err = cluster.Stop(); err != nil {
			fmt.Println("[RIAK DEBUG] " + err.Error())
		}
	}()

	if err := cluster.Start(); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
	} else {
		fmt.Println("Cluster started")
	}

	storeRufus(cluster)
	fetchRufus(cluster)	

}


//Reference : https://github.com/basho/riak-go-client/blob/master/examples/dev/using/basics/main.go

func storeRufus(cluster *riak.Cluster) {
	obj := &riak.Object{
		ContentType:     "text/plain",
		Charset:         "utf-8",
		ContentEncoding: "utf-8",
		Value:           []byte("WOOF!"),
	}

	cmd, err := riak.NewStoreValueCommandBuilder().
		WithBucket("dogs").
		WithKey("rufus").
		WithContent(obj).
		Build()

	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return
	}

	if err = cluster.Execute(cmd); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return
	}

	svc := cmd.(*riak.StoreValueCommand)
	rsp := svc.Response
	fmt.Println("rsp.VClock",rsp.VClock)
}

func fetchRufus(cluster *riak.Cluster) {
	cmd, err := riak.NewFetchValueCommandBuilder().
		WithBucket("dogs").
		WithKey("rufus").
		Build()

	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return
	}

	if err = cluster.Execute(cmd); err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return
	}

	fvc := cmd.(*riak.FetchValueCommand)
	rsp := fvc.Response
	if !(rsp.IsNotFound){

		fmt.Println(string(rsp.Values[0].Value))
	} else {
		fmt.Println("Value not found!")
	}
}
