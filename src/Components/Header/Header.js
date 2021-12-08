import React, {useContext, useRef} from 'react';
import {useHistory} from 'react-router-dom'

import Select from 'react-select';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { PROPERTY_TYPES } from '@babel/types';

function Header(props) {
  const history = useHistory()
 const {user} = useContext(AuthContext)
 const {firebase} = useContext(FirebaseContext)
 
 const actions = [
  { label: "All", value: undefined },
  { label: "Mens", value: "Mens" },
  { label: "Women", value: "Women" },
  { label: "Kids", value: "Kids" }
];
const searchText = useRef(null)
const handleclick = () => {
  
searchText.current.value = "";


  props.useSearch(undefined)
}
// detect enter key press:
const handleKeypress = (e) => {
  if (e.key === 'Enter') {
    history.push(`?search/${e.target.value}`)
    props.useSearch(e.target.value)
  }

};
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>{history.push('/')}}>
         <img src="https://th.bing.com/th/id/OIP.RuRAosJwtDBYjJ7S7heNEgAAAA?pid=ImgDet&rs=1" alt="Myntra" className="M" width="50px" height="65px"/>
        </div>
       <div className="placeSearch">
          <Search></Search>
          <input type="text" onKeyPress={handleKeypress} ref = {searchText} />
          <div onClick = {handleclick}>X</div>
        </div>
       {/*  <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>*/}
        <div className="language">
          <span>  
        <Select options={ actions } value = {props.cate} onChange ={(cate)=>{console.log(cate); props.usecat(cate.value)}} />
     </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage" >
          <span><strong>{user ? `Welcome ${user.displayName} `: 'Login'}</strong></span>
          <hr />
          
        </div><strong>
        {user && <span onClick={()=>{
          firebase.auth().signOut();
          history.push('/login')
        }}>Logout</span>}
        </strong>

        <div className="sellMenu">
          
          <div className="sellMenu" onClick={()=>{history.push('/create')}}>
            
            <button><span><strong>Add Products</strong></span></button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Header;
