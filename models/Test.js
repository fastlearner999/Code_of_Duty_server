const db = require('../dbConfig/init');

module.exports = class Test {
    constructor(data){
        this.data = data.data;
    };

    static getAll(){
        return new Promise (async (resolve, reject) => {
            try {
                let testData = await db.query('SELECT * FROM test');
                let testResult = testData.rows.map(u => new Test(u));
                resolve(testResult);
            } catch (err) {
                console.log(err);
                reject(`Unable to connect AWS Postgres database`);
            }
        });
    };
}