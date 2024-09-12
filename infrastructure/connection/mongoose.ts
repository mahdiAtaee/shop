import * as mongoose from "mongoose";
mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_PORT}`
  )
  .then(() => {
    console.log("connection is open...");
  })
  .catch((err) => console.log("faild to connect", err.message));
