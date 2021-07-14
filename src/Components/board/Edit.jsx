import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';
import ReactDom from 'react-dom'
import axios from 'axios';

const Edit = ({listUpdate, post}) => {
    const his = useHistory();
    const { search } = useLocation();
    const { no } = queryString.parse(search);
    
    const titleInput = useRef(null);
    const bodyInput = useRef(null);
    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    useEffect(()=>{
        post.map((p)=>{
            if(p._id === no){
                titleInput.current.value = p.title;
                bodyInput.current.value = p.body;
                setTitle(p.title);
                setBody(p.body);
            };
        })
    }, []);

    const changeInput = ((e) =>{
        if( e.target.id === "title-input"){
            setTitle(e.target.value);
        }else{
            setBody(e.target.value);
        }
    })

    const onSubmit = ((e)=>{

        e.preventDefault();
        
        if(title !== '' || body !== ''){
            
            axios.post(`/post/update?no=${no}`, {
                    title : title,
                    body : body
            }).then((res)=>{
                if(res.status === 200){
                    listUpdate();
                    his.replace('/list');
                }
            }).catch(err=>{
                console.log(err);
            });
        }
        
    })

    return(
        <>
            <form action="/" id="write-form">
                <input ref={titleInput} type="text" id="title-input" placeholder="글 제목" onChange={changeInput}/>
                <textarea ref={bodyInput} name="body-input" id="body-input" placeholder="내용" onChange={changeInput} />
                <button type="submit" id="writeBtn" onClick={onSubmit}>수정하기</button>
            </form>
        </>
    )
}

export default Edit;