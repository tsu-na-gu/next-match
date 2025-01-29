'use client';

import { type User  } from "next-auth";
import {Dropdown, DropdownTrigger, Avatar,  DropdownMenu, DropdownItem, DropdownSection,} from "@heroui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type UserMenuProps = {
  user: User
};
export default function UserMenu({user}: UserMenuProps) {
  
  function handleSignOut() {
    signOut({redirectTo: '/'});
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar 
          isBordered
          as='button'
          className='transition-transform'
          color="secondary"
          name={user?.name || 'user avatar'}
          size="sm"
          src={user?.image || '/images/user.png'}
          />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User Actions menu">
        <DropdownSection showDivider>
          <DropdownItem  key="username" isReadOnly
            className="h-14 flex items-center"
            textValue={`Signed in as ${user?.name}`}> 
              Signed in as {user?.name}
          </DropdownItem>
          <DropdownItem key="edit_profile" as={Link} href="/members/edit">
              Edit Profile
          </DropdownItem>
          <DropdownItem key="signout" color='danger' onPress={handleSignOut}>
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>  
  );
}
