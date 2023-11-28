var express = require('express');
var router = express.Router();
var fakesocial = require('../services/fakeservices'); 

var contacts = [
  {"name": "peter", "phone": 12345},
  {"name": "john", "phone": 6893}
]

/* GET contacts listing */
router.get('/', function(req, res, next) {
  res.send(contacts);
});

/* POST contact */
router.post('/', function(req, res, next){
  var contact = res.body;
  contacts.push(contact);
  res.sendStatus(201);
});

/* GET contact/id 
router.get('/:name', function(req, res, next){
  var name = res.params.name;
  var result = contacts.find(c => {
    return c.name == name;
  });
  if(result){
    res.send(result);
  }else{
    res.sendStatus(404);
  }
})*/

/* GET contact/id and fakesocials */
router.get('/:name', async function(req, res, next){
  var name = res.params.name;
  var result = contacts.find(c => {
    return c.name == name;
  });
  var social = await fakesocial.getSocial(name);
  if(result){
    res.send({
      ...result,
      "social":social
    });
  }else{
    res.sendStatus(404);
  }
})

module.exports = router;
