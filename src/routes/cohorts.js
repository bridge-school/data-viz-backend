const express = require('express');
const router = express.Router();
const db = require('../db/index');

// const cohortRouter = router.get('/', (req, res) => {
//     db.collection("cohorts")
//     .get()
//     .then(snapshop =>{
//         res.json({
//             data: snapshot.docs.map(doc => {
//                 return {
                    // doc
                    // id: doc.id
                    // cohort: doc.id.Cohort
                    // ...doc.data()
//                 }
//             })
//         })
//     })
//     .catch(error =>{
//         res.json(error)
//     })
// });

const cohortRouter = router.get('/', (req, res) => {
    db.collection("cohorts")
        .get()
        .then(snapshot => {
            res.json({
                data: snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            });
        })
        .catch(error => {
            res.json({ error });
        });
});

module.exports = cohortRouter;