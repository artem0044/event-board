import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    name: String,
    email: String,
    birthDate: Number,
    source: String,
    eventId: String,
    registrationDate: Number
});

export default mongoose.model('participantscollections', participantSchema);
