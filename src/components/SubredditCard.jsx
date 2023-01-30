import { Typography, Card, CardMedia, Button, Container, Stack, Link } from '@mui/material'
import RedditIcon from '@mui/icons-material/Reddit';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const SubredditCard = ({article})=> {

    const {title, author, ups, num_comments, url_overridden_by_dest, permalink, subreddit_name_prefixed, post_hint, over_18} = article

    return (
        <>
            <Container sx={{
                backgroundColor: "#1a1a1b",
                marginBottom: "20px",
                padding: "20px",
                border: "2px solid #343536",
                borderRadius: "5px"
            }}
            >            
          
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >

              <Button href={`https://www.reddit.com/${subreddit_name_prefixed}`} target="_blank">
                <RedditIcon/>
                <Typography sx={{
                  color: "#ffff",
                  fontSize: "1.0em",
                  fontWeight: "500",
                  marginLeft: "10px"
                }}>
                  {subreddit_name_prefixed}
                </Typography>
              </Button>

              <Button href={`https://www.reddit.com/user/${author}`} target="_blank">
                <Typography variant='h3'>Posted by u/{author}</Typography>
              </Button>
 
            </Stack>

            
            <Link href={`https://www.reddit.com${permalink}`} target="_blank" underline='none'>
              <Typography variant='h3' sx={{
                  fontSize: {xs: "1em", sm: "1.3em", md: "1.4em", xl: "1.3em"},
                  color: "#d7dadc",
                  fontWeight: "500",
                  marginTop: "10px",
                  marginBottom: "10px"
              }}>
                  {title}
              </Typography>
            </Link>
            {
            post_hint === "image" ?

            <Link href={`https://www.reddit.com${permalink}`} target="_blank" underline='none'>
              {
                over_18 === false ?
                <Card>
                    <CardMedia
                        component="img"
                        image={url_overridden_by_dest}
                        sx={{
                          objectFit: {xs: "scale-down", sm: "contain", md: "scale-down", xl: "scale-down"},
                          height: {xs: "100%", sm: "100%", md: "100%", xl: "100%"},
                          padding: "20px"
                        }}
                    />
                </Card>
                :
                <Button variant='outlined'>Show NSFW content?</Button>
              }
              </Link>

              :

              null

              }

            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              sx={{
                marginTop: {xs: "10px", sm: "20px"}
              }}
            >
              <ThumbUpIcon/><Typography>Upvotes: {ups}</Typography>
              <CommentIcon/><Typography>Comments: {num_comments}</Typography>

            </Stack>

            </Container>
            

        </>
    )
}

export default SubredditCard