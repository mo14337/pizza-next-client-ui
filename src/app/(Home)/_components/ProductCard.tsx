import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ToppingList from "./ToppingList";

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
          From <span className=" font-bold">₹{product.price}</span>
        </p>
        <Dialog>
          <DialogTrigger className=" bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
            Choose
          </DialogTrigger>
          <DialogContent className=" bg-[#F6F0EE] max-w-3xl p-0">
            <div className=" flex ">
              <div className=" w-1/3 bg-white rounded-md p-8 flex items-center justify-center">
                <Image
                  alt={product.name}
                  width={150}
                  height={150}
                  src={product.image}
                />
              </div>
              <div className=" w-2/3 p-8">
                <h3 className=" text-xl font-bold ">{product.name}</h3>
                <p className=" mt-1">{product.description}</p>
                <div className=" mt-6">
                  <h4>Choose the size</h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid mt-2 grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="small"
                        id="small"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="small"
                        className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-white hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Small
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="medium"
                        id="medium"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="medium"
                        className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-white hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Medium
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="large"
                        id="large"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="large"
                        className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-white hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className=" mt-6">
                  <h4>Choose the crust</h4>
                  <RadioGroup
                    defaultValue="thin"
                    className="grid mt-2 grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="thin"
                        id="thin"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="thin"
                        className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-white hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Thin
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="thick"
                        id="thick"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="thick"
                        className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-white hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Thick
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <ToppingList />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
