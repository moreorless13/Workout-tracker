const router = require('express').Router();
const db = require('../models');


// db.Workout.find({}).then(function(res) {
//     if (res.length === 0){
//         require('../seeders/seed.js');
//     }
// });

router.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        });
})


router.put("/api/workouts/:id", (req, res) => {

    db.Exercise.create(req.body)
        .then((data) => db.Workout.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: { exercises: data._id },
                $inc: { totalDuration: data.duration }
            },
            { new: true })
        ).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
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
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => [
            res.json(err)
        ])
})


module.exports = router;