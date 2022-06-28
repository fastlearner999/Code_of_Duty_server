const db = require('../dbConfig/init');

module.exports = class Content {
    constructor(data){

        this.id = data.id;
        this.html_content = data.html_content;
        this.create_date = data.create_date;  
        this.update_date = data.update_date;  
        
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let contentData = await db.query('SELECT * FROM contents');
                let contents = contentData.rows.map(c => new Content(c));
                resolve (contents);
            } catch (err) {
                reject('Content not found');
            }
        });
    };
    
    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
               let contentData = await db.query(
                `SELECT * 
                FROM contents 
                WHERE id = $1;`, [id])
                let content = new Content(contentData.rows[0]);
                resolve (content);
            } catch (err) {
                reject('Content not found');
            }
        });
    };
};
