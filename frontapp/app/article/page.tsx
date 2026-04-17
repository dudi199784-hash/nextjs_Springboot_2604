export default async function Article() {
    await fetch("http://localhost:8090/api/v1/articles")
    return (
        <div>
            <div>게시판 22</div>
        </div>
    );
}