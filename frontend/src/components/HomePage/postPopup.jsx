import React from 'react';
import { formatDate } from '../Tools.js';
import './postPopup.css';

export const PostPopup = ({onClose, selectedPost}) => {

    const handleReply = (postId) => {
        console.log(`Replying to post with ID ${postId}`);
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
                    <input></input>
                    <div className="button-container">
                    <button className="btn-cancel" onClick={()=>onClose()}>Cancel</button>
                    <button className="btn-submit">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};