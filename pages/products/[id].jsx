
import Image from "next/image";
import { ApiError } from "../../lib/api";
import getProducts, { getProduct } from "../../lib/getProducts";
import Page from "../../components/Page";
// import { useUser } from "../../hooks/user";
import AddToCart from "../../components/AddToCart";


export const getStaticPaths = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString()},
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { id } }) => {

  try{
    const product = await getProduct(id);
    return {
      props: {
        product,
        revalidate: parseInt(process.env.REVALIDATE_SECONDS) , // seconds
      },
    };
  } catch (err){
     if(err instanceof ApiError && err.status === 404){
      return {notFound: true};
    }
    throw err
  }
};

const ProductPage = ({ product }) => {
  // const user = useUser()

  return (
    <Page title={product.title}>
        <div className="flex flex-col lg:flex-row ">
          <div>
        <Image src={product.pictureUrl} alt={product?.title} width={640} height={480} />
          </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product?.description}</p>
          <span className="font-bold text-lg inline-block mt-2"> {product?.price}</span>
          {/* {user && <AddToCart productId={product.id}  />} */}
          <AddToCart productId={product.id}  />
         </div>
        </div>
    </Page>
  );
};

export default ProductPage;
