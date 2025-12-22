import { MongoClient } from 'mongodb'

// Step 1: Database ka address lein
// .env file se MONGODB_URI lein, warna localhost use karein
const uri: string = 'mongodb://localhost:27017'

// Step 2: Connection banayein (direct connect)
const client = new MongoClient(uri)
const clientPromise = client.connect()

// Step 3: Export karein (dusre files use kar sakein)
export default clientPromise

