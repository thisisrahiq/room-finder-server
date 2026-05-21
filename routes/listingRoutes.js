const express    = require('express');
const router     = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  likeListing,
  deleteListing,
} = require('../controllers/listingController');

// Public
router.get('/', getAllListings);

// Private
router.get('/:id',          verifyToken, getListingById);
router.post('/',            verifyToken, createListing);
router.put('/:id',          verifyToken, updateListing);
router.patch('/:id/like',   verifyToken, likeListing);
router.delete('/:id',       verifyToken, deleteListing);

module.exports = router;
