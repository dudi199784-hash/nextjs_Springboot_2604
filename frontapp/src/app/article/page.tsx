'use client'

import api from '@/src/utils/api';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function ArticleDetail() {

    const getArticles = async () => {
        return await api 
        .get(`/articles`)
        .then(
            response => response.data.data.articles
        )
    }

    const {isLoading, error, data} = useQuery({
        queryKey: ['articles'],
        queryFn: getArticles
    })

    const deleteArticle = async (id) => {
        await api.delete(`/articles/${id}`)
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles']})
        }
    })


    if (error) console.log(error)

    if (isLoading) { return <div>Loading</div> }

    if (data) {

    return(
        <div>
            <ArticleForm />
            <h4>번호 / 제목 / 작성자 / 생성일 / 삭제여부 </h4>
            {data.length == 0 ? (
                <p>현재 게시무이 없습니다.</p>
            ) : (
                <ul>
                    {data.map(row => 
                        <li key={row.id}>
                            {row.id} / <Link href={`/article/${row.id}`}>{row.subject}</Link> / {row.author} / {row.createdDate}
                            <button onClick={()=> mutation.mutate(row.id)}>삭제</button>
                        </li>
                    )}
                </ul>    
            )}
        </div>    
        
    );
    }
}

function ArticleForm(){
    
    const [article, setArticle] = useState({subject: '', content: ''})
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setArticle({...article, [name]: value})
    }

    const submitArticle = async (article) => {
        await api.post('/articles', article)
    }

    const queryClient = useQueryClient()
    const submitMutation = useMutation({
        mutationFn: submitArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles']})
        }
    })

    return (
        <div>
            <h4>게시물 작성</h4>
            <form onSubmit={(e)=>{
                e.preventDefault();
                submitMutation.mutate(article)
            }
                
                }>
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