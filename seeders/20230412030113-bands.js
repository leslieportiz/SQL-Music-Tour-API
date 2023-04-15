'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('band', [
      {
        name: 'Taylor Swift',
        genre: 'Pop',
        available_start_time: '2023-04-13 8:00:00-07',
        end_time: '2023-04-13 12:00:00-07'
      },
      {
        name: 'SZA',
        genre: 'Pop',
        available_start_time: '2023-04-13 8:00:00-07',
        end_time: '2023-04-13 12:00:00-07'
      },
      {
        name: 'Metalica',
        genre: 'Rock',
        available_start_time: '2023-04-13 8:00:00-07',
        end_time: '2023-04-13 12:00:00-07'
      }
      
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // note that this deletes ALL data from the bands table
    await queryInterface.bulkDelete('band', null, {})
  }
}