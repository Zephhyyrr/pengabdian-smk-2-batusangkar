import { Barang, TransaksiBarang, Komoditas } from '@/types'

export const getBarang = async (): Promise<Barang[]> => {
  const res = await fetch('/dummy_api/barang.json')
  return res.json()
}

export const getTransaksiBarang = async (): Promise<TransaksiBarang[]> => {
  const res = await fetch('/dummy_api/transaksi_barang.json')
  return res.json()
}

export const getKomoditas = async (): Promise<Komoditas[]> => {
  const res = await fetch('/dummy_api/komoditas.json')
  return res.json()
}
