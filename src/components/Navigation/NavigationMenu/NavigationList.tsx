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
} from "@/components/ui/navigation-menu"

interface HomeNavigationListProps {
  list: string[];
  set: (navigation: string) => void;
  selected: string;
}

export function HomeNavigationList({ list, set, selected }: HomeNavigationListProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{selected}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              {
                list.map((navigation) => (
                  <ListItem key={navigation} href={`/${navigation.toLowerCase()}`} title={navigation} onClick={() => set(navigation)}>
                    {`Navigate to the ${navigation} page.`}
                  </ListItem>
                ))
              }
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
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
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
