import Head from "next/dist/next-server/lib/head"
import NavBar from "./NavBar"
import Title from "./Title"

const Page = ({children, title}) => {
  return (
    <>
       <Head>
        <title>{title} -Next Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='px-6 py-4 container mx-auto'>
        <header className="w-full">
          <NavBar/>
        </header>
       <Title>
        {title}
       </Title>
       <div>
      {children}
       </div>
      </main>
    </>
  )
}

export default Page
