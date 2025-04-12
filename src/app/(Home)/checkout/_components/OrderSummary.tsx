import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyCoupon } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import { CouponCodeData } from "@/lib/types";
import { getItemTotal } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
const TAXES_PERCENTAGE = 18;
const DELIVERY_CHARGES = 100;
const OrderSummary = ({
  handleCouponCodeChange,
}: {
  handleCouponCodeChange: (arg: string) => void;
}) => {
  const searchParams = useSearchParams();
  const couponCodeRef = React.useRef<HTMLInputElement>(null);
  const [discountPercentage, setDiscountPercentage] = React.useState(0);
  const [couponError, setCouponError] = React.useState("");
  const cart = useAppSelector((state) => state.cart.cartItems);
  const subTotal = useMemo(() => {
    const finalTotal = cart.reduce(
      (acc, curr) => getItemTotal(curr) * curr.qty + acc,
      0
    );
    return finalTotal;
  }, [cart]);
  const discountAmont = useMemo(() => {
    return (subTotal * discountPercentage) / 100;
  }, [subTotal, discountPercentage]);
  const taxesAmount = useMemo(() => {
    const amountAfterDiscount = subTotal - discountAmont;
    return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
  }, [subTotal, discountAmont]);
  const grandTotalWithoutDiscount = useMemo(() => {
    return subTotal + taxesAmount + DELIVERY_CHARGES;
  }, [subTotal, taxesAmount]);
  const grandTotal = useMemo(() => {
    return subTotal + taxesAmount + DELIVERY_CHARGES - discountAmont;
  }, [subTotal, discountAmont, taxesAmount]);

  const { mutate, isError } = useMutation({
    mutationKey: ["validateCoupon"],
    mutationFn: async () => {
      if (!couponCodeRef.current.value) {
        return;
      }
      if (!searchParams.get("tenant")) {
        return;
      }
      const data: CouponCodeData = {
        code: couponCodeRef.current.value,
        tenantId: searchParams.get("tenant"),
      };
      return await verifyCoupon(data).then((response) => response.data);
    },
    onSuccess: (data: { success: boolean; discount: number }) => {
      if (data.success) {
        setCouponError("");
        handleCouponCodeChange(couponCodeRef.current.value || "");
        return setDiscountPercentage(data.discount);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setDiscountPercentage(0);
        setCouponError(error.response?.data.errors[0].msg);
      }
    },
  });
  function handleCouponValidation(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    mutate();
  }
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
          <span className="font-bold">₹{discountAmont}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="flex flex-col justify-center items-start font-bold">
            <span
              className={`${
                discountPercentage ? "line-through text-gray-400" : ""
              }`}
            >
              ₹{grandTotalWithoutDiscount}
            </span>
            {discountPercentage && (
              <span className="text-green-600"> ₹{grandTotal}</span>
            )}
          </span>
        </div>
        {isError && <p className=" text-sm text-red-600">{couponError}</p>}
        <div className="flex items-center gap-4">
          <Input
            id="coupon"
            type="text"
            name="code"
            className="w-full"
            placeholder="Coupon code"
            ref={couponCodeRef}
          />
          <Button
            type="button"
            onClick={handleCouponValidation}
            variant={"outline"}
          >
            Apply
          </Button>
        </div>

        <div className="text-right mt-6">
          <Button>Place order</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
