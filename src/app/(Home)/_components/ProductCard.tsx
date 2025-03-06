import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};
type PropsTypes = {
  product: Product;
};
const ProductCard = ({ product }: PropsTypes) => {
  return (
    <Card className=" border-none rounded-xl">
      <CardHeader className=" flex items-center justify-center">
        <Image alt="pizza-image" width={150} height={150} src={product.image} />
      </CardHeader>
      <CardContent>
        <h2 className=" text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className=" flex items-center justify-between">
        <p>
          From <span className=" font-bold">₹{product.price}</span>
        </p>
        <Button className=" bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
