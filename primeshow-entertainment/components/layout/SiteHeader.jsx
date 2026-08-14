"use client";
import { useCallback,useEffect,useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu,X } from "lucide-react";
import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";
import ButtonLink from "@/components/ui/ButtonLink";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { classNames } from "@/lib/utils/classNames";

export default function SiteHeader({items,activeHref,observeSections=false,className=""}){
  const[scrolled,setScrolled]=useState(!observeSections),[open,setOpen]=useState(false),[active,setActive]=useState(activeHref||"#home");
  const close=useCallback(()=>setOpen(false),[]);
  useBodyScrollLock(open);
  useEscapeKey(close,open);

  useEffect(()=>{
    if(!observeSections)return;
    const onScroll=()=>setScrolled(scrollY>40);
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&setActive(`#${entry.target.id}`)),{rootMargin:"-35% 0px -55%"});
    addEventListener("scroll",onScroll,{passive:true});
    items.filter(item=>item.href.startsWith("#")).forEach(item=>{const element=document.querySelector(item.href);if(element)observer.observe(element)});
    onScroll();
    return()=>{removeEventListener("scroll",onScroll);observer.disconnect()}
  },[items,observeSections]);

  return <header className={classNames("site-header",scrolled&&"is-scrolled",className)}><nav className="nav-shell" aria-label="Primary navigation"><Brand/><div className="desktop-nav">{items.map(item=><Link key={item.label} className={(active||activeHref)===item.href?"active":""} href={item.href}>{item.label}</Link>)}</div><div className="nav-tools"><ThemeToggle/><div className="nav-action"><ButtonLink href="/contact">Collaborate</ButtonLink></div></div><button className="menu-toggle" aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)}><Menu/></button></nav><motion.div className="mobile-menu" initial={false} animate={{clipPath:open?"circle(150% at 88% 7%)":"circle(0% at 88% 7%)",visibility:open?"visible":"hidden"}} transition={{duration:.65,ease:[.76,0,.24,1]}} aria-hidden={!open} inert={!open?true:undefined}><button className="menu-close" aria-label="Close navigation" onClick={close}><X/></button><ThemeToggle mobile/><div className="mobile-links">{items.map((item,index)=><Link key={item.label} href={item.href} onClick={close}><small>{String(index+1).padStart(2,"0")}</small>{item.label}</Link>)}</div></motion.div></header>}
