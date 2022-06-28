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
                let workoutData = await db.query('SELECT * FROM workouts ORDER BY create_date DESC');
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
                let workData = await db.query(`SELECT * FROM workouts WHERE id = $1`, [ id ]);
                let workout = new Workout(workData.rows[0]);
                resolve (workout);
            } catch (err) {
                reject('Workout not found');
            }
        });
    };

    static findByUserId(userId, month, year, sortBy){
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
                let workoutData = await db.query(
                    `SELECT * 
                    FROM workouts 
                    WHERE user_id = $1 AND to_char(create_date, 'MM') = $2 AND to_char(create_date, 'YYYY') = $3 
                    ORDER BY $4 DESC`, 
                    [ userId, targetMonth, targetYear, sortingCriteria ]);
                let workout = new Workout(workoutData.rows[0]);
                resolve (workout);
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
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`, 
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
                    SET user_id = $1, sport_type = $2, start_time = $3, end_time = $4, break_duration = $5, total_distance = $6, total_distance_unit = $7, total_duration = $8, total_duration_unit = $9
                    WHERE id = $10 RETURNING *;`, 
                    [ updateWorkoutData.user_id, updateWorkoutData.sport_type, updateWorkoutData.start_time, updateWorkoutData.end_time, updateWorkoutData.break_duration, updateWorkoutData.total_distance, updateWorkoutData.total_distance_unit, updateWorkoutData.total_duration, updateWorkoutData.total_duration_unit, updateWorkoutData.id ]);
                let workout = new Workout(workoutData.rows[0]);
                resolve (workout);
            } catch (err) {
                reject('Workout could not be updated');
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.query('DELETE FROM workouts WHERE id = $1', [ this.id ]);
                resolve('Book was deleted');
            } catch (err) {
                reject('Workout could not be deleted')
            }
        })
    };
};
