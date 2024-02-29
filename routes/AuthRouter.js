const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

router.post('/login', controller.LoginCustomer)
router.post('/register', controller.RegisterCustomer)
router.put(
  '/update/:customer_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePasswordCustomer
)
router.post('/companylogin', controller.LoginCompany)
router.post('/companyregister', controller.RegisterCompany)
router.put(
  '/companyupdate/:company_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePasswordCompany
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
