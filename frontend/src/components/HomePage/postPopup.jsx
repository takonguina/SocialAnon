import { AuthContext } from '../../ContextAuth';
import axios from "axios";
import { formatDate } from '../Tools.js';
import React, { useState, useContext } from 'react';
import { Toaster, toast } from 'sonner';
import './postPopup.css';


export const PostPopup = ({onClose, selectedPost}) => {
    
    const { authToken } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (change) => {
        setInputValue(change.target.value);
    }

    const handleReply = async (postId) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/message/new_message/?content=${encodeURIComponent(inputValue)}&id_post=${postId}`,
                null,
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200){
                onClose()
                return toast.success('New message sent')
              }
      } catch (error) {
        if (error.response?.status === 404){
            return toast.error('Post or user no longer exists')
          }  else if (error.response?.status === 303){
            return toast.error('This is your post.')
          } else {
            return toast.error('An unexpected error has occurred.')
          }
      }
    
    };

    return(
        <div 
            className="modal-container" 
            onClick={(e) => {
                if(e.target.className === "modal-container") {
                    onClose()};
            }}>
            <div className="modal"> 

                <div className="modal-content">
                    <p>{selectedPost.content}</p>
                    <p className='details'>{selectedPost.likes_post} likes - {formatDate(selectedPost.date_insert)}</p>
                </div>
                <div className="modal-footer">
                    <input 
                    className="inpuit"
                    value={inputValue}
                    placeholder="Reply"
                    onChange={handleInputChange}></input>
                    <div className="button-container">
                    <button className="btn-cancel" onClick={()=>onClose()}>Cancel</button>
                    <button className="btn-submit" onClick={()=>handleReply(selectedPost.id_post)}>Send</button>
                    <Toaster richColors position="top-center"/>
                    </div>
                </div>
            </div>
        </div>
    );
};