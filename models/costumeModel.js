import mongoose from 'mongoose';

const costumeSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    image:{ type: String, required: true },
    designer:{ type: String, required: false },
    rarity:{ type: String, required: true },
    price:{ type: Number, default: 0, required: true},
    countInStock:{ type: Number, default: 0, required: true },
    description:{ type: String, required: false },
    rating:{ type: Number, default: 0, required: true },
    numLikes:{ type: Number, default: 0, required: true }
});

const costumeModel = mongoose.model('Costume', costumeSchema);

export default costumeModel;
