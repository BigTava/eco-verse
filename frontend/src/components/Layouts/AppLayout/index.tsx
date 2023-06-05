// Core
import React from "react";
/*eslint-disable*/
// Components
import Sidebar from "components/Layouts/AppLayout/Sidebar";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

type AppLayoutProps = {
  children: React.ReactNode;
};
export default function AppLayout(props: AppLayoutProps) {
  return (
    <div>
      <Sidebar />

      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
      </main>
    </div>
  );
}
