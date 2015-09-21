table "Bookmarks" do
	column "id", :key, :as => :integer
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

table "Books" do
	column "id", :key, :as => :integer
	column "path", :string
	column "title", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "zipMD5Hash", :text
	column "key", :text
end

table "Devices" do
	column "id", :key, :as => :integer
	column "UserId", :integer
	column "deviceId", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "authToken", :text
	column "deviceName", :text
end

table "Highlights" do
	column "id", :key, :as => :integer
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

table "LearningParams" do
	column "id", :key, :as => :integer
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

table "Notes" do
	column "id", :key, :as => :integer
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

table "PagePrintDetails" do
	column "id", :key, :as => :integer
	column "UserId", :integer
	column "BookId", :integer
	column "accessId", :string
	column "pageSrc", :string
	column "printedAt", :datetime
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "PagePrintingCounters" do
	column "id", :key, :as => :integer
	column "UserId", :integer
	column "BookId", :integer
	column "printCount", :integer
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "Pages" do
	column "id", :key, :as => :integer
	column "pageSrc", :string
	column "pageTitle", :string
	column "BookId", :integer
	column "pageNumber", :integer
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "RecentAccessInfo" do
	column "id", :key, :as => :integer
	column "UserId", :integer
	column "BookId", :integer
	column "PageId", :integer
	column "createdAt", :datetime
	column "updatedAt", :datetime
end

table "SequelizeMeta" do
	column "from", :string
	column "to", :string
	column "id", :key, :as => :integer
end

table "UserPreferences" do
	column "id", :key, :as => :integer
	column "UserId", :integer
	column "highlightColor", :string
	column "fontSize", :integer
	column "fontStyle", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "customHighlightColor", :string
	column "language", :string
end

table "Users" do
	column "id", :key, :as => :integer
	column "uid", :string
	column "createdAt", :datetime
	column "updatedAt", :datetime
	column "last_synced_usn", :integer
end

