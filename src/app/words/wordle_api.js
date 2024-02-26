import { words } from "./valid_guesses.js"
import { solutions } from "./valid_solutions.js"
class wordle_api{

    getWord(){
        return solutions[Math.floor(Math.random()*solutions.length)];
    }

    checkWord(word){
        return words.indexOf(word) != -1 || solutions.indexOf(word) != -1
    }

    checkSpaces(guess, solution){
        var res = []
        for(var i = 0; i<5; i++){
            if(guess[i] == solution[i]){
                res.push("#365314") // green
            }
            else if(solution.includes(guess[i])){
                res.push("#ca8a04") // yellow
            }
            else{
                res.push("#3f3f46") // gray
            }
        }
        return res
    }

  
}
export default wordle_api


