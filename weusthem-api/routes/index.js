var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const contacts = [
  {
    "id": uuidv4(),
    "fn": "YYY",
    "ln": "",
    "email": "",
    "number": "1234567890",
    "avatar": ""
  },
  {
    "id": uuidv4(),
    "fn": "aaa",
    "ln": "Luo",
    "email": "123@contacts.com",
    "number": "1023456789",
    "avatar": ""
  }
];


// get all
router.get('/contacts', function (req, res, next) {
  let result = [];
  if (req.query.keywords == null || req.query.keywords == undefined) {
    result = [...contacts];
  }
  const keywords = req.query.keywords;
  // for (let i = 0; i < contacts.length; i++) {
  //   if (contacts[i].fn.indexOf(keywords) >= 0 ||
  //     contacts[i].ln.indexOf(keywords) >= 0 ||
  //     contacts[i].number.indexOf(keywords) >= 0 ||
  //     contacts[i].email.indexOf(keywords) >= 0) {
  //     result.push(contacts[i]);
  //   }
  // }
  const keywordsFilter = (contact, keywords) =>{
    return (
      contact.fn.indexOf(keywords) ||
      contact.ln.indexOf(keywords) ||
      contact.number.indexOf(keywords) ||
      contact.email.indexOf(keywords)
    )
  }
  result = contacts.filter(keywordsFilter(contact, keywords));
  let sort = req.query.sort;
  if (sort == "true") {
    result.sort((a, b) =>
      a.fn.localeCompare(b.fn)
      // {let fnA = a.fn.toUpperCase();
      // let fnB = b.fn.toUpperCase();
      // if(fnA < fnB) {
      //   return -1;
      // }
      // if(fnA > fnB) {
      //   return 1;
      // }
      // return 0;}
    );
  }
  console.log(sort, result);
  res.send(result);
});

// add new contact
router.post('/contacts', function (req, res, next) {
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

router.put('/contacts/:id', function (req, res, next) {
  if (req.body.fn && req.body.number) {
    let contact = null;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == req.params.id) {
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
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id == req.params.id) {
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

router.delete('/contacts/:id', function (req, res, next) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id == req.params.id) {
      contacts.splice(i, 1)
      break;
    }
  }
  res.send(contacts);
});

router.get('/contacts/:id', function (req, res, next) {
  var contact = null;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id == req.params.id) {
      contact = contacts[i];
      break;
    }
  }
  res.send(contact);
});

module.exports = router;
