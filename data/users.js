import bcrypt from 'bcryptjs'


const users = [
   {
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
   },
   {
      name: 'Kayode Ogunnowo',
      email: 'otkayode@example.com',
      password: bcrypt.hashSync('123456', 10),
   },
   {
      name: 'Olukayode Doe',
      email: 'olukayodedoe@example.com',
      password: bcrypt.hashSync('123456', 10),
   },
]
// const thi = {
//    "color": "red",
//    "1": [32, 332, 3323, "sdsd"],
//    "prore": "jshajs"
// }
// console.log(typeof (thi))

// typeof (thi)



export default users