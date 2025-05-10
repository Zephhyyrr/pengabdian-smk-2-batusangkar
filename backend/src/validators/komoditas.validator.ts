import { body } from "express-validator";
import { getAllJenisService } from "../services/jenis.service";

export const createKomoditasValidator = [
    body("foto").custom((_, { req }) => {
        if (!req.file) throw new Error("Gambar wajib diunggah");
        const allowedMimeType = ["image/jpeg", "image/png", "image/jpg"]
        if (!allowedMimeType.includes(req.file.mimetype)) throw new Error("Format file tidak didukung")
        return true
    }),
    body("id_jenis").notEmpty().withMessage("Pilih salah satu jenis").bail()
        .custom(async (id_jenis) => {
            const jenis = await getAllJenisService()
            const jenisIds = jenis.map((jenis) => jenis.id)

            if (!jenisIds.includes(Number(id_jenis))) throw new Error("Jenis tidak tersedia");

            return true
        }),
    body("nama").notEmpty().withMessage("Nama harus diisi."),
    body("deskripsi").notEmpty().withMessage("Deskripsi harus diisi").bail()
        .isLength({ min: 5 }).withMessage("Deskripsi minimal 5 karakter"),
    body("satuan").notEmpty().withMessage("Satuan harus diisi"),
    body("jumlah").notEmpty().withMessage("Jumlah harus diisi").bail()
        .isInt({ min: 0 }).withMessage("Jumlah harus numerik dan minimal 0")
]

export const updateKomoditasValidator = [
    body("foto").optional()
        .custom((_, { req }) => {
            if (!req.file) throw new Error("Gambar wajib diunggah");
            const allowedMimeType = ["image/jpeg", "image/png", "image/jpg"]
            if (!allowedMimeType.includes(req.file.mimetype)) throw new Error("Format file tidak didukung")
            return true
        }),
    body("id_jenis").optional().bail()
        .custom(async (id_jenis) => {
            const jenis = await getAllJenisService()
            const jenisIds = jenis.map((jenis) => jenis.id)

            if (!jenisIds.includes(Number(id_jenis))) throw new Error("Jenis tidak tersedia");

            return true
        }),
    body("nama").optional().bail()
        .notEmpty().withMessage("Nama harus diisi."),
    body("deskripsi").optional().bail()
        .isLength({ min: 5 }).withMessage("Deskripsi minimal 5 karakter"),
    body("satuan").optional().bail()
        .notEmpty().withMessage("Satuan harus diisi"),
    body("jumlah").optional().bail()
        .isInt({ min: 0 }).withMessage("Jumlah harus numerik dan minimal 0")
]