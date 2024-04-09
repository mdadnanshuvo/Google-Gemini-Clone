import './Sidebar.css'
import {assets} from '../../assets/assets';
import {useContext, useState} from 'react';
import { Context } from '../../Context/Context';



const Sidebar = () => {
   
    const [extended, setExtended] = useState(true);
    const {onSent,prevPrompt, setRecentPrompt,addChat,showResult} = useContext(Context);



    const loadPrompt = async (prompt) => 
    {
      setRecentPrompt(prompt);
      await onSent(prompt);
    }

    const newChatActivation = (showResult === false) ? true : false

  return (
    <div className='sidebar'>


     <div className="top">
     <img className="menu" src={assets.menu_icon} alt="" onClick ={() => setExtended((prev) => !prev)} />
    
     
     
   <div className="new-chat"  aria-disabled={newChatActivation} onClick={() => addChat()}>
    <img src={assets.plus_icon} alt=""  />
    {extended? <p>New Chat</p> : null}
   </div> 



{extended && <div className="recent">
    <p className="recent-title">Recent</p>
    {prevPrompt.map((item,index) =>
  {
    return (
<div key={index} className="recent-entry" onClick={() => loadPrompt(item)} >
        <img src={assets.message_icon} alt="" />
        <p>{item.slice(0,18)}...</p>
    </div>
    )
  })}
    
</div>}
</div>

     <div className="bottom">
  <div className="bottom-item recent-entry">
    <img src={assets.question_icon} alt="" />
   {extended &&  <p>Help</p>}
  </div> 

  <div className="bottom-item recent-entry">
    <img src={assets.history_icon} alt="" />
    {extended && <p>Activity</p> }
  </div>

  <div className="bottom-item recent-entry">
    <img src={assets.setting_icon} alt="" />
   {extended &&  <p>Settings</p>}
  </div>

     </div>
    </div>
  )
}

export default Sidebar