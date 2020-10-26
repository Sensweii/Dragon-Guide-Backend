import { model, Schema } from 'mongoose';

const costumeStatSchema = new Schema({
    part:{ type: String, required: true },
    details:{ type: Object, required: true },
    costume: {
        type: Schema.Types.ObjectId,
        ref: 'costumeSet'
    }
});

const costumeStatModel = model('costumeStat', costumeStatSchema);

export default costumeStatModel;
