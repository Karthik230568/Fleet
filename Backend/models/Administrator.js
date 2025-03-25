const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  password: { type: String, required: true },
  contactInfo: { type: String, required: true },
});
const Administrator= mongoose.model('Administrator', AdminSchema)
module.exports = Administrator;

// const newAdmin = new Administrator({ name: "John Doe", email: "johndoe@example.com", city:"kanpur",password:"password",contactInfo:"phone number" });

// newAdmin.save()
//    .then(() => console.log("User added successfully"))
//    .catch(err => console.error(err));