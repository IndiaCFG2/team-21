const express = require('express')
const app = express()

const mongo = require('mongoose')

const cors = require('cors')
app.use(cors());

const ejs = require('ejs')
app.set("view engine", "ejs");

const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


const User = require('./db/models/userModel')

require('dotenv').config();

const jwt = require('jsonwebtoken');

const dbconfig = process.env.DB
mongo.connect(dbconfig,{ 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
})
.then(data=>{ console.log('connected to db') })
.catch(err=>{  console.log(err) });


app.get('/',(req,res)=>{
    res.send('yooooooo')
})

function verifyToken(req,res,next)
{
  if(!req.headers.authorization)
    return res.status(401).json({ success: false, message: 'unauthorized access' });
  let token = req.headers.authorization.split(' ')[1];
  if(token==null)
  return res.status(401).json({ success: false, message: 'unauthorized access' });
   jwt.verify(token,process.env.TOKEN_SECRET,(err, payload)=> {
    if (err) {
        console.log(err)
        return res.json({ success: false, message: 'Failed to authenticate token.' });
    } else {
        // if everything is good, save to request for use in other routes
        req.userId = payload.subject;
        User.findById(payload.subject,(err,user)=>{
            if(err){console.log(err)}
            else if(user.session[0]==token ||user.session[1]==token  )
            {
                next()
            }
            else
            {
                return res.status(401).json({ success: false, message: 'unauthorized access' });
            }
        })
    }
});
  
}

const auth = require('./routes/authRoute');
app.use('/api/auth',auth)

// const browse = require('./routes/browseRoutes');
// app.use('./api/browse',browse)

app.get('/user/data',verifyToken,(req,res)=>{
    res.send('yoooooo')
})

app.listen(process.env.PORT,()=>{
    console.log('running on ',process.env.PORT)
})

