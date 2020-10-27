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
    available:{ type: Boolean, default: false, required: true },
    stats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'costumeStat'
    }]
},
    {
        collection: 'costumeSet'
    }
);

const costumeModel = mongoose.model('Costume', costumeSetSchema);

export default costumeModel;
