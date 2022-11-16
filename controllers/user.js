import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import userModal from '../models/user.js'

const secret = 'test'

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const oldUser = await userModal.findOne({ email })
    if (!oldUser) {
      return res.status(404).json({ message: 'User does not exist' })
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Inavlid email or Password' })
    }
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '1h',
    })

    res.status(201).json({ result: oldUser, token })
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
    console.log(error)
  }
}
//signup
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    const oldUser = await userModal.findOne({ email })

    if (oldUser) {
      res.status(400).json({ message: 'user already exixted' })
    }
    const hashpassword = await bcrypt.hash(password, 12)
    const result = await userModal.create({
      email,
      password: hashpassword,
      name: `${firstName} ${lastName}`,
    })
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    })
    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
    console.log(error)
  }
}
