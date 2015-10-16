table "Bookmarks", :rename_to => "temp_Bookmarks" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "UserId", :integer
	column "PageId", :integer
	column "title", :text
	column "indexed", :boolean
	column "deleted", :boolean
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "usn", :integer
	column "guid", :string
end

table "Books", :rename_to => "temp_Books" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "path", :string
	column "title", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "zipMD5Hash", :text
	column "key", :text
end

table "Devices", :rename_to => "temp_Devices" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "UserId", :integer
	column "deviceId", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "authToken", :text
	column "deviceName", :text
end

table "Highlights", :rename_to => "temp_Highlights" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "startOffset", :integer
	column "endOffset", :integer
	column "selectedText", :text
	column "highlightComment", :text
	column "colorOverride", :string
	column "UserId", :integer
	column "PageId", :integer
	column "indexed", :boolean
	column "deleted", :boolean
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "usn", :integer
	column "guid", :string
end

table "LearningParams", :rename_to => "temp_LearningParams" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "accessId", :string
	column "BookId", :integer
	column "UserId", :integer
	column "devAccessId", :string
	column "isAlive", :boolean
	column "lastUserActivityTime", :datetime
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "isConnected", :boolean
end

table "Notes", :rename_to => "temp_Notes" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "UserId", :integer
	column "PageId", :integer
	column "comments", :text
	column "indexed", :boolean
	column "deleted", :boolean
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "usn", :integer
	column "guid", :string
end

table "PagePrintDetails", :rename_to => "temp_PagePrintDetails" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "UserId", :integer
	column "BookId", :integer
	column "accessId", :string
	column "pageSrc", :string
	column "printedAt", :datetime
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "PagePrintingCounters", :rename_to => "temp_PagePrintingCounters" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "UserId", :integer
	column "BookId", :integer
	column "printCount", :integer
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "Pages", :rename_to => "temp_Pages" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "pageSrc", :string
	column "pageTitle", :string
	column "BookId", :integer
	column "pageNumber", :integer
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "RecentAccessInfo", :rename_to => "temp_RecentAccessInfo" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "UserId", :integer
	column "BookId", :integer
	column "PageId", :integer
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "SequelizeMeta", :rename_to => "temp_SequelizeMeta" do
	column "from", :string
	column "to", :string
	column "id", :key, :as => :integer
end

table "UserPreferences", :rename_to => "temp_UserPreferences" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "UserId", :integer
	column "highlightColor", :string
	column "fontSize", :integer
	column "fontStyle", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "customHighlightColor", :string
	column "language", :string
end

table "Users", :rename_to => "temp_Users" do
	column "_id", :key, :as => :integer
	column "id", :integer
	column "uid", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "last_synced_usn", :integer
end
