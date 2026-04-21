'use client'

import api from "@/app/utils/api";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useState, useEffect } from 'react'

export default function ArticleDetail() {
    const params = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        api.get(`/articles/${params.id}`)
        .then(response => setArticle(response.data.data.article))
        .catch (err => {
            console.log(err)
        })
    }, [])

    return(
        <div>
            <h4>게시판 상세지롱 {params.id}</h4>
            <div>{article.createDate}</div>
            <div>{article.modifyDate}</div>
            <div>{article.subject}</div>
            <div>{article.content}</div>
            <Link href={`/article/${params.id}/edit`}>수정</Link>
        </div>
    );
}