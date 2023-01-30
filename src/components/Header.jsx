import { AppBar, TextField, Container, Toolbar } from '@mui/material'
import Logo from '../images/logo.png'
import debounce from "lodash.debounce";


const Header = ({setSearchSubreddit})=> {

    const updateQuery = (e) => setSearchSubreddit(e.target.value);
    const debouncedOnChange = debounce(updateQuery, 500);


    return (
      
        <AppBar position='sticky' sx={{
            backgroundColor: "#1a1a1b",
            marginBottom: "30px",
            paddingTop: "10px",
            paddingBottom: "10px"
            }} >
            
            <Container 
                maxWidth='md'
            >
                <Toolbar sx={{
                    direction: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    spacing: 1
                }}>

                    
                    <img src={Logo} alt="Logo" width="140px" />
                    


                    <TextField
                        onChange={debouncedOnChange} 
                        label="Search Reddit!"
                        sx={{
                            width: "35%"
                        }}
                    />

                </Toolbar >
            </Container>

         </AppBar>
 
    )
}

export default Header