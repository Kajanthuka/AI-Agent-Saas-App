"use client"

import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Dropdown, DropdownTrigger, Avatar,
    DropdownMenu, DropdownItem, NavbarMenuToggle
} from '@nextui-org/react'
import React from 'react'
import { Button, Divider } from '@nextui-org/react';
import NextLink from "next/link";
import { Bot } from "lucide-react";
import {
    SlidersHorizontal, Shield,
    MessageCircle,
    LogOut, Bell, User, Search
} from "lucide-react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TopNav() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleSearch() {
        const query = search.trim();

        if (!query) {
            return;
        }

        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        window.location.href = "/auth/login";
    };
    return (
        <div className="min-h-0 bg-gray-50 px-4 py-2 lg:px-1">
            <Navbar
                maxWidth="full"
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className=" bg-linear-to-b bg-emerald-900 h-24 max-w-7xl text-white flex-col rounded-2xl  px-6 shadow-sm"
                classNames={{
                    item: [
                        'text-lg',
                        'lowercase',
                        'data-[active=true]:text-yellow-200'
                    ]
                }}

            >

                <NavbarContent justify="start" className="gap-2">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="text-white lg:hidden"
                    />

                    <NavbarBrand as={NextLink} href='/' className="gap-1">
                        <Bot size={28} className='text-gray-300 sm:size-10' />
                        <div className='font-medium text-sm sm:text-xl lg:text-2xl flex'>
                            <span>Task-Pilot-</span>
                            <span>AI</span>
                        </div>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden gap-8 lg:flex" justify="end" >
                    <NavbarItem as={NextLink} href='/members' className="text-lg font-medium justify-end ">  Welcome Back 👋</NavbarItem>
                </NavbarContent>


                <NavbarContent justify="end" className="gap-2" >
                    <div className="hidden md:flex items-center gap-2">
                        <Input
                            aria-label="Search"
                            className="w-[180px] lg:w-[240px]"
                            isClearable
                            name="search"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            onValueChange={setSearch}
                            placeholder="Search..."
                            startContent={<SearchIcon className="h-4 w-4 text-default-500" />}
                            type="search"
                            value={search}
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <Button isIconOnly variant="light" aria-label="search" onPress={handleSearch}>
                            <Search size={20} className="text-gray-300" />
                        </Button>
                        <Button isIconOnly variant="light" aria-label="Notifications">
                            <Bell size={20} className="text-gray-300" />
                        </Button>
                    </div>

                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly variant="light" className="rounded-full">
                                <Avatar src="https://i.pravatar.cc/150?img=47" className="h-11 w-11" />

                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="User menu"
                            onAction={(key) => {
                                console.log(key);
                            }}
                        >
                            <DropdownItem
                                key="account"
                                as={NextLink}
                                href="/account"
                                startContent={<User size={22} className="text-gray-500" />}
                                className="py-3 text-lg font-medium"
                            >
                                Your account
                            </DropdownItem>
                            <DropdownItem
                                key="preferences"
                                as={NextLink}
                                href="/preferences"
                                startContent={<SlidersHorizontal size={22} className="text-gray-500" />}
                                className="py-3 text-lg font-medium"
                            >
                                Preferences
                            </DropdownItem>

                            <DropdownItem
                                key="divider-1"
                                className="pointer-events-none h-auto p-0"
                            >
                                <Divider />
                            </DropdownItem>
                            <DropdownItem
                                key="security"
                                as={NextLink}
                                href="/security"
                                startContent={<Shield size={22} className="text-gray-500" />}
                                className="py-3 text-lg font-medium"
                            >
                                Security & privacy
                            </DropdownItem>

                            <DropdownItem
                                key="feedback"
                                as={NextLink}
                                href="/feedback"
                                startContent={
                                    <MessageCircle size={22} className="text-gray-500" />
                                }
                                className="py-3 text-lg font-medium"
                            >
                                Send feedback
                            </DropdownItem>

                            <DropdownItem
                                key="divider-2"
                                className="pointer-events-none h-auto p-0"
                            >
                                <Divider />
                            </DropdownItem>

                            <DropdownItem
                                key="logout"
                                textValue="Log out"
                                color="danger"
                                startContent={<LogOut size={22} />}
                                className="py-3 text-lg font-medium"
                                onPress={handleLogout}
                            >
                                Log out
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    )
}

