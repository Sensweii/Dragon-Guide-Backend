import mongoose from 'mongoose';

const costumeSetSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    image:{ type: String, required: true },
    designer:{ type: String, required: false },
    rarity:{ type: String, required: true },
    price:{ type: Number, default: 0, required: true},
    countInStock:{ type: Number, default: 0, required: true },
    description:{ type: String, required: false },
    rating:{ type: Number, default: 0, required: true },
    numLikes:{ type: Number, default: 0, required: true },
    stats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'costumeStat'
    }]
});

const costumeModel = mongoose.model('costumeSet', costumeSetSchema);

export default costumeModel;
