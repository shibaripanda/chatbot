import mongoose from 'mongoose'
import { fix } from '../fix.js';

const Schema = mongoose.Schema

const appSchema = new Schema({
app: {
    type: String,
    required: false,
},
welcomeMessage: {
    type: String,
    default: 'Привет',
    required: true,
},
buyMessage: {
    type: String,
    default: 'Пока',
    required: true,
},
superAdmin: {
    type: String,
    default: '599773731',
    required: true,
},
admins: {
    type: Array,
    default: ['599773731'],
    required: true,
},
instruct: {
    type: String,
    default: 'Инструкция',
    required: true,
}
}, { timestamps: true});


export const App = mongoose.model('App', appSchema)
