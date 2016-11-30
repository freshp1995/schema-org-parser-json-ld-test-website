var express = require('express');
var router = express.Router();
var schemaParser = require('../classes/schema-org-parser-json-ld');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Parser', url: '', error: ''});
});

router.post('/', function (req, res, next) {
    var url = req.body.url;

    if (url) {
        schemaParser.getJsonLdOfUrl(url, function (result, error) {
            var indexResult = {
                title: 'Parser',
                url: req.body.url
            };
            if (error)
                indexResult.error = error;
            else if (result)
                indexResult.result = result;
            else
                indexResult.error = new Error('Other error');
            res.render('index', indexResult)
        })
    } else
        res.render('index', {
            title: 'Parser',
            url: req.body.url,
            error: new Error('No url given!')
        })

});

module.exports = router;
