import React, { Suspense } from 'react'
import ContactTable from '../components/contacts/contactTable'
import Search from '../components/contacts/search'
import Button from '../components/contacts/buttons'
import { getContactPages } from '../components/lib/data'
import Pagination from '../components/contacts/Pagination'
import { TableSkeleton } from '../components/contacts/skeleton'



const page = async ({searchParams} : {searchParams? : {query?: string ; page?: string}}) => {
  
  const query = searchParams?.query ||"" 
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await getContactPages(query);

  return (
    <div className='max-w-screen-lg mx-auto mt-5'>
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <Button />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}

export default page