class User{
    constructor(username, password, birthday){
        this.Username = username;
        this.Password = password;
        this.Birthday = birthday;
        this.bio = "";
    }
}
module.exports = {
    UserClass: User
}