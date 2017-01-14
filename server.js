let express = require('express');
let adacorn = require('./routes/routes');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let nunjucks = require('nunjucks');
let session = require('express-session');
let db = require('./models/data');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;


let app = express();
nunjucks.configure('views', {autoescape: true, express: app});

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'semantic')));

app.use(session({secret: 'adaadaada'}));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(db.Member.authenticate()));

passport.serializeUser(db.Member.serializeUser());
passport.deserializeUser(db.Member.deserializeUser());


app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.listen(process.env.PORT||3000, function () {
    console.log('Listening on port 3000');
});



/**Routing functions go here**/
// Get the index page:
app.get('/', (req, res) => {
    //console.log(req.user.username);
    if (req.user !== undefined) {
        // logged in
        adacorn.getDashboard(req, res);
    } else {
        // redirect to login
        res.redirect("/login");
    }
});

app.get('/', adacorn.getDashboard);
app.get('/m', adacorn.getAllMembers);
// app.get('/m/:id', adacorn.getMember);
app.get("/d", adacorn.getAllDepartments);
app.get("/d/:dept", adacorn.getDept)
app.get("/dj", adacorn.parseDeptJSON);

app.get("/e", adacorn.getEvents);

app.get("/a", adacorn.getApplications);

app.get("/n", adacorn.getNotifications);

app.get("/p", adacorn.parseDept);

app.get("/u", adacorn.getProfile);
app.get("/u/:id", adacorn.getProfile);

app.get("/search", adacorn.getSearch);

app.post('/addmember', adacorn.addMember);
app.post('/delete', adacorn.deleteMember);


app.get('/login', (req,res)=> {
    //console.log(req.user);
    if(req.user !== undefined){
        res.redirect('/');
        return;
    }
    res.render('login.html');
});

app.post('/login', adacorn.login);
app.get('/logout', adacorn.logout);

app.get('/initialize', adacorn.initialize);
