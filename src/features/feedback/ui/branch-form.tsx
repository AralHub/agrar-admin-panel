import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useFeedbackCreate } from "../model/use-feedback-create";
import { Button } from "@/shared/ui/kit/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Plus } from "lucide-react";

const branchSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
});

export const BranchForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: "",
    },
  });
  const { createBranch, isPending } = useFeedbackCreate();

  const onSubmit = form.handleSubmit(async (data) => {
    const success = await createBranch(data);
    if (success) {
      setOpen(false);
      form.reset();
    }
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          {" "}
          <Plus /> Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавьте филиал</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Название филиала</FormLabel>
                  <FormControl>
                    <Input autoComplete={"off"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    form.reset();
                  }}
                  variant="outline"
                >
                  Отмена
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                Добавить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
