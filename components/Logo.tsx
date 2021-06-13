import React from "react";
import Image from "next/image";

export function Logo() {
    return  <div style={{background: 'white'}}>
        <Image 
        alt="tfh" 
        src="/logo.png" 
        width="128px"
        height="120px"/>
    </div>
}