const { ObjectId }       = require('mongodb');
const { getListingsCol } = require('../config/db');

const VALID_ROOM_TYPES  = ['Single', 'Shared', 'Studio', 'Master Bedroom'];
const VALID_AVAILABILITY = ['Available', 'Not Available'];

// ── GET /listings ─────────────────────────────────────────────────────────────
const getAllListings = async (req, res) => {
  try {
    const { status, limit, userEmail } = req.query;
    const filter = {};

    if (status === 'available') filter.availability = 'Available';
    if (userEmail)              filter.userEmail     = userEmail;

    let cursor = getListingsCol().find(filter).sort({ createdAt: -1 });
    if (limit)  cursor = cursor.limit(parseInt(limit));

    const listings = await cursor.toArray();
    res.status(200).json({
      success: true,
      message: 'Listings retrieved successfully',
      data:    listings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// ── GET /listings/:id ─────────────────────────────────────────────────────────
const getListingById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid listing ID format' });
    }
    const listing = await getListingsCol().findOne({ _id: new ObjectId(req.params.id) });
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.status(200).json({ success: true, message: 'Listing found', data: listing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// ── POST /listings ────────────────────────────────────────────────────────────
const createListing = async (req, res) => {
  try {
    const { title, location, rent, roomType, lifestyle, description, contactInfo, availability } = req.body;

    if (!title || !location || !rent || !roomType || !description || !contactInfo || !availability) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }
    if (!VALID_ROOM_TYPES.includes(roomType)) {
      return res.status(400).json({ success: false, message: `Invalid roomType. Must be one of: ${VALID_ROOM_TYPES.join(', ')}` });
    }
    if (!VALID_AVAILABILITY.includes(availability)) {
      return res.status(400).json({ success: false, message: "Invalid availability. Must be 'Available' or 'Not Available'" });
    }
    const parsedRent = Number(rent);
    if (isNaN(parsedRent) || parsedRent <= 0) {
      return res.status(400).json({ success: false, message: 'rent must be a positive number' });
    }

    const result = await getListingsCol().insertOne({
      title:        title.trim(),
      location:     location.trim(),
      rent:         parsedRent,
      roomType,
      lifestyle:    Array.isArray(lifestyle) ? lifestyle : [],
      description:  description.trim(),
      contactInfo:  contactInfo.trim(),
      availability,
      likeCount:    0,
      userEmail:    req.user.email,
      userName:     req.user.name || req.user.email.split('@')[0],
      createdAt:    new Date(),
      updatedAt:    null,
    });

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data:    { insertedId: result.insertedId },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// ── PUT /listings/:id ─────────────────────────────────────────────────────────
const updateListing = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid listing ID format' });
    }

    const { title, location, rent, roomType, lifestyle, description, contactInfo, availability } = req.body;

    if (!title || !location || !rent || !roomType || !description || !contactInfo || !availability) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }
    if (!VALID_ROOM_TYPES.includes(roomType)) {
      return res.status(400).json({ success: false, message: `Invalid roomType. Must be one of: ${VALID_ROOM_TYPES.join(', ')}` });
    }
    if (!VALID_AVAILABILITY.includes(availability)) {
      return res.status(400).json({ success: false, message: "Invalid availability. Must be 'Available' or 'Not Available'" });
    }

    const result = await getListingsCol().updateOne(
      { _id: new ObjectId(req.params.id), userEmail: req.user.email },
      {
        $set: {
          title:        title.trim(),
          location:     location.trim(),
          rent:         Number(rent),
          roomType,
          lifestyle:    Array.isArray(lifestyle) ? lifestyle : [],
          description:  description.trim(),
          contactInfo:  contactInfo.trim(),
          availability,
          updatedAt:    new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(403).json({ success: false, message: 'Forbidden: You can only update your own listings' });
    }

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      data:    { matchedCount: result.matchedCount, modifiedCount: result.modifiedCount },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// ── PATCH /listings/:id/like ──────────────────────────────────────────────────
const likeListing = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid listing ID format' });
    }

    const result = await getListingsCol().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $inc: { likeCount: 1 } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Like added successfully',
      data:    { modifiedCount: result.modifiedCount },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// ── DELETE /listings/:id ──────────────────────────────────────────────────────
const deleteListing = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid listing ID format' });
    }

    const result = await getListingsCol().deleteOne({
      _id:       new ObjectId(req.params.id),
      userEmail: req.user.email,
    });

    if (result.deletedCount === 0) {
      return res.status(403).json({ success: false, message: 'Forbidden: You can only delete your own listings' });
    }

    res.status(200).json({
      success:  true,
      message:  'Listing deleted successfully',
      data:     { deletedCount: result.deletedCount },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

module.exports = { getAllListings, getListingById, createListing, updateListing, likeListing, deleteListing };
