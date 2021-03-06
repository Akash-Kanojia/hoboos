"use strict"

var User = require("./user.js").User

// Routes.
var Routes = {
    users: "/users",
    userByEmail: "/users/:email"
}

// UserServer listen and serves the user's rest api.
class UsersServer{
    constructor(UsersService){
        this.UsersService = UsersService
    }
}

// Inbvokes the server.
UsersServer.prototype.Invoke = function(app) {
    let UsersService = this.UsersService
   
    // Create room for hotel.
    app.post(Routes.users, function (req, res) {
        var userReq = JSON.parse(JSON.stringify(req.body))
        var user = new User(
            userReq.email,
            userReq.name,
        )
        UsersService.Create(
            user,
        ).then(function(data){
            res.send(user);
        }).catch(function(err){
            console.log("error in creating user, ", err);
            var responseBody = "error in creating user", err
            res.send(responseBody)
        })   
     })

     // Find users.
    app.get(Routes.users, function (req, res) {
        var filters = userFilterOptions(req)
        UsersService.Find(
            filters,
        ).then(function(data){
            res.send(data);
        }).catch(function(err){
            console.log("error in fetching rooms, ", err)
            res.send("error in fetching rooms");
        })
    })

    // update user by email.
    app.put(Routes.userByEmail, function(req, res) {
        let email = req.params.email
        var userReq = JSON.parse(JSON.stringify(req.body))
        var user = new User(
            email,
            userReq.name,
        )
        UsersService.Update(
            user,
        ).then(function(data){
            res.send(user);
        }).catch(function(err){
            console.log("error in updating user, ", err);
            var responseBody = ("error in updating user").concat(err)
            res.send(responseBody)
        })  
    })

    // Delete user by email.
    app.delete(Routes.userByEmail, function(req, res) {
        let email = req.params.email
        UsersService.Delete(
            new User(email),
        ).then(function(data){
            res.send("successfully deleted");
        }).catch(function(err){
            console.log("error in deleting user, ", err);
            res.send("error in deleting user")
        })
    })
}

// Helper method to create otherOptions object from request
function userFilterOptions(req) {
    var email = req.get("email") 

    var option = {}
    if (email != undefined && email != null) {
        option.email = email
    }

    return option
}

module.exports = {
    UsersServer,
    Routes
}