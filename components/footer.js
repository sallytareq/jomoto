import React from 'react';

import Link from 'next/link';

import Avatar from '@material-ui/core/Avatar';
import YouTubeIcon from '@material-ui/icons/YouTube';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
  return (
    <div>
      <footer id="footer" className="footer" dir='rtl'>
        <div className="footer__contact">
          <div className="footer__rights">
            <p>لمشاهدة المزيد</p>
          </div>
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
        </div>
        <div className="footer__info">
          <a rel="license" target='_blank' href="https://creativecommons.org/licenses/by/4.0/" title="Creative Commons Attribution 4.0 International license" >
            <img src="https://img.icons8.com/ios/30/ffffff/creative-commons.png" />
          </a>
          <a rel="license" href="https://creativecommons.org/licenses/by/4.0/" title="Creative Commons Attribution 4.0 International license" target='_blank'>
          <img src="https://img.icons8.com/ios/30/ffffff/creative-commons-by.png" />
          </a>
        <p>Except where otherwise noted, content on this site is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by/4.0/" title="Creative Commons Attribution 4.0 International license" target='_blank'>Creative Commons Attribution 4.0 International license</a>.</p>
        </div>
      </footer>
    </div >
  );
}

export default Footer;
