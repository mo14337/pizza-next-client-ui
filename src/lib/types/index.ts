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
}

interface priceConfiguration {
  priceType: string;
  availableOptions: Map<string, number>;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  priceConfiguration: Map<string, priceConfiguration>;
  attributes: {
    name: string;
    value: string | number;
  }[];
  tenantId: string;
  categoryId: string;
  isPublish: boolean;
}
