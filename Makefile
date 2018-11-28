go-get:
	rm -rf src/github.com
	go get -v github.com/basho/riak-go-client
build:
	go build 
start:
	./fa18-281-cloudy-spartans
test-riak:
	curl -i http://10.0.1.218:8098/types/ccs/buckets/users/keys/admin

