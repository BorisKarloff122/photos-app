const express = require('express');
const router = express.Router();
const fs = require('fs')

router.post('/upload', function (req, res, next){
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }
    let re = /(?:\.([^.]+))?$/;
    const file = req.files[Object.keys(req.files)[0]];
    const path =  "./public/assets/img/" + Object.keys(req.files)[0];
    const extensionName = re.exec(Object.keys(req.files)[0])[0];
    const allowedExtension = ['.png','.jpg','.jpeg'];

    if(allowedExtension.indexOf(extensionName) === -1){
        return res.status(422).send("Invalid Image");
    }


    file.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send({ status: "success", path: path });
    });
})

router.get('/remove', function (req, res, next){
    fs.unlink('./public/assets/img/' + req.query.path, (err) => {
        if (err) throw err;
        console.log(req.query.path + 'was deleted');
    });
})

router.post('/save', function (req, res, next){
    var jsonObj = req.body;

// stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);


    fs.writeFile("./public/assets/db.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
});

module.exports = router;
