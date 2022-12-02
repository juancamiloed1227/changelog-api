class User {
    static nextId = 1;
    
    constructor(name, email, password) {
        this.id = User.nextId++;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports = User