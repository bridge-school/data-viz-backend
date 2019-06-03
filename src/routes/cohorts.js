const express = require('express');
const router = express.Router();
const db = require('../db/index');


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