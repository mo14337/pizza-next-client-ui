import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
}

export default function CartSummary({
  totalPrice,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-xl font-bold">₹{totalPrice}</p>
      <Button
        className="bg-orange-500 hover:bg-orange-600"
        onClick={onCheckout}
      >
        Checkout →
      </Button>
    </div>
  );
}
