import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useDepartmentCreate } from '../model/use-department-create'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/kit/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/kit/form'
import { Button } from '@/shared/ui/kit/button'
import { Input } from '@/shared/ui/kit/input'
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select'
import { useRoleList } from '@/features/role'

const departmentSchema = z.object({
    name: z.string().min(1, "Название обьязательно"),
    role_id: z.number().min(1, "Выберите роль")
})

export const DepartmentForm = () => {
    const [open,setOpen] = useState(false)
    const {roles} = useRoleList()
    const form = useForm({
        resolver: zodResolver(departmentSchema),
        defaultValues: {
            name: "",
            role_id: undefined
        }
    })

    const {createDepartment, isPending} = useDepartmentCreate()

    const onSubmit = form.handleSubmit(async (data) => {
    const success = await createDepartment(data); 
    if (success) {
      setOpen(false);     
      form.reset();       
    }
  });

    return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
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
              name="role_id"
              render={({ field }) => (
                <FormItem className="mt-1 mb-5">
                  <FormLabel>Название роли</FormLabel>
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
}