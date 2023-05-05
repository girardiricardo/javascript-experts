const { error } = require('./src/constants')
const File = require('./src/file')
const assert = require('assert')

;(async () => {
  // Test list:
  // The file should have id,name,profession andd age fields
  // The file should not be empty
  // The file should not be longer than 4 lines including headers

  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)

    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/invalid-header.csv'
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)

    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/fiveItems-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)

    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/threeItems-valid.csv'
    const expected = [
      {
        id: 1,
        name: 'Ricardo',
        profession: 'developer',
        age: 120
      },
      {
        id: 2,
        name: 'José',
        profession: 'arquiteto',
        age: 30
      },
      {
        id: 3,
        name: 'Lucas',
        profession: 'engenheiro',
        age: 50
      }
    ]
    const result = await File.csvToJSON(filePath)

    await assert.deepEqual(result, expected)
  }
})()