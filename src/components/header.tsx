'use client';

import Link from "next/link";
import Image from "next/image";
import userDefault from '../../public/userAvatar.jpg';
import burger from '../../public/burger.png';
import { Dropdown } from "flowbite-react";
import Sidebar from "@/components/sidebar";
import {useModal} from "@/util/useModal";

export default function Header() {

    const {
        showModal: sidebarOpen,
        toggleModal: toggleSidebar,
        modalRef: sidebarRef,
        triggerRef: triggerSidebarRef
    } = useModal();
    const userDropDownIcon = () => (
        <button>
            <Image src={userDefault} alt='default user' width={32} height={32}/>
        </button>
    );

    return (
        <div className='bg-dark'>
            <div className='px-40 py-6 flex justify-between'>
                <div className='flex gap-4'>
                    {sidebarOpen ? <Sidebar sidebarRef={sidebarRef} /> : null}
                    <button onClick={() => toggleSidebar()} ref={triggerSidebarRef}>
                        <Image src={burger} alt='burger' width={24} height={24}/>
                    </button>
                    <Link className='font-bold text-2xl' href='/'>Trello Roadmap</Link>
                </div>
                <Dropdown label='User' renderTrigger={userDropDownIcon} className='p-4 border-0 rounded-md left-4'>
                    <Dropdown.Item className='rounded-md px-2 w-full'>
                        Sign In
                    </Dropdown.Item>
                    <Dropdown.Item className='rounded-md px-2 w-full'>
                        Sign Out
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    )
}
