require("dotenv").config();
const express = require("express");
const app = express();
const databaseConnection = require("./Database/database");

const authRoutes = require("./Routes/authRoutes");
const crudRoutes = require("./Routes/crudRoutes")

databaseConnection();


app.use(express.json());  
app.use(express.urlencoded({extended:true})); 
app.use("/auth" , authRoutes);
app.use("/blog" , crudRoutes);





const port = process.env.PORT || 3000 ;
app.listen(port , ()=>{
    console.log(`Server is listening on the port ${port}`)
})