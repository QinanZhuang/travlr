const mongoose = require("mongoose");
const Trip = require("../models/travlr"); 
const Model = mongoose.model("trips");
const router = __express.router(); //router logic
const tripsController = require("../controllers/trips");


router  
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;    




const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // Return Single Record
        .exec();

    if(!q)
    {
        return res
                .status(404)
                .json(err);

    }else{
        return res
            .status(200)
            .json(q);
    }
};


module.exports = {
    tripsList
    

};



const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripsCode }) // Return Single Record
        .exec();

    if(!q)
    {
        return res
                .status(404)
                .json(err);

    }else{
        return res
            .status(200)
            .json(q);
    }
};




const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description

    });

    const q = await newTrip.save();

        if(!q)
        {
            return res
                    .status(400)
                    .json(err);}
        else{
            return res
                .status(201)
                .json(q);
        }

        console.log(q);


};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status

// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
// Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    )
    .exec();
    if(!q)
    { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }

    console.log(q);
};






module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
  
};

  