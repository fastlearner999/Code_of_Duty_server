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
                    `SELECT ID,
                    USER_ID,
                    GOAL_NAME,
                    SPORT_TYPE,
                    PERIOD,
                    PERIOD_TYPE,
                    SUBSTRING(CAST(START_DATE AS VARCHAR),1,19) AS START_DATE,
                    SUBSTRING(CAST(END_DATE AS VARCHAR),1,19) AS END_DATE,
                    TARGET_DISTANCE,
                    TARGET_DISTANCE_UNIT,
                    SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                    SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE 
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
                    `SELECT ID,
                    USER_ID,
                    GOAL_NAME,
                    SPORT_TYPE,
                    PERIOD,
                    PERIOD_TYPE,
                    SUBSTRING(CAST(START_DATE AS VARCHAR),1,19) AS START_DATE,
                    SUBSTRING(CAST(END_DATE AS VARCHAR),1,19) AS END_DATE,
                    TARGET_DISTANCE,
                    TARGET_DISTANCE_UNIT,
                    SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                    SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE 
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
                VALUES ($1, $2, $3, $4, TO_TIMESTAMP($5, 'YYYY-MM-DD HH24:MI:ss'), TO_TIMESTAMP($6, 'YYYY-MM-DD HH24:MI:ss'), $7, $8, $9) 
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
                    SET goal_name = $1, 
                    sport_type = $2, 
                    period = $3, 
                    period_type = $4, 
                    start_date = TO_TIMESTAMP($5, 'YYYY-MM-DD HH24:MI:ss'), 
                    end_date = TO_TIMESTAMP($6, 'YYYY-MM-DD HH24:MI:ss'), 
                    target_distance = $7, 
                    target_distance_unit = $8, 
                    update_date = now() 
                    WHERE id= $9 
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
                        updateGoalData.id
                    ]);
                let goal = new Goal(goalData.rows[0]);
                resolve (goal);
            } catch (err) {
                reject('Goal could not be updated');
            }
        });
    };

    static async destroy(id){
        return new Promise(async(resolve, reject) => {
            try {
                //const result = 
                await db.query(
                    'DELETE FROM goals WHERE id = $1', [ id ]);
                //const goal = await Goal.findById(result.rows[0]);
                // if(!goals.length){await Goal.destroy()}
                resolve('User was deleted');
            } catch (err) {
                reject('Goal could not be deleted')
            }
        })
    };
    


    static async findByUserId(userId){
        return new Promise (async (resolve, reject) => {
        try {
            let goalData = await db.query(
                `SELECT ID,
                USER_ID,
                GOAL_NAME,
                SPORT_TYPE,
                PERIOD,
                PERIOD_TYPE,
                SUBSTRING(CAST(START_DATE AS VARCHAR),1,19) AS START_DATE,
                SUBSTRING(CAST(END_DATE AS VARCHAR),1,19) AS END_DATE,
                TARGET_DISTANCE,
                TARGET_DISTANCE_UNIT,
                SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE 
                FROM goals                 
                WHERE user_id = $1 
                ORDER BY create_date DESC`, 
                [ userId ]);
            let goals = goalData.rows.map(w => new Goal(w));
            resolve (goals);
        } catch (err) {
            reject('Goal not found');
        }
    });
};
};
