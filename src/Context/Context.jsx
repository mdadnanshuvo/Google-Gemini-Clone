import { createContext, useState } from "react";
import runChat from "../.config/gemini";


export const Context = createContext();

const ContextProvider = (props) =>
{

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt,setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index,nextWord) =>
    {
        setTimeout(() => {
         setResultData((prev) => prev+nextWord);
        }, 75*index)
    }

    const addChat = () =>
    {

      setLoading(false);
      setShowResult(false)

    }

  const onSent = async (prompt) =>
  {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let promptResponse = "";
    if(prompt !== undefined)
    {
         promptResponse += await runChat(prompt);
         setRecentPrompt(prompt);
    }
    else{
      setPrevPrompt(prev => [input, ...prev]);
      setRecentPrompt(input);
      promptResponse = await runChat(input);
    }
    
    
    let responseArr = promptResponse.split('**');
    let newResponse ="";
    for(let i = 0; i < responseArr.length; i++)
    {
      if(i === 0 || i % 2 !== 1){
        newResponse += responseArr[i];
      }
      else{
        newResponse += "<b>"+responseArr[i]+"</b>"
      }
    }
    let newResponse2 = newResponse.split('*').join('</br>')
    let responseArrWithSpaces = newResponse2.split(" ");

    for(let i = 0; i < responseArrWithSpaces.length; i++)
    {
      const newWord = responseArrWithSpaces[i];
      delayPara(i,newWord+ " ");
    }
    
    setLoading(false);
    setInput("");
  }

  

   
const contextValues = {
   onSent,
   input,
   setInput,
   recentPrompt,
   setRecentPrompt,
   prevPrompt,
   setPrevPrompt,
   showResult,
   setShowResult,
   loading,
   setLoading,
   resultData,
   setResultData,
   addChat
};




    return (
       
        <Context.Provider value={contextValues}>
           {props.children} 
        </Context.Provider>
    )

}

export default ContextProvider;