import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadDrive = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } })