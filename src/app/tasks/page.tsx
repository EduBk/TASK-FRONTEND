"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import TaskCard from "@/components/cards";
import Header from "@/components/navigation/index";

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}

function Tasks() {
  const { user, logout } = useAuth();
  const cookie = Cookies.get("AuthUser");
  const urlBack = process.env.NEXT_PUBLIC_API_GATEWAY_FW as string;

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && cookie) {
          const res = await fetch(`${urlBack}/tasks?userId=${user.id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          });

          const data = await res.json();
          setTasks(data);
        }
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };

    fetchData();
  }, [user, cookie, urlBack]);

  const reloadTasks = async () => {
    try {
      if (user && cookie) {
        const res = await fetch(`${urlBack}/tasks?userId=${user.id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        });

        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error al recargar tareas:", error);
    }
  };

  return (
    <div>
      <Header onReloadClick={reloadTasks} />
      <section className="container mx-auto z-10">
        <div className="flex justify-center flex-wrap gap-4 mt-9">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} onReloadClick={reloadTasks}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Tasks;
