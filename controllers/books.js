const {response} = require('express');
const Book = require('../models/Book')

const getBooks = async(req, res = response) => {

    const books = await Book.find();

    res.status(200).json({
        msg: 'Successfully obtained books',
        books
})
}

const addBook = async(req, res = response) => {

    // const { name, description, pages, publicationDate, excerpt, image } = req.body

    try {
        const book = new Book(req.body)
    
        await book.save()
    
        res.status(201).json({
            msg: 'Book added successfully',
            book
            // name,
            // description,
            // pages,
            // publicationDate,
            // excerpt,
            // image
        })
    } catch (error) {
        res.status(400).json({
            msg: `The book ${req.body.name} already exists`
        })
    }

}

const editBook = async(req, res = response) => {

    const bookId = req.params.id

    try {
        const book = await Book.findById(bookId)

        if(!book){
            res.status(404).json({
                msg: `The book with the id ${bookId} doesn't exist`,
            })
        }

        const bookUpdated = await Book.findByIdAndUpdate(bookId, req.body, {new: true}) //Quiero que retorne los datos actualizados, para eso sirve el new: true

        res.status(200).json({
            msg: 'Book edited successfully',
            book: bookUpdated,
        })

    } catch (error) {
        console.log(error)
    }
}

const deleteBook = async(req, res = response) => {

    const bookId = req.params.id

    try {
        const book = await Book.findById(bookId)

        if(!book){
            res.status(404).json({
                msg: `The book with the id ${bookId} doesn't exist`,
            })
        }

        const bookUpdated = await Book.findByIdAndDelete(bookId) //Quiero que retorne los datos actualizados, para eso sirve el new: true

        res.status(200).json({
            msg: `The book ${book.name} was succesfully removed`,
            bookDeleted: bookUpdated,
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBooks,
    addBook,
    editBook,
    deleteBook
}