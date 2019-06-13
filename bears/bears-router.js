const db = require('./bears-model');

const router = require('express').Router();

router.get('/', (req, res) => {
  // get the bears from the database
  db.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // retrieve a bear by id
  db.findById(req.params.id)
    .then(bears => {
      res.json(bears);
    })
    .catch(err => {
      res.status(200).json(err);
    });
});

router.post('/', (req, res) => {
  // add a bear to the database
  db.add(req.body)
    .then(bear => {
      res.status(201).json(bear);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) {
    res.status(422).json({ message: 'name field required' });
  }
  // update bears
  db.update(id, { name })
    .then(bear => {
      if (bear) {
        res.json(bear);
      } else {
        res.status(404).json({ message: 'bear not found' });
      }
    })
    .catch(err => {
      res.status(err).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // remove bears (inactivate the bear)
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(204).end(); // we could also respond with 200 and a message
      }
    })
    .catch(err => {
      res.status(404).json({ message: 'bear not found' });
    });
});

module.exports = router;