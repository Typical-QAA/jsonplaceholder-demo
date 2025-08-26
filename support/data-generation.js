import { faker } from '@faker-js/faker'

export class TestDataGenerator {
  getUser() {
    return {
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      address: {
        street: faker.location.street(),
        suite: faker.location.secondaryAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        geo: { lat: `${faker.location.latitude()}`, lng: `${faker.location.longitude()}` }
      },
      phone: faker.phone.number(),
      website: faker.internet.domainName(),
      company: { name: faker.company.name(), catchPhrase: faker.company.catchPhrase(), bs: faker.company.buzzPhrase() }
    }
  }

  getPost() {
    return { userId: faker.number.int({ min: 1, max: 10 }), title: faker.lorem.sentence(), body: faker.lorem.paragraph() }
  }
}
