const db = require('../dbConfig/init');

module.exports = class Goal {
    constructor(data){

        this.id = data.id 
        this.user_id = data.user_id
        this.goal_name = data.goal_name
        this.sport_type = data.sport_type
        this.period = data.period
        this.period_type = data.period_type
        this.start_date = data.start_date
        this.end_date = data.end_date
        this.target_distance = data.target_distance
        this.target_distance_unit = data.target_distance_unit
        this.create_date = data.create_date
        this.update_date = data.update_date
        this.user_id = data.user_id
    };

    static getAll(){
        return new Promise (async (resolve, reject) => {
            try {
                let goalData = await db.query(
                    `SELECT * 
                     FROM goals 
                     ORDER BY create_date DESC`);
                let goals = goalData.rows.map(g => new Goal(g));
                resolve (goals);
            } catch (err) {
                reject('Goal not found');
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let goalData = await db.query(
                    `SELECT * 
                     FROM goals
                     WHERE id = $1;`, [ id ]);
                let goal = new Goal(goalData.rows[0]);
                resolve (goal);
            } catch (err) {
                reject('Goal not found');
            }
        });
    };
    
    static async create(newgoalData){
        return new Promise (async (resolve, reject) => {
            try {
                let goalData = await db.query(`
                INSERT INTO goals( goal_name, sport_type, period, period_type, start_date, end_date, target_distance, target_distance_unit, user_id) 
                VALUES ($1, $2, $3, $4 TO_TIMESTAMP($5, 'YYYY-MM-DD HH24:MI:ss'), TO_TIMESTAMP($6, 'YYYY-MM-DD HH24:MI:ss'), $7, $8, $9) 
                RETURNING *;`,
                       [ newgoalData.goal_name,
                       newgoalData.sport_type,
                       newgoalData.period,
                       newgoalData.period_type,
                       newgoalData.start_date,
                       newgoalData.end_date,
                       newgoalData.target_distance,
                       newgoalData.target_distance_unit,
                       newgoalData.user_id
                    ]);
                    let goal = new Goal(goalData.rows[0]);
                resolve (goal);
            } catch (err) {
                reject('Goal could not be created');
            }
        });
    };

    static async update(updateGoalData){
        return new Promise (async (resolve, reject) => {
            try {
                let goalData = await db.query(

                    `UPDATE goals
                    SET goal_name = $1, sport_type = $2, period = $3, period_type = $4, start_date = $5, end_date = $6, target_distance = $7, target_distance_unit = $8, user_id = $9
                    WHERE id= $10
                    RETURNING *;`,
                     [                 
                        updateGoalData.goal_name,
                        updateGoalData.sport_type,
                        updateGoalData.period,
                        updateGoalData.period_type,
                        updateGoalData.start_date,
                        updateGoalData.end_date,
                        updateGoalData.target_distance,
                        updateGoalData.target_distance_unit,
                        updateGoalData.user_id,
                        updateGoalData.id
                    ]);
                let goal = new Goal(goalData.rows[0]);
                resolve (goal);
            } catch (err) {
                reject('Goal could not be updated');
            }
        });
    };

    static async destroy(deleteGoalData){
        return new Promise(async(resolve, reject) => {
            try {
                //const result = 
                await db.query(
                    'DELETE FROM goals WHERE id = $1', [ deleteGoalData.id ]);
                //const goal = await Goal.findById(result.rows[0]);
                // if(!goals.length){await Goal.destroy()}
                resolve('User was deleted');
            } catch (err) {
                reject('Goal could not be deleted')
            }
        })
    };
    


    static async findByUserId(userId, month, year, sortBy){
        return new Promise (async (resolve, reject) => {
        try {
            let targetMonth = "" + new Date().getMonth();
            if (month !== null) {
                targetMonth = month;
            }
            let targetYear = "" + new Date().getFullYear();
            if (year !== null) {
             
                targetYear = year;
            }
            let sortingCriteria = 'create_date';
            if (sortBy === 'sport_type') {
                sortingCriteria = 'sport_type';
            }
            let goalData = await db.query(
                `SELECT  goals.*
                 FROM goals                 
                WHERE user_id = $1 AND to_char(create_date, 'MM') = $2 AND to_char(create_date, 'YYYY') = $3 
                ORDER BY $4 DESC`, 
                [ userId, targetMonth, targetYear, sortingCriteria ]);
            //let goals = goalData.rows.map(g => new Goal(g));
            let goal = new Goal(goalData.rows[0]);
            resolve (goal);
        } catch (err) {
            reject('Goal not found');
        }
    });
};
};
