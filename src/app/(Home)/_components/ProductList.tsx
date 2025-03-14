import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory, IProduct } from "@/lib/types";
import ProductCard from "./ProductCard";

const ProductList = async ({ tenantId }: { tenantId: string }) => {
  const categoryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalog-service/category`,
    {
      next: {
        revalidate: 10, //1hr
      },
    }
  );
  const categoryData = await categoryResponse.json();
  const productResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalog-service/product?perPage=100&tenantId=${tenantId}`,
    {
      next: {
        revalidate: 10, //1hr
      },
    }
  );
  const products = await productResponse.json();
  return (
    <section>
      <div className=" container mx-auto py-12">
        <Tabs defaultValue={categoryData.data[0]._id} className="">
          <TabsList>
            {categoryData?.data?.map((category: ICategory) => {
              return (
                <TabsTrigger
                  key={category._id}
                  value={category._id!}
                  className=" text-md"
                >
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {categoryData.data.map((category: ICategory) => {
            return (
              <TabsContent key={category._id} value={category._id!}>
                <div className=" grid grid-cols-4 gap-6 mt-6">
                  {products.data
                    .filter(
                      (product: IProduct) => product.categoryId === category._id
                    )
                    .map((product: IProduct) => {
                      return (
                        <>
                          <ProductCard key={product._id} product={product} />
                        </>
                      );
                    })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;
