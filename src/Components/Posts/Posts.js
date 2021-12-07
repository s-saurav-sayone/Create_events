import React, {useEffect, useContext, useState} from 'react';
import './pagination.css'
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Post.css';
import ReactPaginate from 'react-paginate';
function Posts(props) {
const{firebase} = useContext(FirebaseContext)
const[products, setProducts] = useState([])
const [offset, setOffset] = useState(0);
const [perPage] = useState(3)
const [pageCount, setPageCount] = useState(0)
useEffect(()=>{
  firebase.firestore().collection('Clothes').get().then((snapshot)=>{
    const allPost = snapshot.docs.map((product)=>{
    if(props.cat===undefined){
      return {
        ...product.data(),
        id: product.id
      }}
      else 
      {
      if(product.data().category===props.cat){
        return {
          ...product.data(),
          id: product.id}}
     else{ 
       console.log(props.cat)         
      return {}}
     }})
    //serach for keyword in array:
    const post = allPost.filter(product=>Object.keys(product).length !== 0)
    var filteredPost =  post
    if(props.search!==undefined){
      console.log(props.search)
       filteredPost = post.filter((product)=>{
        return product.name.toLowerCase().includes(props.search.toLowerCase())
      })}
   
    //filter empty objects in array:
    
    
    const slice = filteredPost.slice(offset, offset + perPage)
    console.log(slice)
    const postData = slice.map(product => <div
      className="card"
    >
      <div className="favorite">
        <Heart></Heart>
      </div>
      <div className="image">
        <img src={product.url} alt="" />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="kilometer">{product.category}</span>
        <p className="name"> {product.name}</p>
      </div>
      <div className="date">
        <span>{product.createdAt}</span>
      </div>
    </div> )
    setProducts(postData)
    setPageCount((filteredPost.length / perPage) )
})
}, [props.cat,offset,props.search]) 

useEffect(()=>{

  setOffset(0);
},[props.cat])
const handlePageClick = (e) => {
  const selectedPage = e.selected;
  console.log(selectedPage)
  setOffset(selectedPage * perPage);
};
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
      {/*  {products.map(product=>{

        console.log(product.url)
         
          return  <div
              className="card"
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div> 
        })
}  
 */}
 {products}
     <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    forcePage={0}/>
                   
      
        </div>
      </div>
      
      </div>
    
  );
}

export default Posts;
