import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    eventDate: Number,
    organizer: String
});


eventSchema.index({ title: 1 });
eventSchema.index({ eventDate: 1 });
eventSchema.index({ organizer: 1 });

export default mongoose.model('eventsCollection', eventSchema);