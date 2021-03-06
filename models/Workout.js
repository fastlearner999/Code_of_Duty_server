const db = require('../dbConfig/init');

module.exports = class Workout {
    constructor(data){
        this.id = data.id;
        this.user_id = data.user_id;
        this.sport_type = data.sport_type;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.break_duration = data.break_duration;
        this.total_distance = data.total_distance;
        this.total_distance_unit = data.total_distance_unit;
        this.total_duration = data.total_duration;
        this.total_duration_unit = data.total_duration_unit;
        this.create_date = data.create_date;
        this.update_date = data.update_date;
    };

    static getAll(){
        return new Promise (async (resolve, reject) => {
            try {
                let workoutData = await db.query(
                    `SELECT ID,
                    USER_ID,
                    SPORT_TYPE,
                    SUBSTRING(CAST(START_TIME AS VARCHAR),1,19) AS START_TIME,
                    SUBSTRING(CAST(END_TIME AS VARCHAR),1,19) AS END_TIME,
                    BREAK_DURATION,
                    TOTAL_DISTANCE,
                    TOTAL_DISTANCE_UNIT,
                    TOTAL_DURATION,
                    TOTAL_DURATION_UNIT,
                    SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                    SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE 
                    FROM workouts ORDER BY create_date DESC`);
                let workouts = workoutData.rows.map(w => new Workout(w));
                resolve (workouts);
            } catch (err) {
                reject('Workout not found');
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let workData = await db.query(
                `SELECT ID,
                USER_ID,
                SPORT_TYPE,
                SUBSTRING(CAST(START_TIME AS VARCHAR),1,19) AS START_TIME,
                SUBSTRING(CAST(END_TIME AS VARCHAR),1,19) AS END_TIME,
                BREAK_DURATION,
                TOTAL_DISTANCE,
                TOTAL_DISTANCE_UNIT,
                TOTAL_DURATION,
                TOTAL_DURATION_UNIT,
                SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE 
                FROM workouts WHERE id = $1`, [ id ]);
                let workout = new Workout(workData.rows[0]);
                resolve (workout);
            } catch (err) {
                reject('Workout not found');
            }
        });
    };

    static findByUserId(userId){
        return new Promise (async (resolve, reject) => {
            try {
                let workoutData = await db.query(
                    `SELECT ID,
                    USER_ID,
                    SPORT_TYPE,
                    SUBSTRING(CAST(START_TIME AS VARCHAR),1,19) AS START_TIME,
                    SUBSTRING(CAST(END_TIME AS VARCHAR),1,19) AS END_TIME,
                    BREAK_DURATION,
                    TOTAL_DISTANCE,
                    TOTAL_DISTANCE_UNIT,
                    TOTAL_DURATION,
                    TOTAL_DURATION_UNIT,
                    SUBSTRING(CAST(CREATE_DATE AS VARCHAR),1,19) AS CREATE_DATE,
                    SUBSTRING(CAST(UPDATE_DATE AS VARCHAR),1,19) AS UPDATE_DATE 
                    FROM workouts 
                    WHERE user_id = $1 
                    ORDER BY create_date DESC`, [ userId ]);
                let workouts = workoutData.rows.map(w => new Workout(w));
                resolve (workouts);
            } catch (err) {
                reject('Workout not found');
            }
        });
    };
    
    static async create(newWorkoutData){
        return new Promise (async (resolve, reject) => {
            try {
                let workoutData = await db.query(
                    `INSERT INTO workouts (user_id, sport_type, start_time, end_time, break_duration, total_distance, total_distance_unit, total_duration, total_duration_unit) 
                    VALUES ($1, $2, TO_TIMESTAMP($3, 'YYYY-MM-DD HH24:MI:ss'), TO_TIMESTAMP($4, 'YYYY-MM-DD HH24:MI:ss'), $5, $6, $7, $8, $9) RETURNING *;`, 
                    [ newWorkoutData.user_id, newWorkoutData.sport_type, newWorkoutData.start_time, newWorkoutData.end_time, newWorkoutData.break_duration, newWorkoutData.total_distance, newWorkoutData.total_distance_unit, newWorkoutData.total_duration, newWorkoutData.total_duration_unit ]);
                let workout = new Workout(workoutData.rows[0]);
                resolve (workout);
            } catch (err) {
                reject('Workout could not be created');
            }
        });
    };

    static async update(updateWorkoutData){
        return new Promise (async (resolve, reject) => {
            try {
                let workoutData = await db.query(
                    `UPDATE workouts 
                    SET sport_type = $1, 
                    start_time = TO_TIMESTAMP($2, 'YYYY-MM-DD HH24:MI:ss'), 
                    end_time = TO_TIMESTAMP($3, 'YYYY-MM-DD HH24:MI:ss'), 
                    break_duration = $4, 
                    total_distance = $5, 
                    total_distance_unit = $6, 
                    total_duration = $7, 
                    total_duration_unit = $8, 
                    update_date = now() 
                    WHERE id = $9 RETURNING *;`, 
                    [ updateWorkoutData.sport_type, 
                        updateWorkoutData.start_time, 
                        updateWorkoutData.end_time, 
                        updateWorkoutData.break_duration, 
                        updateWorkoutData.total_distance, 
                        updateWorkoutData.total_distance_unit, 
                        updateWorkoutData.total_duration, 
                        updateWorkoutData.total_duration_unit, 
                        updateWorkoutData.id ]);
                let workout = new Workout(workoutData.rows[0]);
                resolve (workout);
            } catch (err) {
                reject('Workout could not be updated');
            }
        });
    };

    static async destroy(id){
        return new Promise(async(resolve, reject) => {
            try {
                await db.query('DELETE FROM workouts WHERE id = $1', [ id ]);
                resolve('Workout was deleted');
            } catch (err) {
                reject('Workout could not be deleted')
            }
        })
    };
};
