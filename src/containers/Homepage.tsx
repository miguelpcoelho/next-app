import Link from 'next/link'

export function HomePage(){
    return (
        <div>
            <h1>home</h1>
            <Link href="/people">
                <a href="">People</a>
            </Link>
        </div>
    )
}