const { Schema, model } = require('mongoose');

const BookSchema = Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    pages: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

});

BookSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Book', BookSchema)