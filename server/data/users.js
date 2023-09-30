import bcrypt from 'bcryptjs'
const users = [{
    name:'admin User',
    email : 'admin@gmail.com',
    password : bcrypt.hashSync('123456',10),
    isAdmin : true
},
{
    name:'vamsi',
    email : 'vamsi@gmail.com',
    password : bcrypt.hashSync('123456',10),    isAdmin : false
},
{
    name:'venky',
    email : 'venky@gmail.com',
    password : bcrypt.hashSync('123456',10),    isAdmin : false
}]

export default users