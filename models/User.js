const db = require('../dbConfig/init');

module.exports = class User {
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.gender = data.gender;
        this.create_date = data.create_date;
        this.update_date = data.update_date;
        this.last_login = data.last_login;
    };

    static getAll(){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `SELECT ID, 
                    EMAIL,
                    PASSWORD,
                    FIRST_NAME,
                    LAST_NAME,
                    GENDER,
                    SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                    SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE, 
                    SUBSTRING(CAST(LAST_LOGIN AS VARCHAR),1,19) AS LAST_LOGIN 
                    FROM users`);
                let users = userData.rows.map(u => new User(u));
                resolve(users);
            } catch (err) {
                reject(`User not found`);
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `SELECT ID, 
                    EMAIL,
                    '' AS PASSWORD,
                    FIRST_NAME,
                    LAST_NAME,
                    GENDER,
                    SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                    SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE, 
                    SUBSTRING(CAST(LAST_LOGIN AS VARCHAR),1,19) AS LAST_LOGIN 
                    FROM users where id = $1`, [ id ]);
                let user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                reject(`User not found`);
            }
        });
    };
    
    static async create(newUserData){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `INSERT INTO users (email, password, first_name, last_name, gender) 
                    VALUES ($1, $2, $3, $4, $5) RETURNING *;`, 
                    [ newUserData.email, newUserData.password, newUserData.first_name, newUserData.last_name, newUserData.gender ]);
                let user = new User(userData.rows[0]);
                resolve (user);
            } catch (err) {
                reject(`User could not be created`);
            }
        });
    };

    static async update(updateUserData){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `UPDATE users 
                    SET email = $1, passwprd = $2, first_name = $3, last_name = $4, gender = $5
                    WHERE id = $6 RETURNING *;`, 
                    [ updateUserData.email, updateUserData.passwprd, updateUserData.first_name, updateUserData.last_name, updateUserData.gender, updateUserData.id ]);
                let user = new User(userData.rows[0]);
                resolve (user);
            } catch (err) {
                reject(`User could not be updated`);
            }
        });
    };

    static async destroy(id){
        return new Promise(async(resolve, reject) => {
            try {
                await db.query(`DELETE FROM users WHERE id = $1`, [ id ]);
                resolve(`User was deleted`);
            } catch (err) {
                reject(`User could not be deleted`);
            }
        })
    };

    static async login(loginData){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `SELECT ID, 
                    EMAIL,
                    PASSWORD,
                    FIRST_NAME,
                    LAST_NAME,
                    GENDER,
                    SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                    SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE, 
                    SUBSTRING(CAST(LAST_LOGIN AS VARCHAR),1,19) AS LAST_LOGIN 
                    FROM users where email = $1 and password = $2`, [ loginData.email, loginData.password ]);
                let user = new User(userData.rows[0]);
                await db.query(
                    `UPDATE users 
                    SET last_login = now() 
                    WHERE id = $1`, [ user.id ]);
                resolve (user);
            } catch (err) {
                reject(`User could not login`);
            }
        });
    };

    static async logout(logoutData){
        return new Promise (async (resolve, reject) => {
            try {
                //TODO
                resolve ('User logout success');
            } catch (err) {
                reject(`User could not logout`);
            }
        });
    };
};