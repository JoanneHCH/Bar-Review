const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const Bar = require('../models/bar');

// Create a new review
router.get('/new', (req, res) => {
  res.render('reviews/new', { barId: req.params.id });
});

router.post('/', async (req, res) => {
  const bar = await Bar.findById(req.params.id);
  const review = new Review(req.body);
  await review.save();
  res.redirect(`/bars/${bar._id}`);
});

module.exports = router;