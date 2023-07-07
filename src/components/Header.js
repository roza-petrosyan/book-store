import { AppBar,Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#f0f0d0' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" , fontFamily: "'Playfair Display', serif", fontSize: "30px"}}>
                        BOOK STORE
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}