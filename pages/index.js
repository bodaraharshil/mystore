import Link from "next/link";

const Home = (props) => {
  const ProductList = Object.values(props.products).map((item,index) => {
    return(
      <div className="row">
        <div className="rootcard" key={index}>
          <div className="card pcard">
            <div className="card-image">
              <img src={item.mediaurl}/>
              <span className="card-title">{item.name}</span>
            </div>
            <div className="card-action">
              <a href="#">₹ {item.price}</a>
            </div>
            <div className="card-content">
              <Link href={'/product/[id]'} as={`/product/${item._id}`}><a>View Product</a></Link>
            </div>
          </div>
        </div>
      </div>
    )
  })
  
  return(
    <div className="rootcard">
      {ProductList}
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/products");    
  const data = await res.json();
  return {
    props: {
      products:data.data,
    }, 
  }
}

export default Home