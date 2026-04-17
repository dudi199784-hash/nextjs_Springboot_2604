export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
        <div>
            <h2>소개 페이지 공통</h2>
            {children}
        </div>
    )
}