const express = require('express');
require("./auth/mongoConnection.js");  



const userRouter = require('./routes/userRoutes.js');


const server = express();
server.use(express.json());;
server.use('/user', userRouter); 

server.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 
