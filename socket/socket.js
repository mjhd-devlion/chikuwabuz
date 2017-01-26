module.exports = function(io){
	io.on("connection", function(socket){

		var connectedUsers = {}
		//var userDetails = {}
		
		// Listens for new user		
socket.on("new_user", function(data){
			// Add each socket to list (for private message)
			socket.user_name = data.user_name
			socket.room      = data.room
			connectedUsers[data.user_name] = socket

			var room = data.room
			//userDetails[socket] = data
			// New user joins the room that they has choosed (clicked)
			socket.join(room)
			// Tell all those in the room that a new user joined
			io.in(room).emit("user_joined", data)
		})

		// Listens for left room
		socket.on("user_left", function(data){
			socket.leave(data.room)
			io.in(data.room).emit("user_left", data)
		})

		// Listens for a new chat message
		socket.on("message", function(data){
			// Create message and save to Database

			// Send message to those connected in the room
			io.in(data.room).emit("message", data)
		})

		// Listens for Private message (Client should send destination user_name)
		socket.on("private_message", function(data){
			// Server will emit the message to destination user
			connectedUsers[data.des_user_name].emit("private_message", data)

		})

		//socket.on("disconnect", function(data) {
		//	io.in(userDetails[socket].room).emit("user_left", userDetails[socket])
			/*delete connectedUsers[userDetails[socket].user_name]
			delete userDetails[socket]*/
		//})

	})
	
	return io;
}
