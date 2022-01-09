const express = require("express"); //express is a framework check google.
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser") //middleware.  

const { stringify } = require("querystring");

main().catch(err => console.log(err)); //start mongod by yourself otherwisw it wont connect.

async function main() {
    mongoose.connect('mongodb://localhost:27017/sragym');
}
const port = 80;

const gymSchema = new mongoose.Schema({ //this is schema which is basically the design of the database. if u want to add more data you have to change schema.
    name: String,
    age: Number,
    gender: String,
    address: String,
    more: String

});

const gym = mongoose.model('gym', gymSchema); //model is collection ...gym is the collection name.

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('public')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
        const con = "This is the best content on the internet so far so use it wisely"

        res.status(200).render('index.pug');
    })
    //for save the data
app.post('/', (req, res) => {
    var mydata = new gym(req.body);
    mydata.save().then(() => {
            res.send("Data  is Saved")
        }).catch(() => {
            res.status(400).send("Data does not get saved")

        })
        // res.status(200).render('index.pug', );
})

//the data u save taken from index.pug

app.post('/', (req, res) => {
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more

    //if u need to print data in output.txt then use below lines.first create output.txt file under same.

    //let outputToWrite = `the name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`
    //fs.writeFileSync('output.txt', outputToWrite)
    //const params = { 'message': 'Your form has been submitted successfully' }
    //res.status(200).render('index.pug', params);

})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});