'use client'

import api from '../utils/api';
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function ArticleDetail() {
    const [articles, setArticles] = useState([]);

    useEffect (() => {
        fetchArticles()
    }, [])

    const fetchArticles = () => {
        api.get(`/articles`)
        .then(
            response => setArticles(response.data.data.articles)
        )
        .catch( err => {
            console.log(err)
        })
    }

    const handleDelete = async (id) => {
        await api.delete(`/articles/${id}`)
        .then(() => {
            fetchArticles()
        })
    }
    return(
        <div>
            <ArticleForm fetchArticles={fetchArticles} />
            <h4>번호 / 제목 / 작성자 / 생성일 / 삭제여부 </h4>
            {articles.length == 0 ? (
                <p>현재 게시무이 없습니다.</p>
            ) : (
                <ul>
                    {articles.map(article => 
                        <li key={article.id}>
                            {article.id} / <Link href={`/article/${article.id}`}>{article.subject}</Link> / {article.author} / {article.createdDate}
                            <button onClick={()=> handleDelete(article.id)}>삭제</button>
                        </li>
                    )}
                </ul>    
            )}
        </div>    
        
    );
}

function ArticleForm({fetchArticles}){
    
    const [article, setArticle] = useState({subject: '', content: ''})
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setArticle({...article, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/articles', article)
        .then(function (response) {
            fetchArticles();
            console.log(response)
        })
        .catch (function (err) {
            console.log(err)
        })
    }


    return (
        <div>
            <h4>게시물 작성</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    제목:
                <input type="text" name="subject" onChange={handleChange}/>
                </label>
                <br />
                <label>
                    내용:
                <input type="text" name="content" onChange={handleChange}/>
                </label>
                <button type='submit'>등록</button>
            </form>
        </div>
        
    )
}