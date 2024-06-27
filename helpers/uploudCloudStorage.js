require('dotenv').config()
const storage = require('../config/cloudConfigStorage')
/**
 * @description Retorna a URL da imagem depois de enviar para o servidor do cloud storage a imagem.
 * @param {*} file
 * @returns imageURL
 */
const uploudCloudStorage = async (file) => {
  const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME
  const bucket = storage.bucket(bucketName)
  const filename = `image/users/${Date.now()}_${file.originalname}`
  const fileUpload = bucket.file(filename)

  await fileUpload
    .save(file.buffer, {
      destination: filename,
      metadata: {
        contentType: file.mimetype,
      },
    })
    .then()
    .catch((err) => console.error(err))

  const imageURL = `https://storage.googleapis.com/${bucketName}/${filename}`
  return imageURL
}

module.exports = uploudCloudStorage
