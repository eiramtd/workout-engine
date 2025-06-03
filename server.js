const express = require('express');
require("./auth/mongoConnection.js");  



const userRouter = require('./routes/userRoutes.js');
const managerRouter = require('./routes/managerRoutes.js');


const server = express();
server.use(express.json());;
server.use('/user', userRouter); 
server.use('/manager', managerRouter);  

server.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 
