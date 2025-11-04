const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mainImage: { type: String, required: true },
  images: { type: [String], default: [] },
  showOnMain: { type: Boolean, default: false },
  category: {
    type: String,
    required: true,
    enum: ['spices', 'herbs', 'seasonings'],
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
