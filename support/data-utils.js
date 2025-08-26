import fs from 'fs'
import path from 'path'

const DATA_BASE_PATH = path.join(__dirname, '..', 'data')

export function loadFile(baseFolder, filePath, extension) {
  const fullPath = path.join(DATA_BASE_PATH, baseFolder, `${filePath}${extension}`)

  try {
    const fileContent = fs.readFileSync(fullPath, 'utf-8')

    if (extension.endsWith('.json')) {
      return JSON.parse(fileContent)
    } else {
      return fileContent
    }
  } catch (error) {
    throw new Error(`Failed to load file at ${fullPath}. Make sure the path is correct and the file exists. Error: ${error.message}`)
  }
}

export function getSchema(schemaPath) {
  return loadFile('schemas', schemaPath, '.schema.json')
}

export function getFixture(fixturePath) {
  return loadFile('static-fixtures', fixturePath, '.json')
}
