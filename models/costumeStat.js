import mongoose from 'mongoose';

const costumeStatSchema = new mongoose.Schema({
    part:{ type: String, required: true },
    details:{ type: Object, required: true },
    costume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'costumeSet'
    }
});

const costumeStatModel = mongoose.model('costumeStat', costumeStatSchema);

export default costumeStatModel;
