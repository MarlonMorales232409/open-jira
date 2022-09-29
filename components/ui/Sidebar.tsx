import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from "@mui/system";
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const menuItems = ['Home', 'Mail-Box', 'Inbox', 'Send-Mail']

export const Sidebar = () => {
    return (
        <Drawer
            anchor="left"
            open={true}
            onClose={() => console.log('closed')}
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant='h4'>Menu</Typography>
                </Box>
                <List>
                    {
                        menuItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    {index % 2 ? <EmailOutlinedIcon /> : <MoveToInboxOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        menuItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    {index % 2 ? <EmailOutlinedIcon /> : <MoveToInboxOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    );
}

