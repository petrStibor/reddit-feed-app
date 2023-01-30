import {useState, useEffect} from 'react'
import Header from './components/Header'
import { Container} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios'
import SubredditDetail from './components/SubredditDetail'
import HomePosts from './components/HomePosts';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h3: {
      color: "#818384",
      fontSize: "0.8em",
      fontWeight: "500"
    }
  }
});


const App = ()=> {

  const [searchSubreddit, setSearchSubreddit] = useState('')
  const [redditPosts, setRedditPosts] = useState([])
  const [article, setArticle] = useState([])
  const [pageLimit, setPageLimit] = useState(5)  // Limit for posts
  const [isLoading, setIsLoading] = useState(true)

  // Home Reddit API

  const loadMainReddit = ()=> {

    const fetchItems = async()=>{
      const result = await axios.get(`https://www.reddit.com/.json?limit=${pageLimit}`)
      setRedditPosts(result.data.data.children)
      
      
      if(result.status === 200) {
        setIsLoading(false)
      }
      else {
        setIsLoading(true)
      }
    }
    fetchItems()
  }

  useEffect(()=>{
    loadMainReddit()
  },[pageLimit])


  useEffect(()=>{
    window.addEventListener("scroll", handleScroll)
  },[])



  // Subreddit API

  const loadSubreddit = ()=> {
    const fetchItems = async()=>{
      const result = await axios(`https://www.reddit.com/r/${searchSubreddit}.json?limit=${pageLimit}`)
      if(result.status === 200) {
        setIsLoading(false)
      }
      else {
        setIsLoading(true)
      }
      setArticle(result.data.data.children)
    }
    fetchItems()
  }


  useEffect(()=>{
    loadSubreddit()
  },[pageLimit, searchSubreddit])



  // Infinite scroll

  const handleScroll = ()=> {

    if(window.innerHeight + document.documentElement.scrollTop + 1 >= 
      document.documentElement.scrollHeight) {
        setPageLimit((prev)=>prev + 5 )
      }

  }



  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      <Header searchSubreddit={searchSubreddit} setSearchSubreddit={setSearchSubreddit} article={article} />
    
      <Container maxWidth='md'>
        {
          isLoading ?

          <LoadingButton loading variant="text" size='large' sx={{
            width: "100%",
            direction:"row",
            justifyContent:"center",
            alignItems:"center"
          }}/>
      
        
      :
      <Container>
          {
            searchSubreddit.length === 0 ?
            
            // If search is empty, display main posts
            redditPosts.map((redditPosts)=>{
              return (
                <HomePosts redditPosts={redditPosts.data} />
              )
            })
            :
            // If search not empty, display search data
            article.map((article)=>{
              return (
                <SubredditDetail article={article.data}/>
              )
            })
          }
      </Container>
        }
      </Container>
      
    </ThemeProvider>
  )
}

export default App