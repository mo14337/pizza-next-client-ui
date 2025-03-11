import { IProduct } from "@/lib/types";

export const getDefaultConfig = (product: IProduct) => {
  const defaultConfiguration = Object.entries(
    product.category.priceConfiguration
  )
    .map(([key, value]) => {
      return {
        [key]: value.availableOptions[0],
      };
    })
    .reduce((acc, cur) => {
      return {
        ...acc,
        ...cur,
      };
    }, {});
  return defaultConfiguration;
};
