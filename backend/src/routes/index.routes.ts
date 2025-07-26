import { Router } from "express";
import { TestController } from "../controllers/test.controller";
import userRoute from "./user.routes";
import { jwtCheckToken } from "../middlewares/jwt_check_token";
import { isRole } from "../middlewares/is_role";
import authRouter from "./auth.routes";
import barangRouter from "./barang.routes";
import transaksiBarangRouter from "./transaksi_barang.routes";
import jenisRouter from "./jenis.routes";
import komoditasRouter from "./komoditas.routes";
import produksiRouter from "./produksi.routes";
import asalProduksiRouter from "./asal_produksi.routes";
import penjualanRouter from "./penjualan.routes";

const apiRouter = Router()

apiRouter.use("/test", TestController)
apiRouter.use("/users", jwtCheckToken, isRole(["admin"]), userRoute)
apiRouter.use("/auth", authRouter)
apiRouter.use("/jenis", jwtCheckToken, isRole(["admin", "guru"]), jenisRouter)
apiRouter.use("/komoditas", komoditasRouter)
apiRouter.use("/barang", jwtCheckToken, isRole(["admin", "guru"]), barangRouter)
apiRouter.use("/transaksi-barang", jwtCheckToken, isRole(["admin", "guru"]), transaksiBarangRouter)
apiRouter.use("/produksi", jwtCheckToken, isRole(["admin", "guru", "siswa"]), produksiRouter);
apiRouter.use("/penjualan", jwtCheckToken, isRole(["admin", "guru", "siswa"]), penjualanRouter);
apiRouter.use("/asal-produksi", jwtCheckToken, isRole(["admin", "guru"]), asalProduksiRouter);
export default apiRouter