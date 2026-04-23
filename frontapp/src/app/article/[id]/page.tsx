'use client'

import api from "@/src/utils/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation"

export default function ArticleDetail() {
    const params = useParams();

    const getArticle = async () => {
        return await api.get(`/articles/${params.id}`)
        .then((response) => response.data.data.article)
    }

    const {isLoading, error, data} = useQuery({
        queryKey: ['article'],
        queryFn: getArticle
    })

    if (error) {
        console.log(error)
    }

    if (isLoading) {
        <div>
            Loading ...
        </div>
    }

    if (data) {
        return(
            <div>
                <h4>게시판 상세지롱 {params.id}</h4>
                <div>{data.createdDate}</div>
                <div>{data.modifyDate}</div>
                <div>{data.subject}</div>
                <div>{data.content}</div>
                <Link href={`/article/${params.id}/edit`}>수정</Link>
            </div>
        );
    }
}