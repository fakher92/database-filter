var Standup = require('../models/standup.server.model.js');

exports.list = (req, res) => {
  var query = Standup.find();

  query
    .sort({ createdOn: 'desc' })
    .limit(12)
    .exec((err, results) => {
      res.render('index', { title: 'Standup - List', notes: results });
    });
};

exports.filterByMember = (req, res) => {
  var query = Standup.find();
  var filter = req.body.memberName;

  query.sort({ createdOn: 'desc' });

  if (filter.length > 0) {
    query.where({ memberName: filter });
  }

  query.exec((err, results) => {
    res.render('index', { title: 'Standup - List', notes: results });
  });
};

exports.create = (req, res) => {
  var entry = new Standup({
    memberName: req.body.memberName,
    project: req.body.project,
    workYesterday: req.body.workYesterday,
    workToday: req.body.workToday,
    impediment: req.body.impediment
  });

  entry.save(err => {
    if (err) {
      var errMsg =
        'Sorry, there was an error saving the stand-up meeting note. ' + err;
      res.render('newnote', {
        title: 'Standup - New Note (error)',
        message: errMsg
      });
    } else {
      console.log('Stand-up meeting note was saved!');
      // Redirect to the home page. . .
      res.redirect(301, '/');
    }
  });
};

exports.getNote = (req, res) => {
  res.render('newnote', { title: 'Standup - New Note' });
};
