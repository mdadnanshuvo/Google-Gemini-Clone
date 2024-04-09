
import { useContext } from 'react';
import { assets } from '../../assets/assets';
import runChat from '../../.config/gemini';
import './Main.css';
import { Context } from '../../Context/Context';

const Main = () => {

    
    const {
      onSent,
      recentPrompt,
      showResult,
      loading,
      resultData,
      setInput,
      input

    } = useContext(Context);


  return (
    <div className='main'>
   
   <div className="nav">
    <p>Gemini</p>
    <img src={assets.user_icon} alt="" />
   </div>
  
  <div className="main-container">
    
    {!showResult ?
    <>
    <div className="greet">
        <p>
            <span>Hello, Programmers</span>
            <p>How can i help you today?</p>
        </p>
    </div>
    <div className="cards">
        <div className="card">
            <p>Please guide me on how to be master backend developer </p>
            <img src={assets.compass_icon} alt="" />
        </div>
        <div className="card">
            <p>Tell me about Calculus</p>
            <img src={assets.bulb_icon} alt="" />
        </div>
        <div className="card">
            <p>How difficult it is to master at Discrete Mathematics </p>
            <img src={assets.message_icon} alt="" />
        </div>
        <div className="card">
            <p> React Js or Next Js? </p>
            <img src={assets.code_icon} alt="" />
        </div>
    </div>
    </>:
    <>
    <div className="result">
        <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
        </div>
    
    <div className="result-data">
        <img src={assets.gemini_icon} alt="" />
        {loading ?
        <div className='loader'>
          <hr />
          <hr />
          <hr />
       </div>
       :
       <p dangerouslySetInnerHTML={{__html:resultData}}>{}</p>
            }
       
    </div>

    </div>
    </>}

    <div className="main-bottom">
        <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {input && <img onClick={() => onSent()} src={assets.send_icon} alt="" />}
            </div>
        </div>
        <p className="bottom-info">Gemini may display inacurate info, including about people, so double check its responses</p>
        
    </div>
  </div>
    </div>
  )
}

export default Main