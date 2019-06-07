const express= require("express")
const app =express();
const coockieSession=require("cookie-session");
const userRoute =require("./routes/user");
app.use(express.static("public"));

const googleSetup = require("./utils/googlePassport");
const passport =require("passport");

app.use(coockieSession({
    maxAge:24*60*60*1000,
    keys:['thismagiccode']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',userRoute);
app.set('view engine','ejs');






app.listen(process.env.PORT || 3000,()=>{
console.log("start srever");
});
