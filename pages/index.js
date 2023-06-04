import getProducts from '../lib/getProducts';
import ProductCard from '../components/ProductCard';
import Page from '../components/Page';

export const getStaticProps = async()=> {
 const products = await getProducts()

 
  return {
    props: { products},
    revalidate: parseInt(process.env.REVALIDATE_SECONDS)  // seconds,
  }
}

function HomePage({products}) {
  return (
    <Page title='Next Shop'>
       <ul className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
        {products.map(product=> (
          <li key={product.id
          }>
           <ProductCard product={product} />
          </li>
        ))}
       </ul>
    </Page>
  )
}


export default HomePage
