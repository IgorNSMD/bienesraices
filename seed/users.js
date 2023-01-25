import bcrypt from 'bcrypt'

const users= [
    {
        name:'Igor',
        email:'igor@gmail.com',
        confirmed:1,
        password: bcrypt.hashSync('123456',10)
    }
]

export default users