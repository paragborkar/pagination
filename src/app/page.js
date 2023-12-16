import { connectToDatabase } from "@/utils/connectMongo";
import Link from "next/link";

async function getData(perPage, page){
    
    try {
        const client = await connectToDatabase();
        const db= client.db("test");
        const items = await db.collection("languages").find({}).skip(perPage * (page -1)).limit(perPage).toArray();
        const itemCount= await db.collection("languages").countDocuments();
        const response = {items , itemCount};
        return response;
    } catch (error) {
        throw new Error("Failed To Fetch Data. Please Try Again Later");
    }
}

const Home = async ({searchParams}) => {

    

    let page= parseInt(searchParams.page, 10);
    page = !page || page < 1 ? 1 : page;
    const perPage = 8;

    const data = await getData(perPage, page);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const totalPage = Math.ceil(data.itemCount/ perPage);

  return (
    <div className='container mx-auto mt-8'>
        <h1 className="text-white h-[10vh] text-center text-4xl mx-auto"> Pagination <span className="text-yellow-500">App</span></h1>
      <ul className="grid grid-cols-4 gap-4 text-center">
            {
                data.items.map((item)=>(
                    <li key={item.id}  className="bg-yellow-500 rounded-md p-4 text-black">
                        {item.name}
                    </li>
                ))
            }
      </ul>
     <div className="flex justify-center items-center mt-[10vh]">
     <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
     { page===1 ? (
        <div className="opacity-60" aria-disabled="true" >Previous</div>
      ):(
        <Link href={`?page=${prevPage}`} aria-label="Previous Page" >Previous</Link>
      )}
     </div>

        <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4 mx-4">
        { page===totalPage ? (
        <div className="opacity-60" aria-disabled="true" >Next</div>
      ):(
        <Link href={`?page=${nextPage}`} aria-label="Next Page" >Next</Link>
      )}

        </div>

     </div>
    </div>
  )
}

export default Home
