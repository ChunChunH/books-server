/*
    Ruta de libros / Books
    Host + /api/books
*/

const {Router} = require('express');
const router = Router()
const { getBooks, getBook, addBook, editBook, deleteBook } = require('../controllers/books')
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { requiredRole } = require('../middlewares/requiredRole');

router.get('/', validateJWT, getBooks)

router.get('/:id', validateJWT, getBook)

router.post(
    '/new',
    [ // Middlewares
        check('name', 'Book name is required').not().isEmpty(),
        check('description', 'Book description is required').not().isEmpty(),
        check('pages', 'Book number of pages is required').not().isEmpty(),
        check('publicationDate', 'Book publication date is required').not().isEmpty(),
        check('excerpt', 'Book excerpt is required').not().isEmpty(),
        check('image', 'Book image is required').not().isEmpty(),
        validateFields,
        validateJWT,
        requiredRole('admin')
    ],
    addBook
)

router.put(
    '/:id',
    validateJWT,
    requiredRole('admin'),
    editBook,
)

router.delete('/:id', validateJWT, requiredRole('admin'), deleteBook)

module.exports = router;