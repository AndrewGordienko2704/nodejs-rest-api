const app = require('./app');

const mongoose = require("mongoos");

// const DB_HOST = "mongodb+srv://Andrew:Drun4ik7@cluster0.m4uu0ed.mongodb.net/?retryWrites=true&w=majority";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


