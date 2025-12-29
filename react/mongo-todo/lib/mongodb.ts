import { MongoClient } from "mongodb";

const uri = 'mongodb://localhost:27017'

const client = new MongoClient(uri)

const clientPromise = client.connect()

export default clientPromise


