const express = require('express');
const SendOtp = require('sendotp');
const ejs     = require('ejs');
const session = require('express-session');
const speakeasy = require('speakeasy');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const sendOtp = new SendOtp('268843ALq15HzQFKnD5c951a77');

app.set('view engine','ejs');                                  //Setting the engine view to ejs 
app.use(express.static(__dirname+'/public/'));                 //Location of static files
app.use(session({
    secret: 'ssshhhh',
    saveUninitialized: false,
    resave: false,
    name: "id"}));

const port= process.env.PORT||4000;                            //Finding assigned port number using environment variable PORT
app.listen(port, () => {
     console.log(`Listening on port ${port}...`);
});

app.get('/',(req,res)=>{
    res.render('form');
});

//Generating random OTP and sending it to user 

app.post('/submitNumber',(req,res)=>{
    req.session.secret=speakeasy.generateSecret({length:20});
    req.session.otp=speakeasy.totp({
         secret: req.session.secret.base32,
         ecoding: "base32"
    });
    sendOtp.send(req.body.number, "Anuj17Singh", req.session.otp, function (error, data) {
        req.session.number=req.body.number;
        res.render('form');
        console.log(req.session.number);
     });
             
});

//Validating the OTP 

app.post('/submit',(req,res)=>{
    if(req.body.pin==req.session.otp)
        res.render('acknowledgement',{res:req.session.number});
    else
        res.render('acknowledgement',{res:null});
});


