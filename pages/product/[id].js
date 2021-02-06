import { useRouter } from 'next/router';

const Product = ({product}) => {

    console.log("{}{}{}{}",product)
    const router = useRouter();
    if(router.isFallback ) 
    {
        return (
        //     <div class="container">
        //     <div class="row">
        //       <div class="col-sm-6 text-center"><p>loader 0</p>
        //         <div class="loader"></div></div>
        //       <div class="col-sm-6 text-center"><p>loader 1</p><div class="loader1">
        //     <span></span>
        //     <span></span>
        //     <span></span>
        //     <span></span>
        //     <span></span>
        // </div></div>
        //     </div>
        // </div>
        <p>Loading .....</p>
        )
    }
    return (
        <div>
            <h1>{product.name}</h1>
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