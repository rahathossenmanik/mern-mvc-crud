const Book = require('../models/Book');

exports.list = (req, res) => {
  Book.find()
    .populate('author')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'An Error Occured' });
    });
};

exports.details = (req, res) => {
  Book.findById(req.params._id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'An Error Occured' });
    });
};

exports.create = (req, res) => {
  const newBook = new Book(req.body);
  newBook
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'An Error Occured' });
    });
};

exports.update = (req, res) => {
  Book.findByIdAndUpdate(req.params._id, req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'An Error Occured' });
    });
};

exports.delete = (req, res) => {
  Book.findByIdAndRemove(req.params._id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'An Error Occured' });
    });
};
