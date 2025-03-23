"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getCustomer } from "@/lib/http/api";
import { ICustomer } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Coins, CreditCard } from "lucide-react";
import AddAddress from "./AddAddress";

const CustomerForm = () => {
  const { data: customer } = useQuery<ICustomer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
  });
  //todo: handle error and loading
  return (
    <div className="flex container mx-auto gap-6 mt-16">
      <Card className="w-3/5 border-none">
        <CardHeader>
          <CardTitle>Customer details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                type="text"
                className="w-full"
                disabled
                defaultValue={customer?.firstName}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                className="w-full"
                disabled
                defaultValue={customer?.lastName}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                className="w-full"
                disabled
                defaultValue={customer?.email}
              />
            </div>
            <div className="grid gap-3">
              <div>
                <AddAddress customerID={customer?._id} />
                <RadioGroup
                  defaultValue="option-one"
                  className="grid grid-cols-2 gap-6 mt-2"
                >
                  {customer?.addresses.map((address: { text: string }) => (
                    <Card className="p-6" key={address.text}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={address.text}
                          id={address.text}
                        />
                        <Label
                          htmlFor={address.text}
                          className="leading-normal"
                        >
                          {address.text}
                        </Label>
                      </div>
                    </Card>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Payment Mode</Label>
              <RadioGroup className="flex gap-6">
                <div className="w-36">
                  <RadioGroupItem
                    value={"card"}
                    id={"card"}
                    className="peer sr-only"
                    aria-label={"card"}
                  />
                  <Label
                    htmlFor={"card"}
                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard size={"20"} />
                    <span className="ml-2">Card</span>
                  </Label>
                </div>
                <div className="w-36">
                  <RadioGroupItem
                    value={"cash"}
                    id={"cash"}
                    className="peer sr-only"
                    aria-label={"cash"}
                  />
                  <Label
                    htmlFor={"cash"}
                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Coins size={"20"} />
                    <span className="ml-2 text-md">Cash</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="fname">Comment</Label>
              <Textarea />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-2/5 border-none h-auto self-start">
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-bold">₹8130</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span className="font-bold">₹82</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery charges</span>
            <span className="font-bold">₹100</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span className="font-bold">₹0</span>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <span className="font-bold">Order total</span>
            <span className="font-bold">₹8300</span>
          </div>
          <div className="flex items-center gap-4">
            <Input
              id="fname"
              type="text"
              className="w-full"
              placeholder="Coupon code"
            />
            <Button variant={"outline"}>Apply</Button>
          </div>

          <div className="text-right mt-6">
            <Button>Place order</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
