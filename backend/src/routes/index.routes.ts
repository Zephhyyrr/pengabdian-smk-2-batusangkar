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
apiRouter.use("/users", jwtCheckToken, isRole(["super_admin"]), userRoute)
apiRouter.use("/auth", authRouter)
apiRouter.use("/jenis", jwtCheckToken, isRole(["super_admin", "admin"]), jenisRouter)
apiRouter.use("/komoditas", jwtCheckToken, isRole(["super_admin", "admin"]), komoditasRouter)
apiRouter.use("/barang", jwtCheckToken, isRole(["super_admin", "admin"]), barangRouter)
apiRouter.use("/transaksi-barang", jwtCheckToken, isRole(["super_admin", "admin"]), transaksiBarangRouter)
apiRouter.use("/produksi", jwtCheckToken, isRole(["super_admin", "admin"]), produksiRouter);
apiRouter.use("/penjualan", jwtCheckToken, isRole(["super_admin", "admin"]), penjualanRouter);
apiRouter.use("/asal-produksi", jwtCheckToken, isRole(["super_admin", "admin"]), asalProduksiRouter);
export default apiRouter