import axios from "axios";
import { CouponCodeData } from "../types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const BillingServicePrefix = "/billing";
//customer
export const getCustomer = () => api.get(`${BillingServicePrefix}/customer`);
export const addAddress = (address: string, id: string) =>
  api.patch(`${BillingServicePrefix}customer/addresses/${id}`, {
    address,
  });

export const verifyCoupon = (data: CouponCodeData) =>
  api.post(`${BillingServicePrefix}/coupon/verify`, data);
