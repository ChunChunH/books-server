const {Router} = require('express');
const router = Router()
const {check} = require('express-validator');
const { register, login, tokenRevalidate } = require('../controllers/auth');
const {validateFields} = require('../middlewares/validate-fields')
const {validateJWT} = require('../middlewares/validate-jwt')

router.post(
    "/new",
    [
        check('name', 'Username is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    register
)

router.post(
    "/",
    [
        check('email', 'Email is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
)

router.get("/renew", validateJWT, tokenRevalidate)

module.exports = router;