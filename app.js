//mongod --dbpath /usr/local/Cellar/mongodb/2.6.3/data/db
var http = require('http'),
    express = require('express'),
    path = require('path'),

    MongoDbServer = require('mongodb').Server,
    MongoClient = require('mongodb').MongoClient,
    dbSchema = require("./db-schema");

    var app = express();
    //app.set('views', path.join(__dirname, 'views'));
	  //app.set('view engine', 'jade');
    app.use(express.bodyParser()); // <-- add
    var server = http.createServer(app);
 
server.listen(5050);
// app.set('port', process.env.PORT || 3000); 
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.bodyParser()); // <-- add

var mongoHost = 'localhost'; //A
var mongoPort = 27017; 
var collectionDriver;

var mongoClient = new MongoClient(new MongoDbServer(mongoHost, mongoPort)); //B
mongoClient.open(function(err, mongoClient) { //C //mongod --dbpath /usr/local/Cellar/mongodb/2.6.3/data/db
  if (!mongoClient) {
      console.error("Error! Exiting... Must start MongoDB first");
      process.exit(1); //D
  }
  var db = mongoClient.db("reader");
  dbSchema.getDB(db);
});

//app.use(express.static(path.join(__dirname, 'public')));
 
//Get data from DB
app.get('/importData', function (req, res){
  dbSchema.importData(req, res);
})
app.get('/', function (req, res) {
	console.log("Hi");
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

app.get('/books', function (req, res) {
	dbSchema.getBooks(req, res);
});

app.get('/books/:id', function (req, res) {
	dbSchema.getBook(req, res);
});


app.get('/pages', function(req,res){
  dbSchema.getPages(req,res);
});

app.get('/users', function (req, res) {
  dbSchema.getUsers(req, res);
});

app.get('/users/:id', function (req, res) {
  dbSchema.getUsers(req, res);
});


app.get('/findBookFromPage/:bookId', function (req, res) {
  dbSchema.findBookFromPage(req, res);
});


app.get('/findPageFromRecentAccessInfo/:userId/:bookId', function(req, res) {
  dbSchema.findPageFromRecentAccessInfo(req, res);
})

app.get('/findBookFromLearingParams', function(req, res) {
  dbSchema.findBookFromLearingParams(req,res);
})

app.get('/findUserAndBookFromLearingParams/:accessId', function(req, res) {
  dbSchema.findUserAndBookFromLearingParams(req,res);
})

app.get('/findAliveUserAndBookFromLearingParams/:accessId', function(req,res) {
  dbSchema.findAliveUserAndBookFromLearingParams(req,res);
})

app.get('/userPreference/:id', function (req, res) {
  dbSchema.getUserPreferences(req, res);
});

app.get('/recentAccessInfo/:uid/:bookid', function (req,res) {
  dbSchema.getRecentAccessInfo(req, res);
})

app.get("/learningParams", function(req,res) {
  dbSchema.getLearingParams(req,res);
});

app.get("/highlight", function (req, res) {
  dbSchema.getHighlight(req,res);
})

app.get('/getHighlightFromPageAndUser/:pageId/:userId' , function(req, res) {
  dbSchema.getHighlightFromPageAndUser(req, res);
})

app.get('/getHighlightFromGuid/:guid' , function(req, res) {
  dbSchema.getHighlightFromGuid(req, res);
})

app.get('/getHighlightFromId/:id', function (req, res) {
  dbSchema.getHighlightId(req, res);
})

app.get('/getHighlightFromBookAndUser/:bookId/:userId', function(req, res) {
  dbSchema.getHighlightFromBookAndUser(req, res);
})

app.get('/note', function (req, res) {
  dbSchema.getNotes(req, res);
})

app.get('/getNotesFromPage/:pageId', function (req, res) {
  dbSchema.getNotesFromPage(req, res);
})


app.get('/getNotesFromBookAndUser/:bookId/:userId', function (req, res) {
  dbSchema.getNotesFromBookAndUser(req, res);
})

app.get('/getNotesFromPageAndUser/:pageId/:userId', function (req, res) {
  dbSchema.getNotesFromPageAndUser(req, res);
})

app.get('/getNoteFromId/:id', function (req, res) {
  dbSchema.getNoteId(req, res);
})

app.get('/bookmark', function (req, res) {
  dbSchema.getBookmark(req, res);
})

app.get('/getBookmarksFromPage/:pageId', function (req, res) {
  dbSchema.getBookmarksFromPage(req, res);
})

app.get('/getBookmarksFromBookAndUser/:bookId/:userId', function (req, res) {
  dbSchema.getBookmarksFromBookAndUser(req, res);
})

app.get('/getBookmarkFromPageAndUser/:pageId/:userId', function (req, res) {
  dbSchema.getBookmarkFromPageAndUser(req, res);
})

app.get('/getBookmarkFromId/:id', function (req, res) {
  dbSchema.getBookmarkId(req, res);
})

app.get('/device', function(req,res) {
  dbSchema.getDevice(req, res);
})

app.get('/getPagePrintingCountersDetail/:id', function(req,res) {
  dbSchema.getPagePrintingCountersDetail(req, res);
})

//Post Data
app.post("/users", function(req, res) {
  var object = req.body;
  dbSchema.insertUser(object);
  res.send("");
});

app.post("/books", function(req, res) {
  var object = req.body;
  dbSchema.insertBook(object);
  res.send("");
});

app.post("/pages", function(req, res) {
  var object = req.body;
  dbSchema.insertPage(object);
  res.send("");
});


app.post("/userPreference", function (req, res){
  var object = req.body;
  dbSchema.insertUserPreferences(object);
  res.send("");
});


app.post("/recentAccessInfo", function (req, res) {
  var object = req.body;
  dbSchema.insertRecentAccessInfo(object);
  res.send("");
});

app.post("/learningParams", function(req, res) {
  var object = req.body;
  dbSchema.insertLearningParams(object);
  res.send("");
})

app.post("/highlight", function (req, res) {
  var object = req.body;
  dbSchema.insertHighlight(object);
  res.send("");
})

app.post("/note" , function (req,res) {
  var object = req.body;
  dbSchema.insertNote(object);
  res.send("");
})

app.post("/bookmark" , function (req, res) {
  var object = req.body;
  dbSchema.insertBookmark(object);
  res.send("");
});

app.post('/device',function(req, res) {
  var object = req.body;
  dbSchema.insertDevice(object);
  res.send("");
})

app.post('/PagePrintingCountersDetail', function(req, res) {
  var object = req.body;
  dbSchema.insertPagePrintingCountersDetail(object);
  res.send("");
})

app.post('/PagePrintDetails', function(req, res) {
  var object = req.body;
  dbSchema.insertPagePrintDetails(object);
  res.send("");
})



//Update query

app.post('/updateRecentAccessInfoById', function(req, res) {
  var object = req.body;
  dbSchema.updateRecentAccessInfoById(object);
  res.send("");
})

app.post('/updateBookById', function(req, res) {
  var object = req.body;
  dbSchema.updateBookById(object);
  res.send("");
})

app.post('/updateLearningParamsById', function(req, res) {
  var object = req.body;
  dbSchema.updateLearningParamsById(object);
  res.send("");
})

app.post('/updateUserById', function(req, res) {
  var object = req.body;
  dbSchema.updateUserById(object);
  res.send("");
})

app.post('/updateHighlightById', function(req, res) {
  var object = req.body;
  dbSchema.updateHighlightById(object);
  res.send("");
})

app.post('/updateBookmarkById', function(req, res) {
  var object = req.body;
  dbSchema.updateBookmarkById(object);
  res.send("");
})

app.post('/updateNoteById', function(req, res) {
  var object = req.body;
  dbSchema.updateNoteById(object);
  res.send("");
})

app.post('/updatePagePrintCounterById', function(req, res) {
  var object = req.body;
  dbSchema.updatePagePrintCounterById(object);
  res.send("");
})


app.post('/updateUserPreferenceById', function(req, res) {
  var object = req.body;
  dbSchema.updateUserPreferenceById(object);
  res.send("");
})









