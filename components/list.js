import React, { useState } from 'react';

import Link from 'next/link';

import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  // style for material UI list
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

  // handle menu open and close
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem>
        <Link href="/">
          <ListItemText primary="JoMoto Blog" />
        </Link>
        {!open ? <MenuIcon onClick={handleClick} /> : <CloseIcon onClick={handleClick} />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <Link href="/">
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href="/posts">
              <ListItemText primary="Posts" />
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href="/gallery">
              <ListItemText primary="Gallery" />
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link href="/about">
              <ListItemText primary="About" />
            </Link>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
