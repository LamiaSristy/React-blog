import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => {
        // console.log(res);
        if(!res.ok){
          throw Error('Could not find the data.');
        }
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setBlogs(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        // console.log(err.message);
        setError(err.message);
        setIsPending(false);
      })
  }, []);

  // useEffect(() =>{
  //   setTimeout(() => {
  //     fetch('http://localhost:8000/blogs')
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       // console.log(data);
  //       setBlogs(data);
  //       setIsPending(false);
  //     })
  //   }, 1000)
  // }, []) 

  return (
    <div className="home">
      { error && <div>{error}</div>} 
      { isPending && <div>Loading...</div>}
      { blogs && <BlogList blogs={blogs} title="All Blogs"/>} 
    </div>
  );
}
 
export default Home;
