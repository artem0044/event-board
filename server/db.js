import mongoose from "mongoose";

const connectToDB = () => {
  mongoose.connect('mongodb+srv://artem:password123456@eventboardcluster.3igxagj.mongodb.net/?retryWrites=true&w=majority&appName=eventBoardCluster')
    .then(() => console.log('Connect to DB'))
    .catch(err => console.log(err));
}

export default connectToDB;
