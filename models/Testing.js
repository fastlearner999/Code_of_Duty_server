const db = require('../dbConfig/init');

module.exports = class Testing {
    constructor(data){
        this.data = data.data;
    };

    static getAll(){
        return new Promise (async (resolve, reject) => {
            try {
                let testingData = await db.query('SELECT * FROM test');
                let testingResult = testingData.rows.map(u => new Testing(u));
                resolve(testingResult);
            } catch (err) {
                reject(`Unable to connect AWS Postgres database`);
            }
        });
    };
}