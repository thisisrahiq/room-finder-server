const { getUsersCol } = require('../config/db');

const upsertUser = async (req, res) => {
  try {
    const { uid, name, email, photoURL, provider } = req.body;

    if (!uid || !email) {
      return res.status(400).json({
        success: false,
        message: 'uid and email are required fields',
      });
    }

    const result = await getUsersCol().updateOne(
      { uid },
      {
        $set:         { name, email, photoURL: photoURL || '', provider: provider || 'email', updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    const isNew = result.upsertedCount > 0;
    res.status(isNew ? 201 : 200).json({
      success: true,
      message: isNew ? 'User registered successfully' : 'User profile updated',
      data: {
        upserted:      isNew,
        insertedId:    result.upsertedId ?? undefined,
        matchedCount:  result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

module.exports = { upsertUser };
