import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
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
          <Tabs defaultValue="pizza" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account" className=" text-md">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="password" className=" text-md">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">Pizza List</TabsContent>
            <TabsContent value="beverages">BEvrages list</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
