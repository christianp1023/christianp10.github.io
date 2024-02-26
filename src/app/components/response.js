"use client"
export default function response(props) {
    return (
        <div 
            hidden={props.hidden}
            style={{animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"}} 
            className="bg-inherit text-xl text-white-500 font-serif"> 
            {props.solved ? "Great Job!" : props.word} 
        </div>
    );
}