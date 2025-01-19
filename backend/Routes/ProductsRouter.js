const router = require('express').Router();
const ensureAuthentication = require('../Middleware/Auth');


router.get("/", ensureAuthentication, (req, res) => {
    console.log("------- Logged in User -------", req.user);
    res.status(200).json([
        {
            name: "Iphone 15",
            price: 65000
        },
        {
            name: "Iphone 15 Pro",
            price: 70000
        },
        {
            name: "Iphone 15 Pro Max",
            price: 85000
        }
    ])
});

module.exports = router;