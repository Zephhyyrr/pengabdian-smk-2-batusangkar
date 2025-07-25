import multer from 'multer';
import path from 'path';

// Menggunakan memoryStorage untuk menyimpan file di memory (buffer)
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = [
            'image/jpeg', 'image/png', 'image/jpg',
            'image/JPEG', 'image/PNG', 'image/JPG',
            'image/pjpeg', 'image/x-png', 'image/webp',
            'image/avif', 'image/heic',
            'image/gif', 'image/bmp', 'image/tiff',
            'image/svg+xml', 'image/vnd.microsoft.icon',
            'image/webp', 'image/WEBP'
        ];
        const extAllowed = [
            '.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG',
            '.webp', '.WEBP', 
            '.avif', '.AVIF', '.heic', '.HEIC',
            '.gif', '.GIF', '.bmp', '.BMP', '.tiff', '.TIFF',
            '.svg', '.SVG', '.ico', '.ICO'
        ];
        const ext = path.extname(file.originalname);
        if (allowed.includes(file.mimetype) && extAllowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('File harus berupa gambar (jpg/jpeg/png/webp)'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

export default upload;