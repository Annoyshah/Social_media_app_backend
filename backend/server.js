const app = require('./app');
const { connectDatabase } = require('./config/database');
connectDatabase();

if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config({path : "backend/config/config.env"})
}
app.listen(process.env.PORT , ()=>{
  console.log(`Server is listening on PORT ${process.env.PORT}`)
});