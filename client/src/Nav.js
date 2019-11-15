import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => {
    const filteredLinks = props.comps.filter((comp, i) => comp.name !== 'Home')
    const Links = props.isAdmin || props.name ? props.comps : filteredLinks
    const mappedLinks = Links.map((comp,i) => <Link key={i + comp.name} to={`${comp.path}`}>{comp.name}</Link>)
    return (
        <ul className={`nav ${props.class}`} onClick={props.get}>
            {mappedLinks}   
        </ul>
    );
};

export default Nav;