import mongoose from "mongoose";

const ShortUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
});

const ShortUrl = mongoose.models['Short-Url'] || mongoose.model('Short-Url', ShortUrlSchema);

export default ShortUrl;
