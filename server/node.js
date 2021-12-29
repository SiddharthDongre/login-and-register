import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const hostName = "127.0.0.1";
const port = process.env.PORT || 9002;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Mongoose Connection
mongoose.connect("mongodb://localhost:27017/sidd", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;

db.on("error", () => {
    console.error.bind(console, "Connection erroe : ");
});

db.once("open", () => {
    console.log("we are connected");
});

// Mongoose Schema, Models and Documents
const registerSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    reEnterPassword : String
})

const registerCollection = mongoose.model("model", registerSchema);

// Routers
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/register", (req, res) => {
    const { name, email, password, reEnterPassword } = req.body;

    registerCollection.findOne({email : email}, (err, user) => {
        if(err){
            res.send({ message : "Data not submitted", err : err })
        }
        else if(user){
            res.send({ message : "User already registered" });
        }
        else {
            let registerDocument = new registerCollection({
                name : name,
                email : email,
                password : password,
                reEnterPassword : reEnterPassword
            });
        
            registerDocument.save((err, data) => {
                if(err){
                    res.send({ message : "some error occured", err : err });
                }
                else {
                    res.send({ message : "successfully submitted", data : data });
                }
            });
        }
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    registerCollection.findOne({email : email}, (err, user) => {
        if(err){
            res.send({ message : "Some error occured" });
        }
        else if(user && user.password !== password){
            res.send({ message : "Incorrect password" });
        }
        else if(user && user.password === password){
            res.send({ message : "Login Successfully", user : user });
        }
        else{
            res.send({ message : "User not registered" });
        }
    })
})

// Server
app.listen(port, hostName, () => {
    console.log(`Server is listening on port http://${hostName}:${port}`);
});