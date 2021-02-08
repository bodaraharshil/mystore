import { useRouter } from 'next/router';
import { useRef,useEffect } from 'react';
import { parseCookies } from 'nookies';

const Product = ({product}) => {

    const router = useRouter();
    const modelref = useRef();
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : ""
    useEffect(() => {
        M.Modal.init(modelref.current)
    }, [])

    if(router.isFallback ) 
    {
        return (
            <p>Loading .....</p>
        )
    }

    const getModel = () => {
        return (
            <div>
            <div id="modal1" className="modal" ref={modelref}>
                <div className="modal-content">
                <h4>{product.name}</h4>
                <p style={{color:'gray'}}>Are you sure you want to delete this?</p>
                </div>
                <div className="modal-footer">
                <button class="btn waves-effect waves-light #d32f2f red darken-2" type="submit" name="action" onClick={()=>deleteProduct()}>Yes
                </button>
                <button class="btn waves-effect waves-light  #1565c0 blue darken-3" type="submit" name="action">Cancel
                </button>
                </div>
            </div>
            </div>
        )
    }

    const deleteProduct = async() => {
        const res = await fetch(`http://localhost:3000/api/product/${product._id}`,{
            method:"DELETE"
        });
        const data = await res.json();
        router.push('/')
    }

    return (
        <div className="container center-align">
            <h3>{product.name}</h3>
            <img src={product.mediaurl} style={{width:'30%'}}/>
            <h5>RS {product.price}</h5>
            <input type="number" style={{ width:'400px',margin:'10px' }} min='1' placeholder="Quntity"/>        
            <button className="btn waves-effect waves-light #1565c0 blue darken-3" type="submit" name="action">Add
                <i className="material-icons right">add</i>
            </button>
            <h6 className="left-align">{product.discription}</h6>
            {
                user.role !== 'user' ?
                    <button data-target="modal1" className="btn modal-trigger waves-effect waves-light #d32f2f red darken-2" type="submit" name="action">Delete
                        <i className="material-icons left">delete</i>
                    </button> : null   

            }
            {getModel()}
        </div>
    )
}

export async function getServerSideProps({params:{ id }}){
    const res = await fetch(`http://localhost:3000/api/product/${id}`)
    const data = await res.json(); 
    return {
        props:{
            product:data.data
        }
    }
}



// export async function getStaticProps({params:{id}}) {
//     const res = await fetch(`http://localhost:3000/api/product/${id}`);    
//     const data = await res.json();
//     console.log(":::",data)
//     return {
//       props: {
//         product:data.data,
//       }, 
//     }
//   }
  
//   export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: {id:"601e9381250cd14c55fb2f91"} }
//       ],
//       fallback:false
//     }
//   }
  

export default Product;