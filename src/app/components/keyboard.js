"use client"; 
import React from 'react';
import { useState } from 'react';
export default function keyboard(props) {
    const [keys, setKeys] = 
        useState(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", 
                "a", "s", "d", "f", "g", "h", "j", "k","l",
                "z", "x", "c", "v", "b", "n", "m"])
    const [colors, setColors] = useState(props.keyColors)
    
 
    const board = keys.map((letter, id) =>
        <button key={id} style={{background: colors[id]}} className="rounded p-2 capitalize font-serif"
                //onClick={handleClick}
                > 
            {letter} 
        </button>
    )

    return (
        <div className="grid grid-cols-10 gap-2 grid-rows-3 place-content-center">
            {board}
        </div>
    );
}