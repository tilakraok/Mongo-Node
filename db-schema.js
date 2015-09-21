var mongoose = require('mongoose');
var Q = require('./q.min'); 
mongoose.connect('mongodb://localhost/reader');


var getDB = function(db){ 
	this.db = db; 
}; 

//User schema
var userSchema = mongoose.Schema({ 
					_id: {type: Number, required: true}, 
	                uid: {type: String, required: true}, 
	                createdAt: {type: Date, required: true},
	                updatedAt: {type: Date, required: true},
	                last_synced_usn: Number,
	                learningParams: [{type: mongoose.Schema.Types.ObjectId, ref: 'LearningParams'}],
	                highlight: [{type: mongoose.Schema.Types.ObjectId, ref: "Highlights"}]
	            });
var Users = mongoose.model('Users', userSchema, 'Users');

// Books schema
var bookSchema = mongoose.Schema({ 
					_id: {type: Number, required: true}, 
	                path: {type: String, required: true}, 
	                title:{type: String, required: true}, 
	                createdAt: {type: Date, required: true},
	                updatedAt: {type: Date, required: true}, 
	                zipMD5Hash: String, 
	                key: String,
	                page: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pages'}],
	                learningParams: [{type: mongoose.Schema.Types.ObjectId, ref: 'LearningParams'}]
	            });
var Books = mongoose.model('Books', bookSchema, 'Books');

//UserPreference Schema
var userPreferenceSchema = mongoose.Schema({
					_id: {type: Number, required: true},
					UserId: {type: Number, required: true}, 
					highlightColor: {type: String, required: true},
					fontSize: {type: Number, required: true}, 
					fontStyle: {type: String, required: true}, 
					createdAt: {type: Date, required: true}, 
					updatedAt: {type: Date, required: true},
					customHighlightColor: String, 
					language: {type: String, required: true, default: "en-US"}
				});
var UserPreferences = mongoose.model('UserPreferences',userPreferenceSchema, 'UserPreferences');

//Device schema
var deviceSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					UserId: {type: Number, required: true}, 
					deviceId: String, 
					createdAt:{type: Date, required: true},
					updatedAt: {type: Date, required: true}, 
					authToken: String, 
					deviceName: String
				});
var Devices = mongoose.model('Devices',deviceSchema,'Devices');

//Pages schema 
var pagesSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					pageSrc: {type: String, required: true}, 
					pageTitle: {type: String, required: true},
					BookId: {type: Number,required: true, ref: 'Books'},
					pageNumber: {type: String, required: true}, 
					createdAt: {type: Date, required: true},
					updatedAt: {type: Date, required: true},
					notes: {type: mongoose.Schema.Types.ObjectId, ref: "Notes"},
					highlight: [{type: mongoose.Schema.Types.ObjectId, ref: "Highlights"}],
					bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: "Bookmarks"}],
					recentAccessInfo: [{type: mongoose.Schema.Types.ObjectId, ref: "RecentAccessInfo"}]
				});
var Pages = mongoose.model('Pages',pagesSchema, 'Pages');

//Bookmarks schema
var bookmarksSchema = mongoose.Schema({
					_id:{type: Number, required: true}, 
					UserId: {type: Number, required: true},
					PageId: {type: Number, required: true, ref: "Pages"}, 
					title:{type: String, required: true}, 
					indexed:{type: Boolean, required: true}, 
					deleted:{type: Boolean, required: true}, 
					createdAt:{type: Date, required: true}, 
					updatedAt: {type: Date, required: true}, 
					usn:Number, 
					guid: String 
				});
var Bookmarks = mongoose.model('Bookmarks',bookmarksSchema, 'Bookmarks');

//Highlight schema
var highlightsSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					startOffset: {type: Number, required: true},
					endOffset: {type: Number, required: true}, 
					selectedText: {type: String, required: true}, 
					highlightComment: String, 
					colorOverride: String, 
					UserId: {type: Number, required: true, ref: "Users"}, 
					PageId: {type: Number, required: true, ref: "Pages"},
					indexed: {type: Boolean, required: true}, 
					deleted: {type: Boolean, required: true}, 
					createdAt: {type: Date, required: true},
					updatedAt: {type: Date, required: true}, 
					usn:Number, 
					guid: String
				});
var Highlights = mongoose.model('Highlights',highlightsSchema, 'Highlights');

//LearningParams schema 
var learningParamsSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					accessId: {type: String, required: true}, 
					BookId: {type: Number, ref: 'Books', required: true}, 
					UserId: {type: Number, ref: 'Users', required: true}, 
					devAccessId: String, 
					isAlive: {type: Boolean, required: true, default: 0}, 
					lastUserActivityTime: Date, 
					createdAt:{type: Date, required: true}, 
					updatedAt: {type: Date, required: true},
					isConnected: {type: Boolean, required: true, default: 0}
				});
var LearningParams = mongoose.model('LearningParams',learningParamsSchema, 'LearningParams');

//Notes Schema 
var notesSchema = mongoose.Schema({
					_id: {type: Number, required: true},
					UserId: {type: Number, required: true},
					PageId: {type: Number, required: true, ref : "Pages"},
					comments: {type: String, required: true},
					indexed: {type: Boolean, required: true}, 
					deleted: {type: Boolean, required: true}, 
					createdAt: {type: Date, required: true},
					updatedAt: {type: Date, required: true}, 
					usn:Number, 
					guid: String
});
var Notes = mongoose.model('Notes', notesSchema,'Notes');

//RecentAccessInfo schema
var recentAccessInfoSchema = mongoose.Schema({
					_id: {type: Number, required: true},
					UserId: Number,
					BookId: Number, 
					PageId: {type: Number, ref: "Pages"},
					createdAt:Date, 
					updatedAt: Date
				});
var RecentAccessInfo = mongoose.model('RecentAccessInfo',recentAccessInfoSchema, 'RecentAccessInfo');

//PagePrintDetail Schema
var pagePrintDetailSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					UserId: {type: Number, required: true},
					BookId: {type: Number, required: true}, 
					accessId: {type: String, required: true},
					pageSrc: {type: String, required: true},
					PrintedAt : {type: Date, required: true},
					createdAt: {type: Date, required: true}, 
					updatedAt: {type: Date, required: true}
				});
var PagePrintDetails = mongoose.model("PagePrintDetails", pagePrintDetailSchema,'PagePrintDetails');

//PagePrintingCounters Schema
var pagePrintingCountersSchema = mongoose.Schema({
					_id: {type: Number, required: true},  
					UserId: {type: Number, required: true},
					BookId: {type: Number, required: true},
					printCount: {type: Number, required: true},
					createdAt: {type: Date, required: true}, 
					updatedAt: {type: Date, required: true}
				});
var PagePrintingCounters = mongoose.model('PagePrintingCounters',pagePrintingCountersSchema, 'PagePrintingCounters');


// Users
var insertUser = function(objUser){
	objUser.createdAt = new Date();
	objUser.updatedAt = new Date();
	var user = new Users(objUser);
	user.save(function (err, user) {
	  if (err) return console.error(err);
	  console.log("Saved");
	});
};

var getUsers = function(req, res){
	Users.find({}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
};

// Books
var insertBook = function(objBook){
	objBook.createdAt = new Date();
	objBook.updatedAt = new Date();
	var book = new Books(objBook);
	book.save(function (err, book) {
	  if (err) return console.error(err);
	  console.log("book Saved");
	});
};

var getBooks = function(req, res){
	Books.find({}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
};

var getBook = function(req, res){
	Books.findOne({"_id": req.params.id}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
};

//UserPreferences
var insertUserPreferences = function(objUserPreference) {
	objUserPreference.createdAt = new Date();
	objUserPreference.updatedAt = new Date();
	var userPref = new UserPreferences(objUserPreference);
	userPref.save(function(err, userPref1 ) {
		if (err) return console.error(err);
		console.log("UserPreference Saved");
	});
}

var getUserPreferences = function(req, res) {
	UserPreferences.find({_id: req.params.id}, function(err, result) {
		if(err) {
			res.send(400, error);
		} else {
			res.send(result);
		}
	})
}

//RecenetAccessInfo
var insertRecentAccessInfo = function ( objRecentInfo) {
	objRecentInfo.createdAt = new Date();
	objRecentInfo.updatedAt = new Date();
	var recentInfo = new RecentAccessInfo(objRecentInfo);
	recentInfo.save(function(err, recentInfo1) {
		if (err) return console.error(err);
		console.log("RecentAccessInfo saved");
	})
}

var getRecentAccessInfo = function(req, res) {
	RecentAccessInfo.find({UserId: req.params.uid , BookId: req.params.bookid},function(err, result) {
		if(err) {
			res.send(400, error);
		} else {
			res.send(result);
		}
	})
}

var findPageFromRecentAccessInfo = function(req, res) {
	RecentAccessInfo.findOne({UserId: req.params.userId, BookId:req.params.bookId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else {
			 res.send(JSON.parse(JSON.stringify(result)));
		}
	});
}

//Highlight
var insertHighlight = function(objHighlight) {
	objHighlight.createdAt = new Date();
	objHighlight.updatedAt = new Date();

	var highlight = new Highlights(objHighlight);
	highlight.save(function(err, results) {
		if (err) return console.error(err);
		console.log("Highlights saved");
	})
}

var getHighlight = function(req, res) {
	Highlights.find({}, function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getHighlightId = function(req, res) {
	Highlights.find({_id:req.params.id}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}


var getHighlightFromPageAndUser = function(req, res) {
	Highlights.find({PageId: req.params.pageId, UserId: req.params.userId}).populate("PageId UserId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getHighlightFromBookAndUser = function(req, res) { // BookId, UserId
	Pages.find({BookId: req.params.bookId}).exec(function(err, result){
		if (err) { res.send(400, err); }
		else
		{
			// calculate PageId's
			var arrPageId = [];
			for(var i=0;i<result.length;i++)
			{
				arrPageId.push(result[i]._id);
			}

			Highlights.find({PageId: {$in: arrPageId}, UserId: req.params.userId}).populate("PageId UserId").exec(function(err, result) {
				if (err) { res.send(400, err); }
				else { 
		          res.send(result);
		         }
			});
		}
	});
}

var getHighlightFromGuid = function(req, res) {
	Highlights.find({guid: req.params.guid}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

//Page
var insertPage = function(objPage) {
	objPage.createdAt = new Date();
	var page = new Pages(objPage);
	page.save(function (err, book) {
	  if (err) return console.error(err);
	  console.log("Saved to pages");
	});
}

var getPages = function(req, res) {
	console.log("Inside get")
	Pages.find({}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
}


var findBookFromPage = function(req, res) {
	Pages.find({BookId:req.params.bookId}).populate('BookId').exec(function(err, page){
		if (err) { res.send(400, err); }
		else {
			 res.send(JSON.parse(JSON.stringify(page)));
		}
	})
}


//LearningParams
var getLearingParams = function (req, res) {
	LearningParams.find({}, function(err, result) {
		if(err) {
			res.send(400, error);
		} else {
			res.send(result);
		}
	})
}


var insertLearningParams = function(objLearingParam) {
	objLearingParam.createdAt = new Date();
	objLearingParam.updatedAt = new Date();

	var learningParams = new LearningParams(objLearingParam);
	learningParams.save(function(err, result) {
		if (err) return console.error(err);
	  	console.log("Saved to LearningParams");
	});	
}

var findUserAndBookFromLearingParams = function(req, res) {
	LearningParams.find({accessId:req.params.accessId}).populate("UserId BookId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else {
			 res.send(JSON.parse(JSON.stringify(result)));
		}
	});
}

var findAliveUserAndBookFromLearingParams = function(req, res) {
	LearningParams.find({accessId:req.params.accessId, isAlive:1}).populate("UserId BookId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else {
			 res.send(JSON.parse(JSON.stringify(result)));
		}
	});
}

//Notes
var insertNote = function(objNote) {
	objNote.createdAt = new Date();
	objNote.updatedAt = new Date();

	var note = new Notes(objNote);
	note.save(function(err, results) {
		if (err) return console.error(err);
		console.log("Notes saved");
	})
}

var getNotes = function(req, res) {
	Notes.find({}, function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getNotesFromPage = function (req, res) {
	Notes.find({PageId: req.params.pageId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
        }
	});
}

var getNotesFromPageAndUser = function(req, res) {
	Notes.find({PageId: req.params.pageId, UserId: req.params.userId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getNoteId = function(req, res) {
	Notes.find({_id:req.params.id}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getNotesFromBookAndUser = function(req, res) { // BookId, UserId
	Pages.find({BookId: req.params.bookId}).exec(function(err, result){
		if (err) { res.send(400, err); }
		else
		{
			// calculate PageId's
			var arrPageId = [];
			for(var i=0;i<result.length;i++)
			{
				arrPageId.push(result[i]._id);
			}

			Notes.find({PageId: {$in: arrPageId}, UserId: req.params.userId}).populate("PageId").exec(function(err, result) {
				if (err) { res.send(400, err); }
				else { 
		          res.send(result);
		         }
			});
		}
	});
}

//Bookmarks
var insertBookmark = function(objBookmark) {
	objBookmark.createdAt = new Date();
	objBookmark.updatedAt = new Date();

	var bookmark = new Bookmarks(objBookmark);
	bookmark.save(function(err, results) {
		if (err) return console.error(err);
		console.log("bookmark saved");
	})
}

var getBookmark = function(req, res) {
	Bookmarks.find({}, function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getBookmarksFromPage = function (req, res) {
	Bookmarks.find({PageId: req.params.pageId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
        }
	});
}

var getBookmarksFromBookAndUser = function(req, res) { // BookId, UserId
	Pages.find({BookId: req.params.bookId}).exec(function(err, result){
		if (err) { res.send(400, err); }
		else
		{
			// calculate PageId's
			var arrPageId = [];
			for(var i=0;i<result.length;i++)
			{
				arrPageId.push(result[i]._id);
			}

			Bookmarks.find({PageId: {$in: arrPageId}, UserId: req.params.userId}).populate("PageId").exec(function(err, result) {
				if (err) { res.send(400, err); }
				else { 
		          res.send(result);
		         }
			});
		}
	});
}

var getBookmarkFromPageAndUser = function(req, res) {
	Bookmarks.find({PageId: req.params.pageId, UserId: req.params.userId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getBookmarkId = function(req, res) {
	Bookmarks.find({_id:req.params.id}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}


//PagePrintingCounters
var insertPagePrintingCountersDetail = function(objPagePrintCount) {
	objPagePrintCount.createdAt = new Date();
	objPagePrintCount.updatedAt = new Date();

	var pagePrintConterDetail = new PagePrintingCounters(objPagePrintCount);

	pagePrintConterDetail.save(function(err, results) {
		if (err) return console.error(err);
		console.log("PagePrintingCountersDetail saved");
	});
}

var getPagePrintingCountersDetail = function(req, res) {
	PagePrintingCounters.find({_id:req.params.id}, function(err, result){
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
} 

//PagePrintDetails
var insertPagePrintDetails = function(objPagePrintDetails) {
	objPagePrintDetails.createdAt = new Date();
	objPagePrintDetails.updatedAt = new Date();

	var pagePrintDetails = new PagePrintDetails(objPagePrintDetails);

	pagePrintDetails.save(function(err, results) {
		if (err) return console.error(err);
		console.log("PagePrintDetails saved");
	});
}

//Device 
var insertDevice = function(objDevice) {
	objDevice.createdAt = new Date();
	objDevice.updatedAt = new Date();

	var device = new Devices(objDevice);

	device.save(function(err, results) {
		if (err) return console.error(err);
		console.log("Devices saved");
	})
}

var getDevice = function(req, res) {
	Devices.find({}, function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

// var findBookFromLearingParams = function(req, res) {
// 	LearningParams.findOne().populate("BookId").exec(function(err, result) {
// 		if (err) { res.send(400, err); }
// 		else {
// 			 console.log('The result is::::: '+ result.BookId);
// 			 res.send(result.BookId);
// 		}
// 	});
// }


//Update query 
var updateRecentAccessInfoById = function(objRecentInfo) {
	objRecentInfo.updatedAt = new Date();

	RecentAccessInfo.findByIdAndUpdate(objRecentInfo._id, 
		{$set : {BookId: objRecentInfo.BookId, 
			UserId: objRecentInfo.UserId, 
			PageId: objRecentInfo.PageId,
			updatedAt: objRecentInfo.updatedAt	
		}}, function (err, recentInfo) {
			if (err || !recentInfo) return console.error("Error");
			console.log("Updated sucessfully");
	});
}


var updateBookById = function(objBook) {
	objBook.updatedAt = new Date();

	Books.findByIdAndUpdate(objBook._id, {
		$set: {
			path: objBook.path,
			title: objBook.title,
			updatedAt: objBook.updatedAt,
			zipMD5Hash: objBook.zipMD5Hash,
			key: objBook.key
		}
	}, function(err, book) {
		if (err || !book) return console.error("Error");
			console.log("Updated sucessfully");
	});
}

var updateLearningParamsById = function(objLearingParam) {
	objLearingParam.updatedAt = new Date();
	objLearingParam.lastUserActivityTime = new Date();

	LearningParams.findByIdAndUpdate(objLearingParam._id, {
		$set: {
			accessId: objLearingParam.accessId,
			devAccessId: objLearingParam.devAccessId,
			isAlive: objLearingParam.isAlive,
			lastUserActivityTime: objLearingParam.lastUserActivityTime,
			updatedAt: objLearingParam.updatedAt,
			BookId: objLearingParam.BookId,
			UserId: objLearingParam.UserId
		}
	}, function(err, learningParams) {
		if (err || !learningParams) return console.error("Error");
			console.log("Updated sucessfully");
	});

}

var updateUserById = function(objUser) {
	objUser.updatedAt = new Date();

	Users.findByIdAndUpdate(objUser._id, {
		$set: {
			uid: objUser.uid,
			last_synced_usn: objUser.last_synced_usn,
			updatedAt: objUser.updatedAt
		}
	}, function(err, user) {
		if (err || !user) return console.error("Error");
			console.log("Updated sucessfully");
	})
}

var updateHighlightById = function(objHighlight) {
	objHighlight.updatedAt = new Date();

	Highlights.findByIdAndUpdate(objHighlight._id, {
		$set: {
			startOffset: objHighlight.startOffset,
			endOffset: objHighlight.endOffset,
			selectedText: objHighlight.selectedText,
			UserId: objHighlight.UserId,
			PageId: objHighlight.PageId,
			indexed: objHighlight.indexed,
			deleted: objHighlight.deleted,
			usn: objHighlight.usn,
			guid: objHighlight.guid,
			highlightComment: objHighlight.highlightComment,
			colorOverride: objHighlight.colorOverride
		}
	}, function(err, highlight) {
		if (err || !highlight) return console.error("Error");
			console.log("Updated sucessfully");
	});
}


var updateBookmarkById = function(objBookmark) {
	objBookmark.updatedAt = new Date();

	Bookmarks.findByIdAndUpdate(objBookmark._id, {
		$set: {
			title: objBookmark.title,
			indexed: objBookmark.indexed,
			deleted: objBookmark.deleted,
			usn: objBookmark.usn,
			guid: objBookmark.guid,
			updatedAt: objBookmark.updatedAt,
			PageId: objBookmark.PageId,
			UserId: objBookmark.UserId
		}
	}, function(err, bookmark) {
		if (err || !bookmark) return console.error("Error");
			console.log("Updated sucessfully");
	});
}


var updateNoteById = function(objNote) {
	objNote.updatedAt = new Date();

	Notes.findByIdAndUpdate(objNote._id,{
		$set: {
			comments: objNote.comments,
			indexed: objNote.indexed,
			deleted: objNote.deleted,
			usn: objNote.usn,
			guid: objNote.guid,
			updatedAt: objNote.updatedAt,
			PageId: objNote.PageId,
			UserId: objNote.UserId
		}
	}, function(err, note) {
		if (err || !note) return console.error("Error");
			console.log("Updated sucessfully");
	})
}


var updatePagePrintCounterById = function(objPagePrintCount) {
	objPagePrintCount.updatedAt = new Date();

	PagePrintingCounters.findByIdAndUpdate(objPagePrintCount._id, {
		$set: {
			printCount: objPagePrintCount.printCount,
			updatedAt: objPagePrintCount.updatedAt,
			UserId: objPagePrintCount.UserId,
			BookId: objPagePrintCount.BookId
		}
	}, function(err, pagePrintDetails) {
		if (err || !pagePrintDetails) return console.error("Error");
			console.log("Updated sucessfully");
	})
}

var updateUserPreferenceById = function(objUserPreference) {
	objUserPreference.updatedAt = new Date();

	UserPreference.findByIdAndUpdate(objUserPreference._id, {
		$set: {
			highlightColor: objUserPreference.highlightColor,
			customHighlightColor: objUserPreference.customHighlightColor,
			fontSize: objUserPreference.fontSize,
			fontStyle: objUserPreference.fontStyle,
			updatedAt: objUserPreference.updatedAt,
			language: objUserPreference.language,
			UserId: objUserPreference.UserId
		}
	}, function(err, userPref) {
		if (err || !userPref) return console.error("Error");
			console.log("Updated sucessfully");
	})
}



/************************ Imports data from MYSQL **********************/

var getCollectionData = function(collectionName) {
	var deferred = Q.defer();
  this.db.collection(collectionName, function(error, the_collection) {
    if( error ) deferred.reject(error);
    else {
    	the_collection.find({}).toArray(function(error,doc) { //C
	        if( error ) deferred.reject(error);
	        else{
	        	deferred.resolve(JSON.parse(JSON.stringify(doc)));
	        }
	    });
    }
  });
  return deferred.promise;
};

var dropCollection = function(collectionName) {
  this.db.collection(collectionName, function(error, the_collection) {
    if( error ) console.log(error);
    else {
    	the_collection.drop();
    }
  });
};

var importData = function(req, res) {
	var self = this;
	self.getCollectionData("temp_Users").then(function(userResults){
		var user = new Users().collection.initializeOrderedBulkOp();
      	for(var i=0; i < userResults.length; i++){
      		var obj = {};
      		obj._id = userResults[i].id;
      		obj.uid = userResults[i].uid;
      		obj.createdAt = userResults[i].createdAt;
      		obj.updatedAt = userResults[i].updatedAt;
      		obj.last_synced_usn = userResults[i].last_synced_usn;
      		user.insert(obj);
      	}
      	if(userResults.length == 0) user.insert({});
      	user.execute(function(error,result) { 
      		if (error) { res.send(400, error); }
      		else{
      			self.getCollectionData("temp_Books").then(function(bookResults){
      				var book = new Books().collection.initializeOrderedBulkOp();
			      	for(var i=0; i < bookResults.length; i++){
			      		var obj = {};
			      		obj._id = bookResults[i].id;
			      		obj.path = bookResults[i].path;
			      		obj.title = bookResults[i].title;
			      		obj.createdAt = bookResults[i].createdAt;
			      		obj.updatedAt = bookResults[i].updatedAt;
			      		obj.zipMD5Hash = bookResults[i].zipMD5Hash;
			      		obj.key = bookResults[i].key;
			      		book.insert(obj);
			      	}
			      	if(bookResults.length == 0) book.insert({});
			      	book.execute(function(error,result){
			      		if (error) { res.send(400, error); }
			      		else{
			      			self.getCollectionData("temp_Pages").then(function(pageResults){
			      				var page = new Pages().collection.initializeOrderedBulkOp();
						      	for(var i=0; i < pageResults.length; i++){
						      		var obj = {};
						      		obj._id = pageResults[i].id;
						      		obj.pageSrc = pageResults[i].pageSrc;
						      		obj.pageTitle = pageResults[i].pageTitle;
						      		obj.BookId = pageResults[i].BookId;
						      		obj.pageNumber = pageResults[i].pageNumber;
						      		obj.createdAt = pageResults[i].createdAt;
						      		obj.updatedAt = pageResults[i].updatedAt;
						      		page.insert(obj);
						      	}
						      	if(pageResults.length == 0) page.insert({});
						      	page.execute(function(error,result){
						      		if (error) { res.send(400, error); }
						      		else{
						      			self.getCollectionData("temp_Highlights").then(function(highlightResults){
						      				var highlight = new Highlights().collection.initializeOrderedBulkOp();
									      	for(var i=0; i < highlightResults.length; i++){
									      		var obj = {};
									      		obj._id = highlightResults[i].id;
									      		obj.startOffset = highlightResults[i].startOffset;
									      		obj.endOffset = highlightResults[i].endOffset;
									      		obj.selectedText = highlightResults[i].selectedText;
									      		obj.highlightComment = highlightResults[i].highlightComment;
									      		obj.colorOverride = highlightResults[i].colorOverride;
									      		obj.UserId = highlightResults[i].UserId;
									      		obj.PageId = highlightResults[i].PageId;
									      		obj.indexed = highlightResults[i].indexed;
									      		obj.deleted = highlightResults[i].deleted;
									      		obj.createdAt = highlightResults[i].createdAt;
									      		obj.updatedAt = highlightResults[i].updatedAt;
									      		obj.usn = highlightResults[i].usn;
									      		obj.guid = highlightResults[i].guid;
									      		highlight.insert(obj);
									      	}
									      	if(highlightResults.length == 0) highlight.insert({});
									      	highlight.execute(function(error,result){
									      		if (error) { res.send(400, error); }
									      		else{
									      			self.getCollectionData("temp_Bookmarks").then(function(bookmarkResults){
									      				var bookmark = new Bookmarks().collection.initializeOrderedBulkOp();
												      	for(var i=0; i < bookmarkResults.length; i++){
												      		var obj = {};
												      		obj._id = bookmarkResults[i].id;
												      		obj.UserId = bookmarkResults[i].UserId;
												      		obj.PageId = bookmarkResults[i].PageId;
												      		obj.title = bookmarkResults[i].title;
												      		obj.indexed = bookmarkResults[i].indexed;
												      		obj.deleted = bookmarkResults[i].deleted;
												      		obj.createdAt = bookmarkResults[i].createdAt;
												      		obj.updatedAt = bookmarkResults[i].updatedAt;
												      		obj.usn = bookmarkResults[i].usn;
												      		obj.guid = bookmarkResults[i].guid;
												      		bookmark.insert(obj);
												      	}
												      	if(bookmarkResults.length == 0) bookmark.insert({});
												      	bookmark.execute(function(error,result){
												      		if (error) { res.send(400, error); }
												      		else{
												      			self.getCollectionData("temp_UserPreferences").then(function(userPreferenceResults){
											      				var userPreference = new UserPreferences().collection.initializeOrderedBulkOp();
														      	for(var i=0; i < userPreferenceResults.length; i++){
														      		var obj = {};
														      		obj._id = userPreferenceResults[i].id;
														      		obj.UserId = userPreferenceResults[i].UserId;
														      		obj.highlightColor = userPreferenceResults[i].highlightColor;
														      		obj.fontSize = userPreferenceResults[i].fontSize;
														      		obj.fontStyle = userPreferenceResults[i].fontStyle;
														      		obj.createdAt = userPreferenceResults[i].createdAt;
														      		obj.updatedAt = userPreferenceResults[i].updatedAt;
														      		obj.customHighlightColor = userPreferenceResults[i].customHighlightColor;
														      		obj.language = userPreferenceResults[i].language;
														      		userPreference.insert(obj);
														      	}
														      	if(userPreferenceResults.length == 0) userPreference.insert({});
														      	userPreference.execute(function(error,result){
														      		if (error) { res.send(400, error); }
														      		else{
														      			self.getCollectionData("temp_Devices").then(function(deviceResults){
													      				var device = new Devices().collection.initializeOrderedBulkOp();
																      	for(var i=0; i < deviceResults.length; i++){
																      		var obj = {};
																      		obj._id = deviceResults[i].id;
																      		obj.UserId = deviceResults[i].UserId;
																      		obj.deviceId = deviceResults[i].deviceId;
																      		obj.createdAt = deviceResults[i].createdAt;
																      		obj.updatedAt = deviceResults[i].updatedAt;
																      		obj.authToken = deviceResults[i].authToken;
																      		obj.deviceName = deviceResults[i].deviceName;
																      		device.insert(obj);
																      	}
																      	if(deviceResults.length == 0) device.insert({});
																      	device.execute(function(error,result){
																      		if (error) { res.send(400, error); }
																      		else{
																      			self.getCollectionData("temp_LearningParams").then(function(learningParamsResults){
															      				var learningParams = new LearningParams().collection.initializeOrderedBulkOp();
																		      	for(var i=0; i < learningParamsResults.length; i++){
																		      		var obj = {};
																		      		obj._id = learningParamsResults[i].id;
																		      		obj.accessId = learningParamsResults[i].accessId;
																		      		obj.BookId = learningParamsResults[i].BookId;
																		      		obj.UserId = learningParamsResults[i].UserId;
																		      		obj.devAccessId = learningParamsResults[i].devAccessId;
																		      		obj.isAlive = learningParamsResults[i].isAlive;
																		      		obj.lastUserActivityTime = learningParamsResults[i].lastUserActivityTime;
																		      		obj.createdAt = learningParamsResults[i].createdAt;
																		      		obj.updatedAt = learningParamsResults[i].updatedAt;
																		      		obj.isConnected = learningParamsResults[i].isConnected;
																		      		learningParams.insert(obj);
																		      	}
																		      	if(learningParamsResults.length == 0) learningParams.insert({});
																		      	learningParams.execute(function(error,result){
																		      		if (error) { res.send(400, error); }
																		      		else{
																		      			self.getCollectionData("temp_Notes").then(function(notesResults){
																	      				var notes = new Notes().collection.initializeOrderedBulkOp();
																				      	for(var i=0; i < notesResults.length; i++){
																				      		var obj = {};
																				      		obj._id = notesResults[i].id;
																				      		obj.UserId = notesResults[i].UserId;
																				      		obj.PageId = notesResults[i].PageId;
																				      		obj.comments = notesResults[i].comments;
																				      		obj.indexed = notesResults[i].indexed;
																				      		obj.deleted = notesResults[i].deleted;
																				      		obj.createdAt = notesResults[i].createdAt;
																				      		obj.updatedAt = notesResults[i].updatedAt;
																				      		obj.usn = notesResults[i].usn;
																				      		obj.guid = notesResults[i].guid;
																				      		notes.insert(obj);
																				      	}
																				      	if(notesResults.length == 0) notes.insert({});
																				      	notes.execute(function(error,result){
																				      		if (error) { res.send(400, error); }
																				      		else{
																				      			self.getCollectionData("temp_RecentAccessInfo").then(function(recentAccessInfoResults){
																			      				var recentAccessInfo = new RecentAccessInfo().collection.initializeOrderedBulkOp();
																						      	for(var i=0; i < recentAccessInfoResults.length; i++){
																						      		var obj = {};
																						      		obj._id = recentAccessInfoResults[i].id;
																						      		obj.UserId = recentAccessInfoResults[i].UserId;
																						      		obj.BookId = recentAccessInfoResults[i].BookId;
																						      		obj.PageId = recentAccessInfoResults[i].PageId;
																						      		obj.createdAt = recentAccessInfoResults[i].createdAt;
																						      		obj.updatedAt = recentAccessInfoResults[i].updatedAt;
																						      		recentAccessInfo.insert(obj);
																						      	}
																						      	if(recentAccessInfoResults.length == 0) recentAccessInfo.insert({});
																						      	recentAccessInfo.execute(function(error,result){
																						      		if (error) { res.send(400, error); }
																						      		else{
																						      			self.getCollectionData("temp_PagePrintDetails").then(function(pagePrintDetailResults){
																					      				var pagePrintDetail = new PagePrintDetails().collection.initializeOrderedBulkOp();
																								      	for(var i=0; i < pagePrintDetailResults.length; i++){
																								      		var obj = {};
																								      		obj._id = pagePrintDetailResults[i].id;
																								      		obj.UserId = pagePrintDetailResults[i].UserId;
																								      		obj.BookId = pagePrintDetailResults[i].BookId;
																								      		obj.accessId = pagePrintDetailResults[i].accessId;
																								      		obj.pageSrc = pagePrintDetailResults[i].pageSrc;
																								      		obj.PrintedAt = pagePrintDetailResults[i].PrintedAt;
																								      		obj.createdAt = pagePrintDetailResults[i].createdAt;
																								      		obj.updatedAt = pagePrintDetailResults[i].updatedAt;
																								      		pagePrintDetail.insert(obj);
																								      	}
																								      	if(pagePrintDetailResults.length == 0) pagePrintDetail.insert({});
																								      	pagePrintDetail.execute(function(error,result){
																								      		if (error) { res.send(400, error); }
																								      		else{
																								      			self.getCollectionData("temp_PagePrintingCounters").then(function(pagePrintingCountersResults){
																							      				var pagePrintingCounters = new PagePrintingCounters().collection.initializeOrderedBulkOp();
																										      	for(var i=0; i < pagePrintingCountersResults.length; i++){
																										      		var obj = {};
																										      		obj._id = pagePrintingCountersResults[i].id;
																										      		obj.UserId = pagePrintingCountersResults[i].UserId;
																										      		obj.BookId = pagePrintingCountersResults[i].BookId;
																										      		obj.printCount = pagePrintingCountersResults[i].printCount;
																										      		obj.createdAt = pagePrintingCountersResults[i].createdAt;
																										      		obj.updatedAt = pagePrintingCountersResults[i].updatedAt;
																										      		pagePrintingCounters.insert(obj);
																										      	}
																										      	if(pagePrintingCountersResults.length == 0) pagePrintingCounters.insert({});
																										      	pagePrintingCounters.execute(function(error,result){
																										      		if (error) { res.send(400, error); }
																										      		else{
																										      			self.dropCollection("temp_Users");
																														self.dropCollection("temp_Bookmarks");
																														self.dropCollection("temp_Books");
																														self.dropCollection("temp_Devices");
																														self.dropCollection("temp_Highlights");
																														self.dropCollection("temp_LearningParams");
																														self.dropCollection("temp_Notes");
																														self.dropCollection("temp_PagePrintDetails");
																														self.dropCollection("temp_PagePrintingCounters");
																														self.dropCollection("temp_Pages");
																														self.dropCollection("temp_RecentAccessInfo");
																														self.dropCollection("temp_SequelizeMeta");
																														self.dropCollection("temp_UserPreferences");
																										      			res.send("Data imports completed!");
																										      		}
																										      	});
																							      			})
																							      			.fail(function(error){
																												res.send(400, error);
																											});
																								      		}
																								      	});
																					      			})
																					      			.fail(function(error){
																										res.send(400, error);
																									});
																						      		}
																						      	});
																			      			})
																			      			.fail(function(error){
																								res.send(400, error);
																							});
																				      		}
																				      	});
																	      			})
																	      			.fail(function(error){
																						res.send(400, error);
																					});
																		      		}
																		      	});
															      			})
															      			.fail(function(error){
																				res.send(400, error);
																			});
																      		}
																      	});
													      			})
													      			.fail(function(error){
																		res.send(400, error);
																	});
														      		}
														      	});
											      			})
											      			.fail(function(error){
																res.send(400, error);
															});
												      		}
												      	});
									      			})
									      			.fail(function(error){
														res.send(400, error);
													});
									      		}
									      	});
						      			})
						      			.fail(function(error){
											res.send(400, error);
										});
						      		}
						      	});
			      			})
			      			.fail(function(error){
								res.send(400, error);
							});
			      		}
			      	});
      			})
      			.fail(function(error){
					res.send(400, error);
				});
      		}
        });
	})
	.fail(function(error){
		res.send(400, error);
	});
}

/************************ End Imports data from MYSQL **********************/


exports.getCollectionData = getCollectionData;
exports.dropCollection = dropCollection;
exports.getDB = getDB;
exports.importData = importData;
exports.insertUser = insertUser;
exports.getUsers = getUsers;
exports.insertBook = insertBook;
exports.getBooks = getBooks;
exports.getBook = getBook;
exports.insertPage = insertPage;
exports.getPages = getPages;
exports.findBookFromPage = findBookFromPage;
exports.insertUserPreferences = insertUserPreferences;
exports.getUserPreferences = getUserPreferences;
exports.insertRecentAccessInfo = insertRecentAccessInfo;
exports.getRecentAccessInfo = getRecentAccessInfo;
exports.findPageFromRecentAccessInfo = findPageFromRecentAccessInfo;
exports.insertLearningParams = insertLearningParams;
exports.getLearingParams = getLearingParams;
// exports.findBookFromLearingParams = findBookFromLearingParams;
exports.findUserAndBookFromLearingParams = findUserAndBookFromLearingParams;
exports.insertHighlight = insertHighlight;
exports.getHighlight = getHighlight;
exports.getHighlightFromPageAndUser = getHighlightFromPageAndUser;
exports.getHighlightFromGuid = getHighlightFromGuid;
exports.insertNote = insertNote;
exports.getNotesFromPage = getNotesFromPage;
exports.getNotes = getNotes;
exports.insertBookmark = insertBookmark;
exports.getBookmark = getBookmark;
exports.getBookmarksFromPage = getBookmarksFromPage;
exports.findAliveUserAndBookFromLearingParams = findAliveUserAndBookFromLearingParams;
exports.getHighlightId = getHighlightId;
exports.getHighlightFromBookAndUser = getHighlightFromBookAndUser;
exports.getNotesFromBookAndUser = getNotesFromBookAndUser;
exports.getNotesFromPageAndUser = getNotesFromPageAndUser;
exports.getNoteId = getNoteId;
exports.getBookmarksFromBookAndUser = getBookmarksFromBookAndUser;
exports.getBookmarkFromPageAndUser =getBookmarkFromPageAndUser;
exports.getBookmarkId = getBookmarkId;
exports.insertPagePrintingCountersDetail = insertPagePrintingCountersDetail;
exports.getPagePrintingCountersDetail = getPagePrintingCountersDetail;
exports.insertDevice = insertDevice;
exports.getDevice =getDevice;
exports.insertPagePrintDetails = insertPagePrintDetails;

//Update functions
exports.updateRecentAccessInfoById = updateRecentAccessInfoById;
exports.updateBookById = updateBookById;
exports.updateLearningParamsById = updateLearningParamsById;
exports.updateUserById = updateUserById;
exports.updateHighlightById = updateHighlightById;
exports.updateBookmarkById = updateBookmarkById;
exports.updateNoteById = updateNoteById;
exports.updatePagePrintCounterById = updatePagePrintCounterById;
exports.updateUserPreferenceById = updateUserPreferenceById;
