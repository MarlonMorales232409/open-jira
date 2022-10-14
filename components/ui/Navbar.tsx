import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from "../../context/ui";
import { useContext } from "react";
import NextLink from "next/link";

export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext)

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size="large" edge="start" onClick={openSideMenu}>
                    <MenuOutlinedIcon />
                </IconButton>

                <NextLink href={'/'}>
                    <Link underline="none" color={'white'} sx={{ cursor: 'pointer' }}>
                        <Typography variant="h6">Open - Jira</Typography>
                    </Link>
                </NextLink>
            </Toolbar>
        </AppBar>
    );
}
