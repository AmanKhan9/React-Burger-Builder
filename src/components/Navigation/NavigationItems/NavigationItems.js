import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated ? 
        <NavigationItem link="/auth">Authenticate</NavigationItem> 
        : <NavigationItem link="/logout">Logout</NavigationItem> 
        }
    </ul>
);

export default navigationItems;