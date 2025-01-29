'use client';

import { Button } from "@heroui/button";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import Link from "next/link";
import { GiMatchTip } from "react-icons/gi";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import type { Session } from "next-auth";

interface TopNavClientProps {
  session: Session | null;
}

export default function TopNavClient({ session }: TopNavClientProps) {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-400 to-purple-700"
      classNames={{
        item: [
          "text-xl",
          'font-normal',
          "text-white",
          "uppercase",
          "data-[active]:font-normal",
          "data-[active]:text-yellow-200",
        ],
      }}
    >

<NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-200" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Next</span>
          <span className="text-gray-200">Match</span>
        </div>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavLink href="/" label="Home" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/members" label="Members" />
      </NavbarContent>

      <NavbarContent justify="end">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <>
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              className="text-white"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/register"
              variant="bordered"
              className="text-white"
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
