const mongoose = require('mongoose');

 const todoSchema = mongoose.Schema({
   name: {type: String, required: true}
 })

 todoSchema.methods.serialize = function () {
   return {
     name: this.name
   }
 }

 const ToDo = mongoose.model('ToDo', todoSchema);

 module.exports = {ToDo};