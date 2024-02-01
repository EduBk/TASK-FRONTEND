import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

//! Este middleware se ejecuta en todas las rutas que esten definidas en la constante config.
export async function middleware(request: NextRequest) {
  const cookieName = process.env.COOKIE_NAME as string;
  const secret = process.env.SESSION_SECRET as string;
  const jwt = request.cookies.get(cookieName);
  console.log('a', request.cookies);
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await jwtVerify(jwt.value, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

//! Aqui se declaran las rutas donde validara el middleware. (ruta que no se encuentre en esta seccion, sera ruta que no tendra ninguna proteccion)
export const config = {
  matcher: ["/", "/tasks/:path*"],
};
