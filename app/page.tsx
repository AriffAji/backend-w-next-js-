import Link from "next/link";




export default function Home() {
  return (
    <>
    <h1 className="title text-2xl">Home Page</h1>
    <div>
      <h1>Testing</h1>
      <Link href="/posts">Posting Page</Link>
      <br />
      <Link href="/contacts">Posting Contacts</Link>
    </div>
    
    </>
  );
}
