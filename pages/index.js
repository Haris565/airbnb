import Head from 'next/head'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import LargeCard from '../Components/LargeCard'
import MediumCard from '../Components/MediumCard'
import SmallCard from '../Components/SmallCard'

export default function Home({exploreData, cardData}) {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='font-semibold pb-5 text-4xl' >Explore Nearby</h2>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map((item, index)=>{
              return(
              <SmallCard key={index} img={item.img} location={item.location} distance={item.distance} />
            )})}
          </div>
      
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-4 overflow-scroll scrollbar-hide p3 -ml-3'>
              {cardData?.map((item, index)=>{
                return (
                  <MediumCard key={index} image={item.img} title={item.title} />
                )
              })}
          </div>
   

        </section>

        <LargeCard
          image='https://links.papareact.com/4cj'
          title='The greatest outdoors'
          description="The greaters place to live"
          buttonText='Get Inspired'
        />
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps(){

    const exploreData = await fetch ('https://links.papareact.com/pyp').
    then(
      (res)=> res.json()
  
    );
  
    const cardData = await fetch ('https://links.papareact.com/zp1').
    then(
      (res)=> res.json()
  
    );



  

  return {
    props: {
      exploreData,
      cardData,
    },
  }
}