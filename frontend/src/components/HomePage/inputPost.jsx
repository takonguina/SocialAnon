import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../ContextAuth';
import { Toaster, toast } from 'sonner';
import './InputPost.css';

export const InputPost = () => {
    const { authToken } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (change) => {
        setInputValue(change.target.value);
    }
    const sendNewPost = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/content/insert_new_post/',
                null,
                {
                    params: { content: inputValue },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
    
            if (response.status === 200){
                setInputValue("")
                return toast.success('New post successfully insert')
              }

        } catch (error) {
            console.error('Erreur de requête :', error.message);
        }
    };

    return (
        <div className="container">
            <input 
            className="input-post"
            placeholder="What's new ?"
            value={inputValue}
            onChange={handleInputChange}
            ></input>
            <button className="post-button" onClick={sendNewPost}>Send</button>
            <Toaster richColors position="top-center"/>
        </div>
    );
};