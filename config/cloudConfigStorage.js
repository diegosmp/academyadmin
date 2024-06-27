require('dotenv').config()
const { Storage } = require('@google-cloud/storage')
const path = require('path')

const { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_CLOUD_PROJECT_ID } = process.env

const keyFilename = path.join(__dirname, GOOGLE_APPLICATION_CREDENTIALS)
const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: keyFilename,
})

module.exports = storage
