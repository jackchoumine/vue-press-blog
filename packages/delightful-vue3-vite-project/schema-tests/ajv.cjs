const Ajv = require('ajv')

const schema = {
  // type: 'string',
  // minLength: 10,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 10,
    },
    age: {
      type: 'number',
      maximum: 120,
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

const ajv = new Ajv()

const validate = ajv.compile(schema)

const valid = validate({
  name: 'jack Chou Hello',
  // age: 29,
  pets: ['dog', 'cat'],
  isWorker: false,
})

if (!valid) {
  console.log(validate.errors)
}
