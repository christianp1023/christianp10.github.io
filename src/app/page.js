"use client"; 
import Navbar from "./components/navbar"
//import Response from "./components/response"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import wordle_api from './words/wordle_api'
import dynamic from 'next/dynamic'
var wordle = new wordle_api()
var wordleWord = wordle.getWord()
const Response = dynamic(() => import('./components/response'), { ssr: false })

export default function Home() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const router = useRouter();
  const [solved, setSolved] = useState(false)
  const [values, setValues] = 
      useState([['','','','',''],
                ['','','','',''],
                ['','','','',''],
                ['','','','',''],
                ['','','','',''],
                ['','','','','']])

    const [colors, setColors] = 
      useState([['#171717','#171717','#171717','#171717','#171717'],
                ['#171717','#171717','#171717','#171717','#171717'],
                ['#171717','#171717','#171717','#171717','#171717'],
                ['#171717','#171717','#171717','#171717','#171717'],
                ['#171717','#171717','#171717','#171717','#171717'],
                ['#171717','#171717','#171717','#171717','#171717']])

    const [keys, setKeys] = 
      useState(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", 
              "a", "s", "d", "f", "g", "h", "j", "k","l", "Enter",
              "z", "x", "c", "v", "b", "n", "m", "Back"])

    const [keyColors, setKeyColors] = useState(new Array(28).fill("#6b7280"))
    
    const [isDisabled, setIsDisabled] = useState(false)

    const[rowIndex, setRowIndex] = useState(0)
    function checkValue(x) {
        return x != ''
      } 

    const resetWordle = () => {
      wordleWord = wordle.getWord()
      
      
      setValues([['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','','']])
      
      setRowIndex(0)
      setKeyColors(new Array(28).fill("#6b7280"))

      setColors([['#171717','#171717','#171717','#171717','#171717'],
      ['#171717','#171717','#171717','#171717','#171717'],
      ['#171717','#171717','#171717','#171717','#171717'],
      ['#171717','#171717','#171717','#171717','#171717'],
      ['#171717','#171717','#171717','#171717','#171717'],
      ['#171717','#171717','#171717','#171717','#171717']])

      setIsDisabled(false)
    }

    const onKeyDown = (event) => {
        
        const key = event.keyCode
        const keyName = event.key
        var newValues = values.slice()
        if(isDisabled){
          return
        }
        if ((key >= 65 && key <= 90 || key >= 97 && key <= 122) && values[rowIndex].includes('')){
          newValues[rowIndex][values[rowIndex].indexOf('')] = keyName
          setValues(newValues)
          //console.log(values)
        }
        else if((keyName == 'Backspace' || keyName == 'Back') && values[rowIndex].filter(x => x=='').length !== 5){
          newValues[rowIndex][values[rowIndex].findLastIndex(checkValue)] = ''
          setValues(newValues)
          //console.log(values)
        }
        else if(keyName == 'Enter' && !(values[rowIndex].includes('')) ){
            var w = values[rowIndex].join('')
            if(!wordle.checkWord(w)){
              alert("invalid word")
              return
            }
            var newColors = wordle.checkSpaces(w, wordleWord)
            var newKeyColors = keyColors
            for(var i = 0; i<5; i++){
              if(newColors[i] == "#3f3f46"){
                //console.log(keys.findIndex((x) => {x == w[i]}))
                newKeyColors[keys.findIndex((x) => x == w[i])] = "#3f3f46"
              }
              else{
                newKeyColors[keys.findIndex((x) => x == w[i])] = "#365314"
              }
            }
            setKeyColors(newKeyColors)
            //var t = wordle.getKeyColors(w, newColors)
            var temp = colors
            temp[rowIndex] = newColors
            setColors(temp)
            
            setRowIndex(rowIndex+1)
            
            if(w === wordleWord){
              //alert(`You got the word in ${rowIndex+1} guesses`)
              setSolved(true)
              setIsDisabled(true)
            }
            else if(rowIndex === 5){
              //alert(`Better luck next time. The word was ${wordleWord}`)
              setSolved(false)
              setIsDisabled(true)
            }
            
        }
        
      };

      const board = keys.map((letter, id) =>
      <button key={id} style={{background: keyColors[id]}} className="p-3 capitalize font-serif"
              disabled={isDisabled}
              onClick={() => onKeyDown({key:letter, keyCode:letter.length + 121})}
              > 
          {letter} 
      </button>
  )

     const grid = values.map((row, i) => {
        return row.map((cell, j) => (
    <div key={j} style={{ background: colors[i][j] }} className="box-border h-16 w-16 border-2  border-zinc-700 p-5 text-white-500 text-center text-2xl capitalize font-serif"> 
    {cell} </div>))}
)

      useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => {
          document.removeEventListener('keydown', onKeyDown);
        };
      }, [onKeyDown]);

  return (
    <main className="bg-neutral-900 flex min-h-screen flex-col items-center p-16"> 
      <Navbar> </Navbar>
      <Response hidden={!isDisabled} solved={solved} word={wordleWord}></Response>
      <div className="grid grid-cols-5 gap-2 grid-rows-6 place-content-center bg-neutral-900 p-8">
        
            {grid}       
        </div>
      <button hidden={!isDisabled} className="p-3 capitalize font-serif text-xl rounded-lg hover:bg-zinc-700" onClick={resetWordle}> New Game </button>
      <div className="grid grid-cols-10 gap-1 grid-rows-3 place-content-center p-4">
        {board}
        </div>

      
    </main>
  );
}
