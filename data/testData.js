import * as dotenv from 'dotenv';
//require('dotenv').config();
dotenv.config();

// data/testData.js

export const users = {
  valid: {
    username: process.env.RSC_EMAIL,
    password: process.env.RSC_PASSWORD,
  },
  invalid: {
    username: process.env.RSC_WRONGEMAIL,
    password: process.env.RSC_WRONGPASSWORD,
  },
};

export const products = {
  firstTwo: ['Backpack', 'Bike Light'],
  extraOne: 'Bolt T-Shirt',
};
/*
export const customer = {
  firstName: 'Hindu',
  lastName: 'Lingampally',
  zip: '500090',
};
*/
