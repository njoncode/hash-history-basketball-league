import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import slug from 'slug'
import Loading from './Loading'

Sidebar.propTypes = {
   title: PropTypes.string.isRequired,
   list: PropTypes.array.isRequired,
   loading: PropTypes.bool.isRequired,
}

function CustomLink ({to, children}) {
    return (
        <Route
            path= {to.pathname}
            children={({match}) => {
                return (
                <li style={{listStyleType: 'none', fontWeight: match ? 'bold' : 'normal'}}>
                    <Link to={to}>{children}</Link>
                </li>
                )
            }}
        />
    )
}
 
export default function Sidebar({ title, list, loading, location, match }) {
    return loading === true ? 
    <Loading/>
    : <div>
        <h3 className='header'>{title}</h3>
        <ul className='sidebar-list'>
            {list.map((item) => (
            <CustomLink 
            key={item}
            to={{
                pathname: `${match.url}/${slug(item)}`,
                search: location.search,
            }}
            >
                {item.toUpperCase()}
            </CustomLink>
            ))}
        </ul>
    </div>
}


/**
 * We create our CustomLink component, which is gonna receive two things - a 'to' prop as well as 'children'.
 * We don't just want to return a link component.
   We want to return a route because Route has a built-in location checker in it & we want to use that to know if we should change the style of the particular link.
  
   We pass the route prop to.pathName. So this let's us know that when we use our CustomLink component, we are gonna be passing an object as the 'to' prop.
   And then now because we always want route to match, we use the children prop. children is gonna take a function which is gonna receive a match prop.
  
 * The reason we have to render route so we get access to match. And match is gonna tell us if the current app's location matches to.pathname. 
   If it does, then our list item is gonna have a font-weight of bold & if it doesn't, then we will just have a normal font.
   
*/


