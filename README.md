# NodeJs_Repo

Node JS notes.

-> npm init -y (package.json will get created)
-> npm install
-> create index.js file
-> npm i express (adds express to package.json dependencies)
-> node index.js (to run code)


#### Folder Structure

/src/controllers/ - contains major functionality of project
/src/db/ - contains database connection logic
/src/middlewares/ - whenever user requests data from server, before giving response, middlewares perform check on the cookies of user whether this user is authenticated user to request the data
/src/models/ - contains data regarding data models of our website
/src/routes/ - contains info regarding API routes
/src/utils/ - if a functionality repeats itself, its kept in this utils folder


###########
.prettiererc - how prettier extension will work
.prettierignore - files which we want to ignore through prettier