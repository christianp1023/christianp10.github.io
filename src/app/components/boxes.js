"use client"; 
import React from 'react';
import { useState, useEffect } from 'react';

export default function boxes(props) {
    const [values, setValues] = useState(props.values)
    const [colors, setColors] = useState(props.colors)
      
        var grid = values.map((row, i) => {
            return row.map((cell, j) => (
            <div key={j} style={{ background: colors[i][j] }} className="box-border h-16 w-16 border-2  border-zinc-700 p-5 text-white-500 text-center text-2xl capitalize font-serif"> 
            {cell} </div>))}
        )


    return (
        
        <div className="grid grid-cols-5 gap-2 grid-rows-6 place-content-center bg-neutral-900 p-8">
            {grid}       
        </div>
      
    );
}