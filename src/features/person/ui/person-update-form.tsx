import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { usePersonUpdate } from "../model/use-person-update";
import { FC, useEffect, useState } from "react";
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
import { UserPen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { useDepartmentList } from "@/features/department";
import { ApiSchemas } from "@/shared/api/schema";

const personSchema = z.object({
  first_name: z.string().min(1, "Имя обязательно"),
  last_name: z.string().min(1, "Фамилия обязательна"),
  department_id: z.number().min(1, "Выберите отдел"),
  person_id: z.number().min(1, "Пользователь неизвестно"),
});

type PersonUpdateForm = {
  personInfo?: ApiSchemas["PersonFullRead"];
};

export const PersonUpdateForm: FC<PersonUpdateForm> = ({ personInfo }) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(personSchema),
    defaultValues: {
      person_id: 0,
      department_id: 0,
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    if (personInfo) {
      form.reset({
        person_id: personInfo.id,
        department_id: personInfo.department?.id,
        first_name: personInfo.first_name,
        last_name: personInfo.last_name,
      });
    }
  }, [personInfo, form]);

  const { isPending, personUpdate } = usePersonUpdate();
  const { departments } = useDepartmentList({
    page: 1,
    page_size: 999,
    role_id: personInfo?.role?.id,
  });
  const onSubmit = form.handleSubmit(async (data) => {
    const success = await personUpdate(data);
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
          <UserPen /> Изменить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Изменить персонал</DialogTitle>
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
              name="department_id"
              render={({ field }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Департмент</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите департмент" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {departments.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
