const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const { storage, cloudinary } = require('../utils/cloudinary');
const upload = multer({ storage });
const Bar = require('../models/bar');

// Login authentication middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Display logged-in user's bar list
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const bars = await Bar.find({ owner: req.user._id }); // Query only the bars owned by logged-in user
    res.render('bars/index', { bars });
  } catch (err) {
    console.error('❌ Failed to retrieve bar data:', err);
    res.send('❌ Failed to retrieve bar data');
  }
});

// New bar creation page (requires login)
router.get('/new', isLoggedIn, (req, res) => {
  res.render('bars/new');
});

// Create a new bar (supports latitude/longitude + multiple image upload)
router.post('/', isLoggedIn, upload.array('images', 5), async (req, res) => {
  try {
    const { name, location, rating, description, latitude, longitude } = req.body;

    const images = req.files.map(f => ({ url: f.path, filename: f.filename }));

    const newBar = new Bar({
      name,
      location,
      latitude,
      longitude,
      rating,
      description,
      images,
      owner: req.user._id 
    });

    await newBar.save();
    console.log(`✅ Bar created successfully: ${newBar.name}`);
    res.redirect(`/bars/${newBar._id}`);
  } catch (err) {
    console.error('❌ Failed to create bar:', err);
    res.send('❌ Failed to create bar');
  }
});

// Display a single bar detail page
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('⚠️ Invalid ID format (not a valid Mongo ObjectId)');
    }

    const bar = await Bar.findById(id);
    if (!bar) return res.status(404).send('⚠️ Bar not found');

    res.render('bars/show', { bar });
  } catch (err) {
    console.error('❌ Failed to display bar:', err);
    res.status(500).send('❌ Failed to display bar');
  }
});

// Edit bar page (requires login)
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  try {
    const bar = await Bar.findById(req.params.id);
    if (!bar) return res.send('⚠️ Bar not found');

    if (!bar.owner.equals(req.user._id)) {
      return res.send('🚫 You do not have permission to edit this bar');
    }

    res.render('bars/edit', { bar });
  } catch (err) {
    console.error('❌ Failed to load edit page:', err);
    res.send('❌ Failed to load edit page');
  }
});

// Update bar (add new images + delete old images + update coordinates)
router.put('/:id', isLoggedIn, upload.array('images', 5), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, rating, description, latitude, longitude } = req.body;

    const bar = await Bar.findById(id);
    if (!bar) return res.send('⚠️ Bar not found');

    if (!bar.owner.equals(req.user._id)) {
      return res.send('🚫 You do not have permission to update this bar');
    }

    // Update fields
    bar.name = name || bar.name;
    bar.location = location || bar.location;
    bar.rating = rating || bar.rating;
    bar.description = description || bar.description;
    bar.latitude = latitude || bar.latitude;
    bar.longitude = longitude || bar.longitude;

    // Add new images
    const newImages = req.files.map(f => ({ url: f.path, filename: f.filename }));
    bar.images.push(...newImages);

    // Delete old images
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await bar.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } }
      });
      console.log('🗑️ Deleted images:', req.body.deleteImages);
    }

    await bar.save();
    console.log(`✅ Bar updated successfully: ${bar.name}`);
    res.redirect(`/bars/${bar._id}`);
  } catch (err) {
    console.error('❌ Failed to update bar:', err);
    res.send('❌ Failed to update bar');
  }
});

// Delete entire bar (requires login, includes Cloudinary image deletion)
router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const bar = await Bar.findById(req.params.id);
    if (!bar) return res.send('⚠️ Bar not found');
    
    // Check permission
    if (!bar.owner.equals(req.user._id)) {
      return res.send('🚫 You do not have permission to delete this bar');
    }

    // Delete all images from Cloudinary
    for (let img of bar.images) {
      await cloudinary.uploader.destroy(img.filename);
    }

    await bar.deleteOne();
    console.log(`Bar deleted:：${bar.name}`);
    res.redirect('/bars');
  } catch (err) {
    console.error('❌ Failed to delete bar:', err);
    res.send('❌ Failed to delete bar');
  }
});

module.exports = router;