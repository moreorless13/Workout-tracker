const router = require('express').Router();
const db = require('../models');


db.Workout.find({}).then(function(res) {
    if (res.length === 0){
        require('../seeders/seed.js');
    }
});

router.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            dbWorkout.forEach(workout => {
                let total = 0;
                workout.exercises.forEach(exercise => {
                    total += exercise.duration;
                });

                workout.totalDuration = total;
            })
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        });
})


router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});

router.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => [
            res.json(err)
        ])
})


module.exports = router;