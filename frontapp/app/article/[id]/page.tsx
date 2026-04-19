'use client'

import Link from "next/link";
import { useParams } from "next/navigation"
import { useState, useEffect } from 'react'

export default function ArticleDetail() {
    const params = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8090/api/v1/articles/${params.id}`)
        .then(result => result.json())
        .then(result => setArticle(result.data.article))
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