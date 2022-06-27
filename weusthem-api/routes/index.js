var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

var contacts = [
  {
    "id": uuidv4(),
    "fn": "demo1",
    "ln": "",
    "email": "",
    "number": "1234567890",
    "avatar": ""
  },
  {
    "id": uuidv4(),
    "fn": "demo2",
    "ln": "Luo",
    "email": "123@contacts.com",
    "number": "1023456789",
    "avatar": ""
  }
];

// get all
router.get('/contacts', function(req, res, next) {
  res.send(contacts);
});

// add new contact
router.post('/contacts', function(req, res, next) {
  if (req.body.fn && req.body.number) {
    let contact = {
      "id": uuidv4(),
      "fn": req.body.fn,
      "ln": req.body.ln,
      "email": req.body.email,
      "number": req.body.number,
      "avatar": req.body.avatar,
    };
    contacts.push(contact);
  } else {
    res.statusCode = 500;
    res.send({
      "error": "First name and Phone number are required."
    })
  }
  res.send(contacts);
});

router.put('/contacts/:id', function(req, res, next) {
  if (req.body.fn && req.body.number) {
    let contact = null;
    for(let i=0;i<contacts.length;i++) {
      if (contacts[i].id ==  req.params.id) {
        contact = contacts[i];
        break;
      }
    }
    if (contact != null) {
      contact = {
        "id": req.params.id,
        "fn": req.body.fn,
        "ln": req.body.ln,
        "email": req.body.email,
        "number": req.body.number,
        "avatar": req.body.avatar,
      }
      for(let i=0;i<contacts.length;i++) {
        if (contacts[i].id ==  req.params.id) {
          contacts[i] = contact;
          break;
        }
      }
    }
  } else {
    res.statusCode = 500;
    res.send({
      "error": "First name and Phone number are required."
    })
  }
  res.send(contacts);
});

router.delete('/contacts/:id', function(req, res, next) {
  for(let i=0;i<contacts.length;i++) {
    if (contacts[i].id ==  req.params.id) {
      contacts.splice(i, 1)
      break;
    }
  }
  res.send(contacts);
});

router.get('/contacts/:id', function(req, res, next) {
  var contact = null;
  for(let i=0;i<contacts.length;i++) {
    if (contacts[i].id ==  req.params.id) {
      contact = contacts[i];
      break;
    }
  }
  res.send(contact);
});

module.exports = router;
