import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

import { IProduct } from "@/lib/types";
import ProductModal from "./ProductModal";
import { getFromPrice } from "@/lib/utils";

type PropsTypes = {
  product: IProduct;
};
const ProductCard = ({ product }: PropsTypes) => {
  return (
    <Card className=" border-none rounded-xl">
      <CardHeader className=" flex items-center justify-center">
        <Image
          alt={product.name}
          width={150}
          height={150}
          src={product.image}
        />
      </CardHeader>
      <CardContent>
        <h2 className=" text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className=" flex items-center justify-between">
        <p>
          From <span className=" font-bold">₹{getFromPrice(product)}</span>
        </p>
        <ProductModal product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
