"use client";
import React, { Suspense, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ToppingList from "./ToppingList";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/lib/types";
import Image from "next/image";

type choosenConfig = {
  [key: string]: string;
};
const ProductModal = ({ product }: { product: IProduct }) => {
  const [choosenConfig, setChoosenConfig] = useState<choosenConfig>();
  const handleRadioChange = (key: string, data: string) => {
    setChoosenConfig((prev) => {
      return {
        ...prev,
        [key]: data,
      };
    });
  };
  console.log(choosenConfig);
  return (
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
            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => {
                return (
                  <div key={key} className=" mt-6">
                    <h4>Choose the {key}</h4>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      className="grid mt-2 grid-cols-3 gap-4"
                      onValueChange={(data) => handleRadioChange(key, data)}
                    >
                      {value.availableOptions.map((option: string) => {
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={option}
                              className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-white hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                );
              }
            )}
            <Suspense fallback={"Loading..."}>
              <ToppingList />
            </Suspense>
            <div className=" flex items-center justify-between mt-8">
              <span className=" font-bold">&#8377;400</span>
              <Button>
                <ShoppingCart />
                <span className=" ">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
