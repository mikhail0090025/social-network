const http = require("http");
const fs = require("fs");
const mainClasses = require("./mainClasses");
const User = mainClasses.UserClass;
const mysql = require("./mysql.js");
const crypto = require("crypto");

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
                var hash = crypto.createHash('sha256');
                hash.update(password);
                var newUser = [
                    username,
                    hash.digest("hex"),
                    birthday,
                    ""
                ];
                
                mysql.req2("INSERT INTO person (NAME, Password, Birthday, Bio) VALUES (?,?,?,?)", newUser, function (err, results) {
                    if(err) console.error(err);
                    else {
                        console.log(results);
                    }
                });                
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
}

function SaveUsers(usersList) {
    fs.writeFile("users.txt", JSON.stringify(usersList), function (error) {
        if(error) console.error(error);
        else console.log("File was saved!");
    });
}