"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion,useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { classNames } from "@/lib/utils/classNames";
export default function ButtonLink({href,children,variant="gold",className="",magnetic=true}){const ref=useRef(null),x=useSpring(0,{stiffness:280,damping:20}),y=useSpring(0,{stiffness:280,damping:20});const move=event=>{if(!magnetic||!ref.current||matchMedia("(pointer: coarse)").matches)return;const box=ref.current.getBoundingClientRect();x.set((event.clientX-box.left-box.width/2)*.15);y.set((event.clientY-box.top-box.height/2)*.15)};const reset=()=>{x.set(0);y.set(0)};return <motion.span ref={ref} style={{x,y}} onMouseMove={move} onMouseLeave={reset} className="button-motion-wrap"><Link href={href} className={classNames("button",`button-${variant}`,className)}><span>{children}</span><ArrowRight size={16} aria-hidden="true"/><i aria-hidden="true"/></Link></motion.span>}
