import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Plus } from "lucide-react";
import { usePersonCreate } from "../model/use-person-create";
import { useParams } from "react-router-dom";
import { PathParams, ROUTES } from "@/shared/model/routes";

const personSchema = z.object({
  first_name: z.string().min(1, "Имя обязательно"),
  last_name: z.string().min(1, "Фамилия обязательна"),
  image: z.any().optional(),
  department_id: z.number().min(1, "Выберите отдел"),
});

export const PersonCreateForm = () => {
  const [open, setOpen] = useState(false);
  const { departmentId } = useParams<PathParams[typeof ROUTES.PERSONS]>();
  const form = useForm({
    resolver: zodResolver(personSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      department_id: Number(departmentId),
      image: undefined,
    },
  });

  const { createPerson, isPending } = usePersonCreate();

  const onSubmit = form.handleSubmit(async (data) => {
    const success = await createPerson(data);
    if (success) {
      setOpen(false);
      form.reset();
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {" "}
          <Plus /> Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавьте персонал</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input autoComplete={"off"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input autoComplete={"off"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Фотография</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                    />
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
