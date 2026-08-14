"use client";
import { useEffect } from "react";
export function useEscapeKey(callback,enabled=true){useEffect(()=>{if(!enabled)return;const onKeyDown=event=>event.key==="Escape"&&callback();addEventListener("keydown",onKeyDown);return()=>removeEventListener("keydown",onKeyDown)},[callback,enabled])}
