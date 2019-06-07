const connection = require("../models/connection");
const Schema = connection.Schema;
const userSchema = new Schema({
    googleId:String,
    username:String,
    pic:String,
    email:String,
});
const UserModel = connection.model('app',userSchema);
module.exports=UserModel;