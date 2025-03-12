import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductList from "./_components/ProductList";
import { Suspense } from "react";
import ProductCardsSkeleton from "./_components/ProductCardsSkeleton";

export default async function Home() {
  return (
    <>
      <section className=" bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className=" text-7xl font-black font-sans ">
              Super Delicious Pizza in <br />
              <span className=" text-primary">Only 45 Minutes!</span>
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
      <Suspense fallback={<ProductCardsSkeleton />}>
        <ProductList />
      </Suspense>
    </>
  );
}
