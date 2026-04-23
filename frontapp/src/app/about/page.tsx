'use client'

import { useState, useEffect } from 'react'
import api from '@/src/utils/api';

export default function About() {
    const [member, setMember] = useState({})

    useEffect(() => {
        api.get('/members/me')
        .then(response => setMember(response.data.data.memberDto))
    },[])

    return (
        <div>
            <div>소개페이지ㅜㅡㅜㅜㅜㅜ</div>
            <ul>
                <li>id : {member.id}</li>
                <li>username : {member.username}</li>
            </ul>
        </div>
    );     
}