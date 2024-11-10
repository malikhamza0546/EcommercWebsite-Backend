const app = require(".");
const PORT= 3000;
const   {connectDb}  = require("./config/db.js");
app.listen(PORT,async ()=>{
    await connectDb();
    console.log(`Ecommerce API listening on Port ${PORT}`);
})