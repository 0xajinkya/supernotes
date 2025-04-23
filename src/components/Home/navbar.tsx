'use client';

import { Bomb, Menu } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "./logout";
import { Session } from "@supabase/supabase-js";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    logo?: {
        url: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

export const Navbar = ({
    session,
    logo = {
        url: "https://www.supernotes.0xajinkya.in",
        alt: "SuperNotes",
        title: "SuperNotes",
    },
    menu = [
        { title: "Home", url: "#" },
        {
            title: "Pricing",
            url: "#",
        },
        {
            title: "Blog",
            url: "#",
        },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Sign up", url: "/signup" },
    },
}: Navbar1Props & {
    session: Session | null
}) => {

    return (
        <section className="py-4 sticky top-0 z-50">
            <div className="px-[20px]">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6 p-[20px] bg-white rounded-full shadow-md">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            {/* <Image src={logo.src} className="max-h-8" width={80} height={80} alt={logo.alt} /> */}
                            <Bomb
                                color={"#F56565"}
                            />
                            <span className="text-lg font-semibold tracking-tighter">
                                {logo.title}
                            </span>
                        </a>
                        <div className="flex items-center">
                            <NavigationMenu
                                className=""
                            >
                                <NavigationMenuList>
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    {!session ?
                        <div className="flex gap-2 items-center bg-white">
                            <Button asChild variant="outline" size="sm">
                                <a href={auth.login.url}>{auth.login.title}</a>
                            </Button>
                            <Button asChild size="sm" className="bg-[#F56565] hover:bg-[#F56565]">
                                <a href={auth.signup.url}>{auth.signup.title}</a>
                            </Button>
                        </div>
                        :
                        <div className="flex gap-2 items-center">
                            <LogoutButton />
                        </div>
                    }
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <Bomb
                                color={"#F56565"}
                            />
                        </a>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <a href={logo.url} className="flex items-center gap-2">
                                            <Bomb
                                                color={"#F56565"}
                                            />
                                        </a>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        {session ?
                                            <div className="flex flex-col gap-2 items-center">
                                                <Button asChild variant="outline" size="sm" className="w-full">
                                                    <a href={auth.login.url}>{auth.login.title}</a>
                                                </Button>
                                                <Button asChild size="sm" className="bg-[#F56565] hover:bg-[#F56565] w-full">
                                                    <a href={auth.signup.url}>{auth.signup.title}</a>
                                                </Button>
                                            </div>
                                            :
                                            <LogoutButton
                                                cls="w-full"
                                            />
                                        }
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </a>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <a
            className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </a>
    );
};