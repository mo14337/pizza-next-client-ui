import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "@/lib/http/api";
import { AxiosError } from "axios";

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

const AddAddress = ({ customerID }: { customerID: string }) => {
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const queryClient = useQueryClient();
  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addAddress"],
    mutationFn: async (address: string) => {
      return await addAddress(address, customerID).then((res) => res.data);
    },
    onSuccess: () => {
      addressForm.reset();
      setShowAddAddressModal(false);
      return queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
    onError: (error) => {
      // Handle API error and show message
      if (error instanceof AxiosError) {
        addressForm.setError("address", {
          type: "server",
          message: error?.response?.data?.message || "Failed to add address",
        });
      }
    },
  });

  function handleAddAddress(data: z.infer<typeof formSchema>) {
    mutate(data.address);
  }

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="name">Address</Label>
      <Dialog open={showAddAddressModal} onOpenChange={setShowAddAddressModal}>
        <DialogTrigger onClick={() => setShowAddAddressModal(true)} asChild>
          <Button size={"sm"} variant={"link"}>
            <Plus size={"16"} />
            <span className="ml-2">Add New Address</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <Form {...addressForm}>
            <form onSubmit={addressForm.handleSubmit(handleAddAddress)}>
              <DialogHeader>
                <DialogTitle>Add Address</DialogTitle>
                <DialogDescription>
                  We can save your address for the next order.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <FormField
                    name="address"
                    control={addressForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea className="mt-2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex gap-2"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle className="animate-spin" />
                      <span>Please wait</span>
                    </span>
                  ) : (
                    <span>Save Address</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAddress;
