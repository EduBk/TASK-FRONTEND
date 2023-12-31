"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import * as React from "react";
import "./style.css";
import { FcLock } from "react-icons/fc";
import { FaAt } from "react-icons/fa6";

import { useAuth } from "@/context/AuthContext";

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const urlBack = process.env.NEXT_PUBLIC_API_GATEWAY_FW as string;
    console.log("URL", urlBack);
    const res = await fetch(`${urlBack}/auth/login`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const response = await res.json();
    if (response.errors) {
      alert(response.errors);
    } else {
      login(response);
      router.push("/tasks");
      router.refresh();
    }
  };
  return (
    <div className="grid-auth">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="">Email</label>
        </div>
        <div className="inputForm">
          <FaAt />
          <input
            placeholder="usuario@ejemplo.com"
            className="input"
            type="text"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex-column">
          <label>Contraseña </label>
        </div>
        <div className="inputForm">
          <FcLock />
          <input
            placeholder="Contraseña."
            className="input"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
          ></input>
        </div>
        <button className="button-submit">INGRESAR</button>
        <p className="p">
          Aun no tienes una cuenta?{" "}
          <span className="span">
            <Link href="/register">Crea una.</Link>
          </span>
        </p>
        <div className="flex place-content-center">
          <p>Eduardo {new Date().getFullYear()} </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
