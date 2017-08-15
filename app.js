var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var seedDB      = require("./seeds");
var passport    = require("passport");
var LocalStratergy = require("passport-local");
var User        = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

//REQUIRING ROUTE FILES
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");


    mongoose.connect("mongodb://localhost/yelp_camp_v10");
    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine","ejs");
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));
    app.use(flash());
    
// seed the DB
//seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "greates dog bruno",
    resave: false,
    saveUniinitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next()
    });

//=============================
//PREFIX TO THE ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server started");
    });