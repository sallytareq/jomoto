import React from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem >
                <Link href='/'>
                    <ListItemText primary="JoMoto Blog" />
                </Link>
                {!open ? <MenuIcon button onClick={handleClick} /> : <CloseIcon button onClick={handleClick} />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <Link href='/'>
                            <ListItemText primary="Home" />
                        </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="Contact Us" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}
