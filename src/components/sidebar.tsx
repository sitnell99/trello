'use client';

import {HiArrowSmRight, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards} from "react-icons/hi";
import { Sidebar as SidebarComponent } from "flowbite-react";
import {LegacyRef} from "react";

type SidebarProps = {
    sidebarRef: LegacyRef<HTMLDivElement>
}
export default function Sidebar(props: SidebarProps) {
    const {sidebarRef} = props;
    return (
        <div ref={sidebarRef} className='fixed left-0 top-20 h-full'>
            <SidebarComponent aria-label='Sidebar' className='bg-transparent'>
                <SidebarComponent.Items className='p-5'>
                    <SidebarComponent.ItemGroup>
                        <SidebarComponent.Item href="#" icon={HiViewBoards}>
                            Boards
                        </SidebarComponent.Item>
                        <SidebarComponent.Item href="#" icon={HiViewBoards}>
                            Kanban
                        </SidebarComponent.Item>
                        <SidebarComponent.Item href="#" icon={HiInbox} label="3">
                            Inbox
                        </SidebarComponent.Item>
                        <SidebarComponent.Item href="#" icon={HiUser}>
                            Users
                        </SidebarComponent.Item>
                        <SidebarComponent.Item href="#" icon={HiShoppingBag}>
                            Products
                        </SidebarComponent.Item>
                        <SidebarComponent.Item href="#" icon={HiArrowSmRight}>
                            Sign In
                        </SidebarComponent.Item>
                        <SidebarComponent.Item href="#" icon={HiTable}>
                            Sign Up
                        </SidebarComponent.Item>
                    </SidebarComponent.ItemGroup>
                </SidebarComponent.Items>
            </SidebarComponent>
        </div>
    )
};
