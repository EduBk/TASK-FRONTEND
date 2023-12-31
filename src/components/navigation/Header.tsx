"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useAuth } from "@/context/AuthContext";
import {
  BsFillEmojiSunglassesFill,
  BsGearFill,
  BsBoxArrowInRight,
} from "react-icons/bs";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onReloadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReloadClick }) => {
  const { user, logout } = useAuth();
  const cookie = Cookies.get("AuthUser");
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    userId: "",
  });
  const handleChange = (e: any) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const urlBack = process.env.NEXT_PUBLIC_API_GATEWAY_FW as string;
    if (user) {
      tasks.userId = user.id.toString();
      // console.log(tasks);
      const res = await fetch(`${urlBack}/tasks/create-task`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify(tasks),
      });
      const response = await res.json();
      if (response.errors) {
        alert(response.errors);
      } else {
        setOpen(false);
        onReloadClick();
      }
    }
  };
  return (
    <header
      className={`sticky top-0 right-0 left-0 p-4 z-50 min-w-full bg-sky-900 flex items-center justify-between shadow-bottom`}
    >
      <div className="font-bold font-sans text-2xl text-gray-300 ml-6">
        TASKS APP
      </div>
      <div className="flex  gap-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Crear Tarea</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Tarea</DialogTitle>
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
                  className="bg-primario"
                  onClick={handleSubmit}
                >
                  Crear
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="avatar-usuario"
                    />
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 z-50 bg-white"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                    {" " + user.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Perfil
                  <DropdownMenuShortcut>
                    <BsFillEmojiSunglassesFill />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Configuracion
                  <DropdownMenuShortcut>
                    <BsGearFill />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Salir
                <DropdownMenuShortcut>
                  <BsBoxArrowInRight />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <p>Not Found</p>
        )}
      </div>
    </header>
  );
};

export default Header;
