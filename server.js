const app = require('./app')

require('dotenv').config()

const mongoose = require('mongoose')

const port = process.env.PORT;

(async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongoDB connecte :)) ")
})();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

