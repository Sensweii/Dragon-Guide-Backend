import { model, Schema } from 'mongoose';

const costumeSetSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'costumeStat'
    }]
});

const costumeModel = model('costumeSet', costumeSetSchema);

export default costumeModel;
