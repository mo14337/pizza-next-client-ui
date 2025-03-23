import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";
import React, { useMemo } from "react";
const TAXES_PERCENTAGE = 18;
const DELIVERY_CHARGES = 100;
const OrderSummary = () => {
  const [discountPercentage, setDiscountPercentage] = React.useState(0);
  const cart = useAppSelector((state) => state.cart.cartItems);
  const subTotal = useMemo(() => {
    const finalTotal = cart.reduce(
      (acc, curr) => getItemTotal(curr) * curr.qty + acc,
      0
    );
    return finalTotal;
  }, [cart]);
  const discontAmont = useMemo(() => {
    return (subTotal * discountPercentage) / 100;
  }, [subTotal, discountPercentage]);
  const taxesAmount = useMemo(() => {
    const amountAfterDiscount = subTotal - discontAmont;
    return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
  }, [subTotal, discontAmont]);
  const grandTotal = useMemo(() => {
    return subTotal + taxesAmount + DELIVERY_CHARGES - discontAmont;
  }, [subTotal, discontAmont, taxesAmount]);
  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-bold">₹{subTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span className="font-bold">₹{taxesAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery charges</span>
          <span className="font-bold">₹{DELIVERY_CHARGES}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">₹{discontAmont}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold">₹{grandTotal}</span>
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
  );
};

export default OrderSummary;
