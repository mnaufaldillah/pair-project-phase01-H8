'use strict';
const fs = require(`fs`).promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = await fs.readFile(`./data/course.json`, `utf8`);
    data = JSON.parse(data);
    data = data.map((item) => {
     delete item.id;
     item.createdAt = new Date();
     item.updatedAt = new Date();
     return item;
    });
 
    await queryInterface.bulkInsert(`Courses`, data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert(`Courses`, null, {});
  }
};
