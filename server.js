let express = require('express');
let sys = require('./routes/routes');
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
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(db.User.authenticate()));

// passport.serializeUser(db.User.serializeUser());
// passport.deserializeUser(db.User.deserializeUser());


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
// app.get('/', (req, res) => {
//     //console.log(req.user.username);
//     if (req.user !== undefined) {
//         // logged in
//     } else {
//         // redirect to login
//         sys.getAllMembers
//     }
// });
app.get('/', sys.getDashboard);
app.get('/m', sys.getAllMembers);
// app.get('/m/:id', sys.getMember);
app.get("/d", sys.getAllDepartments);
app.get("/d/:dept", sys.getDept)
app.get("/dj", sys.parseDeptJSON);

app.get("/e", sys.getEvents);

app.get("/a", sys.getApplications);

app.get("/n", sys.getNotifications);

app.get("/p", sys.parseDept);

app.get("/u", sys.getProfile);
app.get("/u/:id", sys.getProfile);

app.get("/search", sys.getSearch);

app.post('/addmember', sys.addMember);
app.post('/delete', sys.deleteMember);


// app.get('/login', (req,res)=> {
//     //console.log(req.user);
//     if(req.user !== undefined){
//         res.redirect('/');
//         return;
//     }
//     res.render('login.html');
// });
//
// app.get('/signup', (req, res)=>{
//     if(req.user !== undefined){
//         res.redirect('/');
//     } else {
//         console.log("get signup");
//         res.render('signup.html');
//     }
//
// });
// app.post('/signup', sys.signUp);
// app.delete('/account',sys.deleteAccount);
// app.get('/u/:username', sys.getUser);
// app.get('/settings',  (req,res) => {
//     if(req.user == undefined){
//         res.redirect('/');
//     } else {
//         console.log("get settings");
//         res.render('settings.html', {user:req.user});
//     }
// });
//
// app.post('/login', sys.logIn);
// app.get('/logout', sys.logOut);
//
// app.get('/e/:event', sys.getEvent);
// // app.get('/event', sys.getEvent);
// app.post('/event', sys.addEvent);
// app.delete('/event', sys.deleteEvent);
// app.post('/events',sys.getAllEvents);
// app.post('/editevent', sys.editEvent);
// app.post('/changepassword', sys.changePassword);
// app.get('/edit/:event', sys.getEditEvent);
//
// app.post('/plusone',sys.plusOne);
//
// app.get('/search', (req,res) => {
//     if(req.user == undefined){
//         res.redirect('/');
//     } else {
//         console.log("get search");
//         res.render('search.html', {user:req.user});
//     }
// });
//
// app.get('/admin', sys.getAdmin);
//
// app.post('/search',sys.search);
//
// app.post('/comment', sys.comment);
// app.delete('/comment', sys.deleteComment);
//
// app.post('/profile',sys.editProfile);
// app.post('/follow',sys.follow);
// app.post('/unfollow',sys.unFollow);
//
// app.delete('/users', sys.deleteUsers);
//
// app.all('*', function(req, res) {
//   res.render("notFound.html", {
//       user:req.user,
//       error: "Error: 404 Not Found"
//   });
// });
