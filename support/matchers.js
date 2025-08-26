import { expect as expectBase } from '@playwright/test'
import Ajv from 'ajv'

const ajv = new Ajv()

export const expect = expectBase.extend({
  toBeValidSchema(received, schema) {
    const valid = ajv.validate(schema, received)
    if (valid) {
      return { message: () => 'Schema validation succeeded', pass: true }
    } else {
      return { message: () => `Schema validation failed:\n${ajv.errorsText()}`, pass: false }
    }
  }
})
