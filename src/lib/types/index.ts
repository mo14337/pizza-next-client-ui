import { CartItem } from "../store/features/cart/cartSlice";

export type Tenant = {
  address: string;
  name: string;
  id: number;
};

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface ICategory {
  _id?: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
  hasToppings: boolean;
}

interface priceConfiguration {
  priceType: string;
  availableOptions: Record<string, number>;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  priceConfiguration: Record<string, priceConfiguration>;
  attributes: {
    name: string;
    value: string | number;
  }[];
  tenantId: string;
  categoryId: string;
  isPublish: boolean;
  category: ICategory;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "customer" | "manager";
  tenant: number | null;
}

export interface IAddress {
  text: string;
  isDefault: boolean;
}
export interface ICustomer {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: IAddress[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type CouponCodeData = {
  code: string;
  tenantId: string;
};

export interface OrderType {
  cart: CartItem[];
  address: string;
  paymentMode: string;
  comment: string;
  customerId: string;
  couponCode: string;
  tenantId: string;
}
