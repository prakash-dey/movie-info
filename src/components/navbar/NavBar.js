import React, { useRef, useEffect } from 'react'
import './navbar.css'
import { Link,useLocation } from 'react-router-dom'

function NavBar() {
  const dark = true;
  const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }
];
const { pathname } = useLocation();
  const headerRef = useRef()
  const active = headerNav.findIndex(e => {
    return e.path === pathname});
  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className='nav-bar flex'>
      <div className="nav-logo">
        <Link to="/">
          <i className="uil uil-film"></i>MovieInfo
        </Link>
      </div> 
      {/* Add Search bar here */}

      <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                    <li className='Dark-icon'>{dark?<i class="uil uil-moon"></i>:<i className="uil uil-sun"></i>}</li>
                </ul>
                
                
      {/* Hammer Button */}
    </div>
  )
}

export default NavBar




