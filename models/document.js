const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    textTerm: {
        type: String,
        default: ""
    },

    documentId: {
        type: String,
        default: ""
    },

    termFrequency: {
        type: Number,
        default: 0
    }
})

const Document = mongoose.model('Document', documentSchema)

module.exports = Document