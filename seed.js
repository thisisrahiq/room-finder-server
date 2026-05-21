require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version:           ServerApiVersion.v1,
    strict:            true,
    deprecationErrors: true,
  },
});

const users = [
  { uid: 'firebase_uid_rahiq_001', name: 'Rahiq Ahmed',    email: 'rahiq@example.com',  photoURL: 'https://api.dicebear.com/8.x/avataaars/svg?seed=rahiq',  provider: 'google', createdAt: new Date('2026-04-10T08:00:00Z'), updatedAt: new Date('2026-05-20T10:30:00Z') },
  { uid: 'firebase_uid_sarah_002', name: 'Sarah Islam',    email: 'sarah@example.com',  photoURL: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sarah',  provider: 'email',  createdAt: new Date('2026-04-15T09:00:00Z'), updatedAt: new Date('2026-04-15T09:00:00Z') },
  { uid: 'firebase_uid_tanvir_003',name: 'Tanvir Hossain', email: 'tanvir@example.com', photoURL: 'https://api.dicebear.com/8.x/avataaars/svg?seed=tanvir', provider: 'google', createdAt: new Date('2026-04-18T11:00:00Z'), updatedAt: new Date('2026-05-10T08:15:00Z') },
  { uid: 'firebase_uid_mitu_004',  name: 'Mitu Akter',     email: 'mitu@example.com',   photoURL: 'https://api.dicebear.com/8.x/avataaars/svg?seed=mitu',   provider: 'email',  createdAt: new Date('2026-05-01T14:00:00Z'), updatedAt: new Date('2026-05-01T14:00:00Z') },
];

const listings = [
  // ── ROOM LISTINGS (listingType: 'Room') ─────────────────────────────────────
  { 
    title: 'Cozy Single Room Near BUET Campus', 
    location: 'Polashi, Dhaka', 
    rent: 6500, 
    roomType: 'Single', 
    listingType: 'Room',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Non-smoker', 'Student', 'Early riser'], 
    description: 'A well-furnished single room in a quiet 3-bedroom apartment shared with 2 male students. 24/7 security, gas and water included. 10-minute walk to BUET main gate. Ideal for undergraduate or graduate students.', 
    contactInfo: '01711-100001', 
    availability: 'Available', 
    likeCount: 14, 
    userEmail: 'rahiq@example.com', 
    userName: 'Rahiq Ahmed', 
    createdAt: new Date('2026-05-01T09:00:00Z'), 
    updatedAt: null 
  },
  { 
    title: 'Master Bedroom in Gulshan 2 — Professional Preferred', 
    location: 'Gulshan 2, Dhaka', 
    rent: 22000, 
    roomType: 'Master Bedroom', 
    listingType: 'Room',
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Professional', 'Non-smoker', 'Quiet'], 
    description: 'Spacious master bedroom with attached bathroom in a luxury high-rise apartment. WiFi, electricity, cleaning service, and parking included. Ideal for a working professional. Building has gym and rooftop access.', 
    contactInfo: '01711-100002', 
    availability: 'Available', 
    likeCount: 42, 
    userEmail: 'rahiq@example.com', 
    userName: 'Rahiq Ahmed', 
    createdAt: new Date('2026-05-03T10:30:00Z'), 
    updatedAt: null 
  },
  { 
    title: 'Modern Studio Apartment in Bashundhara R/A', 
    location: 'Bashundhara R/A, Block C, Dhaka', 
    rent: 13000, 
    roomType: 'Studio', 
    listingType: 'Room',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Professional', 'Non-smoker', 'Quiet', 'Pet-friendly'], 
    description: 'Fully self-contained modern studio apartment with a built-in kitchen, private bathroom, and balcony. Located in a gated community with generator backup and security. Internet-ready. Perfect for a solo professional or couple.', 
    contactInfo: '01722-200001', 
    availability: 'Available', 
    likeCount: 27, 
    userEmail: 'sarah@example.com', 
    userName: 'Sarah Islam', 
    createdAt: new Date('2026-05-05T08:00:00Z'), 
    updatedAt: null 
  },
  { 
    title: 'Single Room Near Dhaka University — Female Only', 
    location: 'Nilkhet, Dhaka', 
    rent: 5800, 
    roomType: 'Single', 
    listingType: 'Room',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Student', 'Non-smoker', 'Early riser', 'Quiet'], 
    description: 'Safe and secure single room for female students only. Located in a female-only flat with 3 other DU students. Walking distance to TSC and central library. Gas, water, and Wi-Fi included. CCTV in common areas.', 
    contactInfo: '01722-200002', 
    availability: 'Available', 
    likeCount: 19, 
    userEmail: 'sarah@example.com', 
    userName: 'Sarah Islam', 
    createdAt: new Date('2026-05-07T11:00:00Z'), 
    updatedAt: null 
  },
  { 
    title: 'Furnished Single Room in Dhanmondi — Quiet Neighbourhood', 
    location: 'Dhanmondi 15, Dhaka', 
    rent: 8200, 
    roomType: 'Single', 
    listingType: 'Room',
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Non-smoker', 'Student', 'Professional'], 
    description: 'Well-furnished single room with AC, attached bathroom, and large wardrobe. Shared kitchen and living space with one other resident. Located in a calm residential street in Dhanmondi 15. Walking distance to Lalmatia and Shimanto Square.', 
    contactInfo: '01833-300001', 
    availability: 'Available', 
    likeCount: 11, 
    userEmail: 'tanvir@example.com', 
    userName: 'Tanvir Hossain', 
    createdAt: new Date('2026-05-10T09:30:00Z'), 
    updatedAt: null 
  },

  // ── ROOMMATE LISTINGS (listingType: 'Roommate') ─────────────────────────────
  { 
    title: 'Looking for Roommate to Share Flat in Banani', 
    location: 'Banani, Dhaka', 
    rent: 9500, 
    roomType: 'Shared', 
    listingType: 'Roommate',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Professional', 'Non-smoker', 'Night owl'], 
    description: 'Looking for an easy-going professional roommate to share a luxury flat in prime Banani. Your room is fully furnished with a separate bed. Close to Kamal Ataturk Avenue offices and eateries. Shared utility bills.', 
    contactInfo: '01722-200003', 
    availability: 'Available', 
    likeCount: 35, 
    userEmail: 'sarah@example.com', 
    userName: 'Sarah Islam', 
    createdAt: new Date('2026-05-09T13:00:00Z'), 
    updatedAt: null 
  },
  { 
    title: 'Friendly Flatmate Needed for Uttara Sector 11 Apartment', 
    location: 'Uttara Sector 11, Dhaka', 
    rent: 14000, 
    roomType: 'Master Bedroom', 
    listingType: 'Roommate',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Professional', 'Non-smoker', 'Quiet', 'Vegetarian'], 
    description: 'Looking for a clean, vegetarian roommate to take over the master bedroom with balcony in a lovely family building. I am a quiet corporate worker who loves reading. Utilities split equally.', 
    contactInfo: '01833-300002', 
    availability: 'Available', 
    likeCount: 23, 
    userEmail: 'tanvir@example.com', 
    userName: 'Tanvir Hossain', 
    createdAt: new Date('2026-04-25T15:00:00Z'), 
    updatedAt: new Date('2026-05-15T09:00:00Z') 
  },
  { 
    title: 'Student Roommate Needed for Budget Studio Mohammadpur', 
    location: 'Mohammadpur, Dhaka', 
    rent: 3750, 
    roomType: 'Studio', 
    listingType: 'Roommate',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Student', 'Non-smoker', 'Early riser'], 
    description: 'Looking for a fellow student roommate to split a budget studio in Mohammadpur. Rent includes utilities. The space is small but cozy and close to universities. Must be neat and tidy.', 
    contactInfo: '01944-400001', 
    availability: 'Available', 
    likeCount: 6, 
    userEmail: 'mitu@example.com', 
    userName: 'Mitu Akter', 
    createdAt: new Date('2026-05-12T10:00:00Z'), 
    updatedAt: null 
  },
  { 
    title: 'Need 2 Male Roommates for Rayer Bazar Shared Flat', 
    location: 'Rayer Bazar, Dhaka', 
    rent: 3800, 
    roomType: 'Shared', 
    listingType: 'Roommate',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Student', 'Early riser', 'Non-smoker'], 
    description: 'We need two student roommates to share a large, sunny room in a 5-person flat. Common kitchen, shared bathrooms, and rooftop access. Very affordable. Convenient for DU, Eden, or Dhaka College students.', 
    contactInfo: '01944-400002', 
    availability: 'Available', 
    likeCount: 3, 
    userEmail: 'mitu@example.com', 
    userName: 'Mitu Akter', 
    createdAt: new Date('2026-05-14T12:00:00Z'), 
    updatedAt: null 
  },
  { 
    title: 'Shared Room in Mirpur DOHS — Looking for roommate', 
    location: 'Mirpur DOHS, Dhaka', 
    rent: 4500, 
    roomType: 'Shared', 
    listingType: 'Roommate',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    lifestyle: ['Student', 'Non-smoker', 'Vegetarian'], 
    description: 'Looking for a flatmate to share a clean room in a calm Mirpur DOHS environment. Shared kitchen and bathrooms. Rent includes gas and water. Suitable for students or interns.', 
    contactInfo: '01711-100003', 
    availability: 'Available', 
    likeCount: 8, 
    userEmail: 'rahiq@example.com', 
    userName: 'Rahiq Ahmed', 
    createdAt: new Date('2026-04-20T14:00:00Z'), 
    updatedAt: new Date('2026-05-10T11:00:00Z') 
  },
];

async function seed() {
  try {
    await client.connect();
    const db = client.db('roommate_finder_db');

    await db.collection('users').deleteMany({});
    await db.collection('listings').deleteMany({});
    console.log('🗑️  Cleared existing data');

    const ur = await db.collection('users').insertMany(users);
    const lr = await db.collection('listings').insertMany(listings);

    console.log(`✅ Inserted ${ur.insertedCount} users`);
    console.log(`✅ Inserted ${lr.insertedCount} listings`);
    console.log('🎉 Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await client.close();
  }
}

seed();
