'use client'

import api from '@/src/utils/api'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {    
    const [user, setUser] = useState({username: '', password: ''})
    const router = useRouter()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/members/login', user)
        .then(() => {
            alert(`${user.username}님 환영합니다 !!`)
            router.push("/")
        })
        
    }

    const handleLogout = async () => {
        await api.post('/members/logout')
        .then(() => {
            alert(`${user.username}님 안녕히 가세요`)
            router.push("/")
        })
    }


    return (
        <div>
            <h4>로그인</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} placeholder='아이디' />
                <input type="password" name="password" onChange={handleChange} placeholder='비밀번호' />
                <input type="submit" value="로그인" />
            </form>
                <button onClick={handleLogout}>로그아웃</button>
        </div>
        
    )    
}