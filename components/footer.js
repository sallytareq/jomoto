import React from 'react';

import Link from 'next/link';

import Avatar from '@material-ui/core/Avatar';
import YouTubeIcon from '@material-ui/icons/YouTube';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import CopyrightIcon from '@material-ui/icons/Copyright';

function Footer() {
  return (
    <div>
      <footer id="footer" className="footer">
        <div className="footer__links">
          <IconButton>
            <Link href="https://www.facebook.com/jomotovlogs/">
              <a target="_blank">
                <Avatar>
                  <FacebookIcon />
                </Avatar>
              </a>
            </Link>
          </IconButton>
          <IconButton>
            <Link href="https://www.instagram.com/jomotovlog/">
              <a target="_blank">
                <Avatar>
                  <InstagramIcon />
                </Avatar>
              </a>
            </Link>
          </IconButton>
          <IconButton>
            <Link href="https://www.youtube.com/channel/UCxA-aq1X2u0BH1fKIdlAmiw">
              <a target="_blank">
                <Avatar>
                  <YouTubeIcon />
                </Avatar>
              </a>
            </Link>
          </IconButton>
        </div>
        <div className="footer__rights">
          jomoto
          {' '}
          <CopyrightIcon />
          {' '}
          2021
        </div>
        <div className="footer__info" />
      </footer>
    </div>
  );
}

export default Footer;
