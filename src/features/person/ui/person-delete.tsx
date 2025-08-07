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
import { Trash } from "lucide-react";
import { useState } from "react";
import { useDeletePerson } from "../model/use-person-delete";

export const PersonDelete = ({ person_id }: { person_id: number }) => {
  const [open, setOpen] = useState(false);
  const { deletePerson, isPending } = useDeletePerson();

  const handleDelete = async () => {
    const success = await deletePerson(person_id);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>
          {" "}
          <Trash /> Удалить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Вы точно хотите удалить?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            variant={"destructive"}
            disabled={isPending}
            type="submit"
          >
            Подтвердить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
