import { format } from "date-fns";
import { useRouter } from "next/dist/client/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard";
import Maps from "../components/Maps";

function Search({searchResult}) {
    console.log(searchResult)
    const router = useRouter();
    const {location , startDate , endDate, guest} = router.query;
   

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${guest}`} />
            <main className='flex'>
                <section className='flex-grow pt-14 px-6'>
                    <p className='text:sm'>300+  stays - {range} - for {guest} number of guest</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                        <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                            Cancellation Flexibility
                        </p>
                        <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                           Type of place
                        </p>
                        <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                            Price
                        </p>
                        <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                            Rooms and beds
                        </p>
                    </div>

                    {
                        searchResult?.map(( {img, location,title, description, star, price, total}, index )=>(
                        <InfoCard 
                            key={index}
                            img={img} 
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}

                         />))
                    }
                </section>

                <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                    <Maps searchResult={searchResult} />
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps () {
    const searchResult = await fetch("https://links.papareact.com/isz").then(res => res.json())

    return {
        props: {
            searchResult
        }
    }
}
