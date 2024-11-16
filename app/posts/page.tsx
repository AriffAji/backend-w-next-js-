import CardList from "../components/Posts/CardList"
import ViewUserButton from "../components/Posts/ViewUserButton"

const base_url = "https://jsonplaceholder.typicode.com/posts" 

interface Iposts {
  userId: number,
  id: number,
  title: string,
  body: string,
} 


const Posts = async () => {
  const response = await fetch(base_url, {
    // cache: 'no-store' //Untuk Dynamic fetching data
    next: {revalidate: 10}
  })
  const posts : Iposts[] = await response.json()
  
  return (
    <>
      <p>{new Date().toLocaleTimeString()}</p>
      <div className="text-fuchsia-500">Postingan Posts</div>
      {posts.map((post) => (
        <CardList key={post.id} >
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.body}</p>
          <ViewUserButton userId={post.userId} />
        </CardList>
      ))}
    </>
  )
}

export default Posts