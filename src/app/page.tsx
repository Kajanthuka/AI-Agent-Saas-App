'use client';

import { Button } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      {/* <h1> Hello AI Agent APP</h1 > */}
      <Button
        as={Link}
        href="/members"
        color="primary"
        variant="bordered"
        startContent={<FaRegSmile />}>
        Click me
      </Button>
      {/* <Button 
      color="primary" 
      variant="bordered" >
        Login
        </Button> */}
    </div >
  );
}
