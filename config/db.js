const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version:           ServerApiVersion.v1,
    strict:            true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async () => {
  if (db) return db;
  await client.connect();
  db = client.db('roommate_finder_db');
  console.log('✅ Connected to MongoDB Atlas — roommate_finder_db');
  return db;
};

const getDB          = ()  => db;
const getUsersCol    = ()  => db.collection('users');
const getListingsCol = ()  => db.collection('listings');

module.exports = { connectDB, getDB, getUsersCol, getListingsCol };
