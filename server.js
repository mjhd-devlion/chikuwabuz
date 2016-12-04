"use strict"

var app = require("./app.js")
var port = Number(/*process.env.PORT || */443)

app.listen(port, function(){
	console.log("Server is running..")
})
