import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./_components/ProductCard";
import { ICategory } from "@/lib/types";
const products: Product[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description:
      "Classic pizza topped with fresh tomatoes, mozzarella, and basil.",
    image: "/pizza-main.png",
    price: 10.99,
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description:
      "Loaded with spicy pepperoni slices and a blend of mozzarella cheese.",
    image: "/pizza-main.png",
    price: 12.99,
  },
  {
    id: "3",
    name: "Veggie Supreme Pizza",
    description:
      "Topped with bell peppers, onions, mushrooms, olives, and sweet corn.",
    image: "/pizza-main.png",
    price: 11.99,
  },
  {
    id: "4",
    name: "BBQ Chicken Pizza",
    description:
      "Smoky BBQ sauce with grilled chicken, onions, and mozzarella.",
    image: "/pizza-main.png",
    price: 13.99,
  },
  {
    id: "5",
    name: "Four Cheese Pizza",
    description:
      "A heavenly blend of mozzarella, cheddar, parmesan, and blue cheese.",
    image: "/pizza-main.png",
    price: 14.99,
  },
];

export default async function Home() {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/catalog-service/category`
  );
  const categoryData = await categoryResponse.json();
  console.log(categoryData);
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
          <Tabs defaultValue="pizza" className="">
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
            <TabsContent value="Pizza">
              <div className=" grid grid-cols-4 gap-6 mt-6">
                {products.map((product: Product) => {
                  return (
                    <>
                      <ProductCard key={product.id} product={product} />
                    </>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="Breverages">
              <div className=" grid grid-cols-4 gap-6 mt-6">
                {products.slice(0, 4).map((product: Product) => {
                  return (
                    <>
                      <ProductCard key={product.id} product={product} />
                    </>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
