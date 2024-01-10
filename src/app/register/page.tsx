"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import * as React from "react";
import "./style.css";
import { FcBusinessman, FcLock } from "react-icons/fc";
import { FaAt } from "react-icons/fa6";

import { useAuth } from "@/context/AuthContext";

function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (credentials.password != credentials.passwordConfirm) {
      alert("Las contraseñas no coinciden.");
      return false;
    }
    const urlBack = process.env.NEXT_PUBLIC_API_BASE_URL as string;
    const res = await fetch(`${urlBack}/api/auth/register`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const response = await res.json();

    if (response.message || response.errors) {
      if (response.message) {
        alert(response.message);
      } else if (response.errors) {
        alert(response.errors);
      }
    } else {
      alert("Cuenta creada con exito.");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="grid-auth">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="">Nombre(s)</label>
        </div>
        <div className="inputForm">
          <FcBusinessman />
          <input
            placeholder="Eduardo R."
            className="input"
            type="text"
            name="name"
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex-column">
          <label htmlFor="">Apellido(s)</label>
        </div>
        <div className="inputForm">
          <FcBusinessman />
          <input
            placeholder="Martinez Aguayo."
            className="input"
            type="text"
            name="lastName"
            onChange={handleChange}
          ></input>
        </div>
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
        <div className="flex-column">
          <label>Confirmar contraseña </label>
        </div>
        <div className="inputForm">
          <FcLock />
          <input
            placeholder="Confirma contraseña."
            className="input"
            type="password"
            name="passwordConfirm"
            onChange={handleChange}
          ></input>
        </div>
        <button className="button-submit">REGISTRARSE</button>
        <p className="p">
          Ya tienes una cuenta?{" "}
          <span className="span">
            <Link href="/login">Ingresa</Link>
          </span>
        </p>
        <div className="flex place-content-center">
          <p>Eduardo {new Date().getFullYear()} </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
