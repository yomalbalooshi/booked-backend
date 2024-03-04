const Customer = require('../models/Customer')
const Company = require('../models/Company')

const middleware = require('../middleware')

const RegisterCustomer = async (req, res) => {
  try {
    const { email, password, name } = req.body

    let passwordDigest = await middleware.hashPassword(password)

    let exsitingCustomer = await Customer.findOne({ email })

    if (exsitingCustomer) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      const customer = await Customer.create({ name, email, passwordDigest })
      res.send(customer)
    }
  } catch (error) {
    throw error
  }
}

const LoginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body
    const customer = await Customer.findOne({ email })
    let matched = await middleware.comparePassword(
      customer.passwordDigest,
      password
    )

    if (matched) {
      let payload = {
        id: customer.id,
        email: customer.email,
        type: 'customer'
      }
      console.log(payload)
      let token = middleware.createToken(payload)
      return res.send({ customer: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'The provided credentials do not match a record in the system !'
    })
  }
}

const UpdatePasswordCustomer = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    let customer = await Customer.findById(req.params.customer_id)
    let matched = await middleware.comparePassword(
      customer.passwordDigest,
      oldPassword
    )

    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      customer = await Customer.findByIdAndUpdate(req.params.customer_id, {
        passwordDigest
      })
      let payload = {
        id: customer.id,
        email: customer.email,
        type: 'customer'
      }
      return res.send({ status: 'Password Updated!', company: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}
const RegisterCompany = async (req, res) => {
  try {
    const { email, password, name } = req.body
    console.log('req.body :', req.body)
    // res.send(req.body)

    let passwordDigest = await middleware.hashPassword(password)

    let exsitingCompany = await Company.findOne({ email })

    if (exsitingCompany) {
      return res
        .status(400)
        .send('A company with that email has already been registered!')
    } else {
      const company = await Company.create({ name, email, passwordDigest })
      res.send(company)
    }
  } catch (error) {
    throw error
  }
}

const LoginCompany = async (req, res) => {
  try {
    const { email, password } = req.body
    const company = await Company.findOne({ email })
    let matched = await middleware.comparePassword(
      company.passwordDigest,
      password
    )

    if (matched) {
      let payload = {
        id: company.id,
        email: company.email,
        type: 'company'
      }
      let token = middleware.createToken(payload)
      return res.send({ company: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'The provided credentials do not match a record in the system !'
    })
  }
}

const UpdatePasswordCompany = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    let company = await Company.findById(req.params.company_id)
    let matched = await middleware.comparePassword(
      company.passwordDigest,
      oldPassword
    )

    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      let company = await Company.findByIdAndUpdate(req.params.company_id, {
        passwordDigest
      })
      let payload = {
        id: company.id,
        email: company.email,
        type: 'company'
      }
      return res.send({ status: 'Password Updated!', company: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  RegisterCustomer,
  LoginCustomer,
  UpdatePasswordCustomer,
  RegisterCompany,
  LoginCompany,
  UpdatePasswordCompany,
  CheckSession
}
