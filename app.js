const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');

const app = express();
// const dotenv = require("dotenv");
// dotenv.config();

//Parse application/json
app.use(bodyParser.json())

const PORT = process.env.PORT || 6000;
console.log("🚀 ~ file: app.js ~ line 10 ~ PORT", PORT)


// image upload using multer

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// var upload = multer({storage:storage})
var upload = multer({storage})

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/image-upload', upload.single('image'), (req, res) => {
        const image = req.image;
        console.log(req.body)
            res.send(apiResponse({message: 'File uploaded successfully', image}));
});

/**
 * API Response
 *
 * @return response()
 */
 function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

//Server-listening:

app.listen(PORT, (err) => {
    console.log('Server started on port', PORT);
})