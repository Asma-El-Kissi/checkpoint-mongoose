//Install & Set up mongoose
require ('dotenv').config();
const mongoose=require ('mongoose');
const express=require('express');
const app = express();
app.use(express.json());
const user=require('./person.js')
const port=5000;
app.listen(port,(err) => err ? console.log(err):console.log(`server is runnning on ${port}`));
// MONGO_URI=mongodb://localhost:27017
const mongouri=process.env.MONGO_URI;
//Connect to the database
mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log('the database is connected')}).catch((err)=>{console.log('the database is not connected')})
//Create a person with this prototype: (name: string [required], age: number,favoriteFoods: array of strings (*) )
let person = new user({
  name:'karim',
  age:30,
  favouriteFoods:['spagetty', 'couscous'],
})
//Create and Save a Record of a Model
person.save()
    .then(doc => {
    console.log(doc)
})
    .catch(err => {
    console.error(err)
})
//Create Many Records with model.create()
let arrayofPeople=[
  {name: 'Karim', age : 30, favouriteFoods:['spagetty', 'couscous']},
  {name: 'Salwa', age : 20, favouriteFoods:['salad', 'soup','sandwich']},
  {name: 'Iheb', age : 25, favouriteFoods:['mosli', 'salad']},
]
user.create(arrayofPeople);
//Find all the people having a given name
user.find({name:'Karim'});
// Find just one person which has a certain food in the person's favorites
user.findOne({favouriteFoods:'mosli'});
//Find the (only!!) person having a given _id
user.find(); //pour afficher la base avec les Ids
user.findById("628b9329d152c36b3b6c89ce");
//Find a person by _id. Add "hamburger" to the list of the person's favoriteFoods.
user.findById("628b9329d152c36b3b6c89ce",(err,data)=>{
if (err) {console.log(err);}
data.favouriteFoods.push('hamburguer');
data.save((error)=>{
  if (error) console.log(error);
})
});
// Find a person by Name and set the person's age to 20
user.findOneAndUpdate({name:"karim"},{age:20},{new:true},(err,data)=>{
if (err) {console.log(err);}
done(null, data);
});
// Delete one person by the person's _id.
user.findByIdAndRemove("628b9329d152c36b3b6c89ce",(err,data)=>{
  if (err) {console.log(err);}
  else console.log("Removed user : ", data);
});
//Delete all the people whose name is “Mary”
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  user.remove({name: nameToRemove}, (err, data) => {
  if (err) {
    console.log(err);
    }
  done(null, data);
  });
};
// Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age
const queryChain = (done) => {
  const foodToSearch = "burrito";
  user.find({favouriteFoods: foodToSearch})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) {
        console.error(err);
      }  
      done(null, data);
      });
};  







