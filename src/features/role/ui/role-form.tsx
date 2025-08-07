import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRoleCreate } from "../model/use-role-create";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { useState } from "react";

const roleSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
});

export const RoleForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
    },
  });

  const { createRole, isPending } = useRoleCreate();
  
  const onSubmit = form.handleSubmit(async (data) => {
    const success = await createRole(data); 
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
          <DialogTitle>Добавьте роль</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='mt-1 mb-5'>
                  <FormLabel>Название роли</FormLabel>
                  <FormControl>
                    <Input autoComplete={"off"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter >
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
