import mongoose from 'mongoose'
import { fix } from '../fix.js';

const Schema = mongoose.Schema

const userSchema = new Schema({
id: {
    type: String,
    required: true,
},
statusName: {
    type: String,
    required: false,
},
status: {
    type: String,
    required: false,
},
text: {
    type: String,
    // default: fix.startText,
    required: false,
},
usernameCurrent: {
    type: String,
    required: false,
},
countMessagesInChat: {
    type: Number,
    required: true,
},
photoForPresent: {
    type: Object,
    // default: {},
    required: false,
},
time: {
    type: Array,
    // default: [{in: Date.now()}],
    required: false,
},
love: {
    type: Array,
    default: [],
    required: false,
}
}, { timestamps: true});


export const User = mongoose.model('Bel2', userSchema)
