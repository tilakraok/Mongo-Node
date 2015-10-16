Step to Setup MongoWithNodeJs:

Install Gem:

Create Gemfile with following contents:
 source 'https://rubygems.org'
 gem ‘mongify'
 gem 'mysql'
rvm install 1.9.3
gem install bundler  (http://mongify.com/)
bundle install


SetUp Mongify for importing data from MySql to MongoDb:

(http://mongify.com/)

Create database config file:
	
		sql_connection do 
	 		adapter "mysql” 
			host "localhost” 
			username "root” 
			database "reader” 
      		end 

       		mongodb_connection do 
	 		host "localhost” 
			database "reader” 
      		end

Start Mysql and MongoDb.

A simple command and all it does is check if your database.config file is correct and all connections work:

		mongify check database.config

Translation is used to auto generate a translation from your SQL database.You simple run it as:

		mongify translation database.config > database_translation.rb

Once you have your translation file setup the way you want it, you can tell mangily to move the data by issuing the process command:

		mongify process database.config database_translation.rb	


Node Application:

Run following command:

npm install
node app.js

Import all MySql data to MongoDb by running following:

http://localhost:5050/importData 