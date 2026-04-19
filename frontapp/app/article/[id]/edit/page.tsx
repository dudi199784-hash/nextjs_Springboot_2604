'use client'

import { useParams } from 'next/navigation'
import {useState, useEffect} from 'react'

export default function ArticleEdit() {    
    const params = useParams()
    const [article, setArticle] = useState({subject: '', content: ''})
    
    useEffect(() => {
     fetchArticle()   
    },[])

    const fetchArticle = () => {
        fetch(`http://localhost:8090/api/v1/articles/${params.id}`)
        .then(result => result.json())
        .then(result => setArticle(result.data.article))
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setArticle({...article, [name]: value})
        console.log({...article, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    const response = await fetch(`http://localhost:8090/api/v1/articles/${params.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(article)
    })

    if (response.ok) {
        alert('success update')
    }else {
        alert('update fail')
    }
    }


    return (
        <div>
            <h4>게시물 수정</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    제목:
                <input type="text" name="subject" value={article.subject} onChange={handleChange}/>
                </label>
                <br />
                <label>
                    내용:
                <input type="text" name="content" value={article.content} onChange={handleChange}/>
                </label>
                <button type='submit'>수정</button>
            </form>
        </div>
        
    )    
}