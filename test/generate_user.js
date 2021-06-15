const faker = require('faker')
const { writeFileSync } = require('fs')

const out = []
for (let i = 0; i < 10; i++) {
  out.push({
    id: faker.datatype.uuid(),
    login: faker.internet.userName(),
    avatar_url: faker.image.avatar()
  })
}

console.log(out)
writeFileSync('test/users.json', JSON.stirngify(out, null, 2))
