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
  { title: 'Cozy Single Room Near BUET Campus', location: 'Polashi, Dhaka', rent: 6500, roomType: 'Single', lifestyle: ['Non-smoker', 'Student', 'Early riser'], description: 'A well-furnished single room in a quiet 3-bedroom apartment shared with 2 male students. 24/7 security, gas and water included. 10-minute walk to BUET main gate. Ideal for undergraduate or graduate students.', contactInfo: '01711-100001', availability: 'Available', likeCount: 14, userEmail: 'rahiq@example.com', userName: 'Rahiq Ahmed', createdAt: new Date('2026-05-01T09:00:00Z'), updatedAt: null },
  { title: 'Master Bedroom in Gulshan 2 — Professional Preferred', location: 'Gulshan 2, Dhaka', rent: 22000, roomType: 'Master Bedroom', lifestyle: ['Professional', 'Non-smoker', 'Quiet'], description: 'Spacious master bedroom with attached bathroom in a luxury high-rise apartment. WiFi, electricity, cleaning service, and parking included. Ideal for a working professional. Building has gym and rooftop access.', contactInfo: '01711-100002', availability: 'Available', likeCount: 42, userEmail: 'rahiq@example.com', userName: 'Rahiq Ahmed', createdAt: new Date('2026-05-03T10:30:00Z'), updatedAt: null },
  { title: 'Shared Room in Mirpur DOHS — Two Beds Available', location: 'Mirpur DOHS, Dhaka', rent: 4500, roomType: 'Shared', lifestyle: ['Student', 'Non-smoker', 'Vegetarian'], description: 'Two bed shared room in a clean and calm environment inside DOHS. Common kitchen and two washrooms. Rent includes electricity and water bills. Close to local markets and transport. Suitable for students or entry-level employees.', contactInfo: '01711-100003', availability: 'Not Available', likeCount: 8, userEmail: 'rahiq@example.com', userName: 'Rahiq Ahmed', createdAt: new Date('2026-04-20T14:00:00Z'), updatedAt: new Date('2026-05-10T11:00:00Z') },
  { title: 'Modern Studio Apartment in Bashundhara R/A', location: 'Bashundhara R/A, Block C, Dhaka', rent: 13000, roomType: 'Studio', lifestyle: ['Professional', 'Non-smoker', 'Quiet', 'Pet-friendly'], description: 'Fully self-contained modern studio apartment with a built-in kitchen, private bathroom, and balcony. Located in a gated community with generator backup and security. Internet-ready. Perfect for a solo professional or couple.', contactInfo: '01722-200001', availability: 'Available', likeCount: 27, userEmail: 'sarah@example.com', userName: 'Sarah Islam', createdAt: new Date('2026-05-05T08:00:00Z'), updatedAt: null },
  { title: 'Single Room Near Dhaka University — Female Only', location: 'Nilkhet, Dhaka', rent: 5800, roomType: 'Single', lifestyle: ['Student', 'Non-smoker', 'Early riser', 'Quiet'], description: 'Safe and secure single room for female students only. Located in a female-only flat with 3 other DU students. Walking distance to TSC and central library. Gas, water, and Wi-Fi included. CCTV in common areas.', contactInfo: '01722-200002', availability: 'Available', likeCount: 19, userEmail: 'sarah@example.com', userName: 'Sarah Islam', createdAt: new Date('2026-05-07T11:00:00Z'), updatedAt: null },
  { title: '2-Person Shared Flat in Banani — Corporate Area', location: 'Banani, Dhaka', rent: 9500, roomType: 'Shared', lifestyle: ['Professional', 'Non-smoker', 'Night owl'], description: 'Shared flat in prime Banani location. Two separate beds in a large room with a shared bathroom. Located on the 6th floor of an elevator building. Close to Kamal Ataturk Avenue offices, restaurants, and cafes. Ideal for young professionals.', contactInfo: '01722-200003', availability: 'Available', likeCount: 35, userEmail: 'sarah@example.com', userName: 'Sarah Islam', createdAt: new Date('2026-05-09T13:00:00Z'), updatedAt: null },
  { title: 'Furnished Single Room in Dhanmondi — Quiet Neighbourhood', location: 'Dhanmondi 15, Dhaka', rent: 8200, roomType: 'Single', lifestyle: ['Non-smoker', 'Student', 'Professional'], description: 'Well-furnished single room with AC, attached bathroom, and large wardrobe. Shared kitchen and living space with one other resident. Located in a calm residential street in Dhanmondi 15. Walking distance to Lalmatia and Shimanto Square.', contactInfo: '01833-300001', availability: 'Available', likeCount: 11, userEmail: 'tanvir@example.com', userName: 'Tanvir Hossain', createdAt: new Date('2026-05-10T09:30:00Z'), updatedAt: null },
  { title: 'Master Bedroom in Uttara Sector 11 — Family Building', location: 'Uttara Sector 11, Dhaka', rent: 14000, roomType: 'Master Bedroom', lifestyle: ['Professional', 'Non-smoker', 'Quiet', 'Vegetarian'], description: 'Large master bedroom with balcony and attached bathroom in a family residential building. Suitable for a married couple or senior professional. Lift, generator, and security guard included. 5 minutes from BRT station.', contactInfo: '01833-300002', availability: 'Not Available', likeCount: 23, userEmail: 'tanvir@example.com', userName: 'Tanvir Hossain', createdAt: new Date('2026-04-25T15:00:00Z'), updatedAt: new Date('2026-05-15T09:00:00Z') },
  { title: 'Budget Studio in Mohammadpur — Utilities Included', location: 'Mohammadpur, Dhaka', rent: 7500, roomType: 'Studio', lifestyle: ['Student', 'Non-smoker', 'Early riser'], description: 'Affordable studio in a lively area of Mohammadpur. Gas, electricity, and water bills are all included in the rent. Kitchen and bathroom are private. Good transport connections to Mirpur, Azimpur, and Farmgate.', contactInfo: '01944-400001', availability: 'Available', likeCount: 6, userEmail: 'mitu@example.com', userName: 'Mitu Akter', createdAt: new Date('2026-05-12T10:00:00Z'), updatedAt: null },
  { title: 'Affordable Shared Room in Rayer Bazar — 2 Openings', location: 'Rayer Bazar, Dhaka', rent: 3800, roomType: 'Shared', lifestyle: ['Student', 'Early riser', 'Non-smoker'], description: 'Very affordable shared room with two current openings in a 5-person flat. Common kitchen, two bathrooms, rooftop access, and study area. Suitable for university students who want to cut costs. Near Dhaka College, Eden College, and Azimpur.', contactInfo: '01944-400002', availability: 'Available', likeCount: 3, userEmail: 'mitu@example.com', userName: 'Mitu Akter', createdAt: new Date('2026-05-14T12:00:00Z'), updatedAt: null },
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
