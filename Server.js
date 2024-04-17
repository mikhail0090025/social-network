const http = require("http");
const fs = require("fs");
const mainClasses = require("./mainClasses");
const User = mainClasses.UserClass;

http.createServer(function (request, response) {
    console.log(request.method);

    let data = "";

    request.on("data", function (chunk) {
        data += chunk;
    });

    switch (request.url) {
        case "/login":
            request.on("end", function () {
                const formData = new URLSearchParams(data);
                const username = formData.get("username");
                const password = formData.get("password");
    
                console.log("Username:", username);
                console.log("Password:", password);
            });
            break;
        case "/registration":
            request.on("end", function () {
                const formData = new URLSearchParams(data);
                const username = formData.get("username");
                const password = formData.get("password");
                const birthday = formData.get("birthday");
    
                console.log("Username:", username);
                console.log("Password:", password);
                console.log("Birthday:", birthday);

                const birthday_ = new Date(birthday);
                var newUser = new User(username, password, birthday_);
                try {
                    AddUser(newUser);
                } catch (error) {
                    console.error(error);
                }
            });
            break;
        default:
            console.error(`${request.url} was not found`);
            response.writeHead(404);
            response.end(`${request.url} was not found`);
            break;
    }
}).listen(3000, "127.0.0.1", function () {
    console.log("Server started!");
});

function AddUser(user){
    if(!(user instanceof User)) throw new Error("Not user object was given");
    fs.readFile("users.txt", function(error, data){
        if(error) {
            console.error(error);
        }
        else{
            console.log(data);
            var users = JSON.stringify(data);
            if(users.some(user_ => user_.username === user.username)) throw new Error("User with username " + user.username + " already exists");
            users.push(user);
            SaveUsers(users);
        }
    });
}

function SaveUsers(usersList) {
    fs.writeFile("users.txt", JSON.stringify(usersList), function (error) {
        if(error) console.error(error);
        else console.log("File was saved!");
    });
}