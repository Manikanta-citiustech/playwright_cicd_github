import { fakerEN_IN } from '@faker-js/faker';

export const fakeUser = {
  firstName: fakerEN_IN.person.firstName(),
  lastName: fakerEN_IN.person.lastName(),
  zipCode: fakerEN_IN.location.zipCode(),
};