"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import path from "path"
import logo from'../../../assets/freshcart-logo.49f1b44d.svg'
import Image from "next/image"
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export  function NavigationMenuDemo() {
   const {data: Cartdata} = useQuery({
    queryKey: ['cart'],
    queryFn: async ()=> {
        const data = await fetch('/api/cart')
        if(!data.ok) {
            throw new Error('Failed to fetch cart data')
        }
        return data.json()

    }
  
  })
  const {data, status}= useSession()

function handleLogOut(){
  signOut({redirect:true,callbackUrl:'/Auth/login'})
}

  const links=[
    {path:'/',element:'home'},
    {path:'/categories',element:'categories'},
    {path:'/brands',element:'brands'}
  ]

    const auth=[
    {path:'/Auth/login',element:'login'},
    {path:'/Auth/register',element:'register'}
   
  ]
  return (
    <NavigationMenu className="max-w-full justify-between px-10 md:px-20 py-4">
      <Image src={logo} alt="Fresh cart logo"/>
      <NavigationMenuList>
         {/* toggler */}
        <NavigationMenuItem className="flex md:hidden">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
    {/* handle UI with status */}

    {status==="authenticated" ?
    <>
            {/* links */}
        {links.map(link=> <NavigationMenuItem key={link.element} className="hidden md:flex">
          <NavigationMenuLink asChild className={'hover:bg-transparent'}>
            <Link href={link.path} className="capitalize">{link.element}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>)}

        {/* icons */}

        <div className="icons flex gap-4 px-6">
        <Link href={'/cart'}>
        <div className="flex gap-3 justify-between align-middle">
         <FaCartShopping /> 
         <span> {Cartdata?.numOfCartItems }</span>
        </div>
        </Link>

        
        <Link href={'/wishlist'}>
        <FaHeart />
        </Link>
        </div>

       <h2>Hi {data?.user?.name}</h2>
       <Button className="cursor-pointer ms-3" onClick={handleLogOut}>LogOut</Button>



    </>
    
    
    
    
    
    :<>
    
         {auth.map(link=> <NavigationMenuItem key={link.element} className="hidden md:flex">
          <NavigationMenuLink asChild className={'hover:bg-transparent'}>
            <Link href={link.path} className="capitalize">{link.element}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>)}
    
    </>
    }






        


      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
