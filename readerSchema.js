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
