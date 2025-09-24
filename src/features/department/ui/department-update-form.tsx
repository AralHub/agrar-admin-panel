import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { useRoleList } from "@/features/role";
import { useDepartmentUpdate } from "../model/use-department-update";
import { ApiSchemas } from "@/shared/api/schema";

const departmentSchema = z.object({
  name: z.string().min(1, "Название обьязательно"),
  role_id: z.number().min(1, "Выберите роль"),
  id: z.number(),
});

type DepartmentUpdateForm = {
  departmentInfo: ApiSchemas["DepartmentRead"];
};

export const DepartmentUpdateForm: FC<DepartmentUpdateForm> = ({
  departmentInfo,
}) => {
  const [open, setOpen] = useState(false);
  const { roles } = useRoleList();
  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      role_id: undefined,
      id: undefined,
    },
  });
  useEffect(() => {
    if (departmentInfo) {
      form.reset(departmentInfo);
    }
  }, [departmentInfo]);

  const { departmentUpdate, isPending } = useDepartmentUpdate();

  const onSubmit = form.handleSubmit(async (data) => {
    const success = await departmentUpdate({
      department_id: data.id,
      id: data.id,
      name: data.name,
      role_id: data.role_id,
    });
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
          <DialogTitle>Изменить департмент</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="role_id"
              render={({ field }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Название департмент</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={String(role.id)}>
                              {role.name}
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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Название роли</FormLabel>
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
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
