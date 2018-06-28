const express = require('express')
app = express()
mongoose = require('mongoose')
var resultModel = require("./models/result-model")

var questionModel = require("./models/questions-model")
var subjectModel = require("./models/subject-model")



databaseName = 'oes'
bodyParser = require('body-parser')
var userModel = require("./models/user-model")

let questions = null;
let subjects = null;


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static(__dirname + '/src'))

//////////////////////////////////
//      allow Cross domain     //
////////////////////////////////

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,")
    res.header("Access-Control-Allow-Headers", "Content-Type");
    let authCache = {}

    next();
});
app.get('/get-courses', (req, res) => {
    courses = [
        {
            "id": "web-tech-1",
            "name": "Web Technology",
            "routerLink": "/tests/web-technology",
            "img": "/assets/images/courses/wt.jpg"
        }
    ]
    res.send(courses)
})

app.post("/add-question", (req, res) => {
    //call save to mongodb

    new questionModel(req.body).save((me, md) => {
        res.send(me || md)
    })


})
app.get("/get-questions-list", (req, res) => {

    questionModel.find(req.query, (me, md) => {
        console.log(me, md, md.length)
        if (!me && md.length > 0) {
            res.send({ questions: md, duration: 30 * 60 })
        }
        else {
            res.send({ ok: false })
        }
    })
})


app.post("/submit-result", (req, res) => {
    console.log(req.body)
    new resultModel(req.body).save((me, md) => {
        res.send(me || md)
    })
})


app.post('/attempt-login', function (req, res) {
    console.log(req.body)

    userModel.find(req.body, (me, md) => {
        console.log(me, md, md.length)
        if (!me && md.length > 0) {
            res.send({ ok: true, quizToken: Math.random().toString(25), userId: md[0]._id })
        }
        else {
            res.send({ ok: false })
        }
    })

})



app.post('/register', function (req, res) {
    console.log(req.body)
    new userModel(req.body).save((me, md) => {
        console.log(me, md, md.id)
        if (!me && md.id) {
            res.send({ ok: true })
        }
        else {
            res.send({ ok: false })
        }
    })

})


app.post("/add-subject", (req, res) => {
    //call save to mongodb

    new subjectModel(req.body).save((me, md) => {
        res.send(me || md)
    })
})

app.get("/get-subject-list", (req, res) => {

    subjectModel.find(req.query, (me, md) => {
        console.log(me, md, md.length)
        if (!me && md.length > 0) {
            res.send(md)
        }
        else {
            res.send({ ok: false })
        }
    })
})



app.get("/get-subject-result", (req, res) => {

    resultModel.find(req.query, (me, md) => {
        console.log(me, md, md.length)
        let expandedObject = {}
        finalResult = []
        md.forEach(one => {
            expandedObject = JSON.parse(JSON.stringify(one))
            console.log(expandedObject)
            let count =0;
            userModel.findOne({ _id: expandedObject.userId }, (userError, userData) => {
                expandedObject.userDetails = userData
                let isFound = false;
                finalResult.forEach(one => {
                    
                    if(expandedObject.quizToken == one.quizToken)
                    {
                        isFound = true
                    }
                });
                if(!isFound){
                    finalResult.push(expandedObject)
                }
                count++
                if (finalResult.length == count) {
                    if (!me && md.length > 0) {
                        res.send(finalResult)
                    }
                    else {
                        res.send({ ok: false })
                    }
                }
            })

        });


    })
})



app.delete("/remove-result", (req, res) =>{
    filter = req.query || {}
    delete filter.meta
    resultModel.remove(filter, (me, md) => {
        if (!me && md) {
            res.send(md)
        }
        else {
            res.send(me)
        }
    })
})

//connection to mongoose
mongoose.connect('mongodb://localhost/' + databaseName)
var db = mongoose.connection;
mongoose.set("debug", true)
db.on('error', console.error);
db.once('open', startServer);

//start up the server

function startServer() {
    var server = app.listen(3000, () => console.log('Example app listening on port 3000!'))

}





