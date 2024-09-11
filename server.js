const express = require("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = 'anikethan'
const path=require("path")

const app = express()

let users = []

app.use(express.json())

app.use(express.static(path.join(__dirname,"public")))

app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","views","signup.html"))
})

app.get("/signin",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","views","signin.html"))
})

app.get("/me",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","views","me.html"))
})

app.post('/check-email', (req, res) => {
    const { email } = req.body;
    const userExists = users.some(user => user.email === email)
    res.json({ exists: userExists })
});

app.post("/signup",(req,res)=>{
    const email = req.body.email
    const password= req.body.password

    users.push({email,password})
     res.json({ message: 'Signup successful'})
})

app.post("/signin",(req,res)=>{
    const {email,password}=req.body
    const user = users.find(u=>u.email===email&&u.password===password)

    if(user){
        const token = jwt.sign({
            email:email
        },JWT_SECRET)

        res.json({email:email,token:token})
    }
    else{
        res.status(401).json({message:"invalid credentials"})
    }
})

app.post("/verify",(req,res)=>{
    const token = req.headers.token
    if(!token){
        res.status(401).json({valid:false})
    }

    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json({valid:false})
            }
            else{
                res.json({valid:true,user:decoded})
            }
    })

})


app.listen(4000,()=>{
    console.log("server started on http://localhost:4000/signup")
})