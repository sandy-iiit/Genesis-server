const bcrypt = require('bcryptjs');

const pass='James123'

bcrypt.hash(pass,12).then(hashed=>{
    console.log(hashed)
})

$2a$12$ULurrIZxeTm3PRSOcJPmeuVmpLydWaP3KV/aSd7cGnSCRMwbAKMJi