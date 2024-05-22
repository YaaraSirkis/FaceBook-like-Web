import React from 'react';
 import './RightMenu.css';
 import Contacts from './Contacts';
import Sponsored from './Sponsored';


 function RightMenu() {
     return (
        <div className='RightMenu'>
            <Contacts/>
            <Sponsored/>
        </div>
 );
    }
    export default RightMenu; 