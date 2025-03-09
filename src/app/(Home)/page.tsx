import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard from "./_components/ProductCard";
import { ICategory, IProduct } from "@/lib/types";

export default async function Home() {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/catalog-service/category`
  );
  const categoryData = await categoryResponse.json();

  const productResponse = await fetch(
    `${process.env.BACKEND_URL}/catalog-service/product?perPage=100&tenantId=2`
  );
  const products = await productResponse.json();
  console.log(products);
  return (
    <>
      <section className=" bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className=" text-7xl font-black font-sans ">
              Super delicious pizza in <br />
              <span className=" text-primary">Only 45 minutes!</span>
            </h1>
            <p className=" text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a free meal it takes more than 45mins.
            </p>
            <Button className=" mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your Pizza now
            </Button>
          </div>
          <div className=" ">
            <Image
              src={"/pizza-main.png"}
              alt="main-image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
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
                        (product: IProduct) =>
                          product.categoryId === category._id
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
    </>
  );
}
