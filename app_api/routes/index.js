const express = require('express');
const router = express.Router();

const tripsController = require("../controllers/trips");


router.route('/trips').get(tripsController.tripsList).post(tripsController.tripsAddTrip);


router.route('/trips/:tripCode').get(tripsController.tripsFindByCode);

router.route('/trips/:tripCode').put(tripsController.tripsUpdateTrip);


module.exports = router;