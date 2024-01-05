import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Cookies from "js-cookie";

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}

interface TaskCardProps {
  task: Task;
  onReloadClick: () => void;
}

function TaskCard({ task, onReloadClick }: TaskCardProps) {
  const [open, setOpen] = useState(false);
  const cookie = Cookies.get("AuthUser");
  const urlBack = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const [editTasks, setEditTasks] = useState({
    title: "",
    description: "",
    userId: "",
  });
  if (editTasks.title.length == 0) editTasks.title = task.title;
  if (editTasks.description.length == 0)
    editTasks.description = task.description;
  editTasks.userId = task.userId;
  const handleChange = (e: any) => {
    setEditTasks({ ...editTasks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // console.log(editTasks);
    const res = await fetch(`${urlBack}/api/tasks/${task.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify(editTasks),
    });
    const response = await res.json();
    if (response.errors) {
      alert(response.errors);
    } else {
      setOpen(false);
      onReloadClick();
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    // console.log("a");
    const res = await fetch(`${urlBack}/api/tasks/${task.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });
    const response = await res.json();
    if (response.errors) {
      alert(response.errors);
    } else {
      setOpen(false);
      onReloadClick();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div key={task.id} className="card">
          <h3 className="card__title">{task.title}</h3>
          <p className="card__content">{task.description}</p>
          <div className="card__date">
            {new Date(task.created_at).toLocaleDateString("es-MX", options)}
          </div>
          <div className="card__arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="15"
              width="15"
            >
              <path
                fill="#fff"
                d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
              ></path>
            </svg>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Tarea</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-xl">
              Titulo
            </Label>
            <Input
              id="title"
              placeholder="Agrega un titulo."
              className="col-span-5"
              type="text"
              name="title"
              defaultValue={task.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left text-xl">
              Descripción
            </Label>
            <textarea
              id="description"
              placeholder="Agrega una descripción."
              className="col-span-5 resize-none"
              name="description"
              defaultValue={task.description}
              onChange={handleChange}
              rows={4}
              cols={50}
              wrap="hard"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-destructive"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-primario"
              onClick={handleSubmit}
            >
              Guardar cambios
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskCard;
