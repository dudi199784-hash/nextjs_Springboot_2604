'use client'

import { useParams } from "next/navigation"

export default function ArticleDetail() {
    const params = useParams();
    // console.log(params)

    return(
        <div>
            게시판 상세지롱 {params.id}
        </div>
    );
}