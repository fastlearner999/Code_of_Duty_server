const db = require('../dbConfig/init');

module.exports = class Content {
    constructor(data){

        this.id = data.id;
        this.html_content = data.html_content;
        this.create_date = data.create_date;  
        this.update_date = data.update_date;  
        
    };

    static getAll(){
        return new Promise (async (resolve, reject) => {
            try {
                let contentData = await db.query(
                    `SELECT ID,
                    TITLE,
                    HTML_CONTENT,
                    TO_CHAR('YYYY-MM-DD HH24:MI:ss', CREATE_DATE) AS CREATE_DATE,
                    TO_CHAR('YYYY-MM-DD HH24:MI:ss', UPDATE_DATE) AS UPDATE_DATE 
                    FROM contents`);
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
                `SELECT ID,
                TITLE,
                HTML_CONTENT,
                TO_CHAR('YYYY-MM-DD HH24:MI:ss', CREATE_DATE) AS CREATE_DATE,
                TO_CHAR('YYYY-MM-DD HH24:MI:ss', UPDATE_DATE) AS UPDATE_DATE  
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
