import { body } from "express-validator";
import { getAllKomoditasService } from "../services/komoditas.service";
import { getAllProduksiService } from "../services/produksi.service";

export const penjualanValidator = [
    // body("keterangan").notEmpty().withMessage("Keterangan harus diisi."),

    body("id_komodity").notEmpty().withMessage("ID Komoditas harus diisi.").isInt().withMessage("ID Komoditas harus berupa angka.")
        // .bail()
        .custom(async (id_komodity) => {
            const availableKomodity = (await getAllKomoditasService()).map((komoditas) => komoditas.id)

            if (!availableKomodity.includes(id_komodity)) throw new Error("Masukkan id komoditas yang valid.");
            return true
        }),

    body("id_produksi").notEmpty().withMessage("ID Produksi harus diisi.").isInt().withMessage("ID Produksi harus berupa angka.")
        .custom(async (id_produksi) => {
            const availableProduksi = (await getAllProduksiService()).map(produksi => produksi.id)

            if (!availableProduksi.includes(id_produksi)) throw new Error("Masukkan id produksi yang valid.");
            return true
        })
]