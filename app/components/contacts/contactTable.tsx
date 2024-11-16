import React from 'react'
import { getContacts } from '../lib/data'
import { formatDate } from '../lib/utils'
import { EditButtons, DeleteButtons } from '../../components/contacts/buttons';



const contactTable = async ({
  query,currentPage
}: {
  query: string;
  currentPage: number;
}
) => {
  const contacts = await getContacts(query,currentPage);

  return (
    <div>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-sm text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className='py-3 px-6'>#</th>
            <th className='py-3 px-6'>Nama</th>
            <th className='py-3 px-6'>Phone Number</th>
            <th className='py-3 px-6'>Created At</th>
            <th className='py-3 px-6'>Updated At</th>
            <th className='py-3 px-6 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
         {contacts.map((contact, index)=> (
            <tr key={contact.Id} className='bg-white border-b'>
              <td className='py-3 px-6'>{index+1}</td>
              <td className='py-3 px-6'>{contact.Name}</td>
              <td className='py-3 px-6'>{contact.Phone}</td>
              <td className='py-3 px-6'>{formatDate(contact.CreatedAt.toString() )}</td>
              <td className='py-3 px-6'>{formatDate(contact.UpdatedAt.toString() )}</td>
              <td className='flex justify-center gap-1 py-3'>
                <EditButtons id={contact.Id}/>
                <DeleteButtons id={contact.Id}/>
              </td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
  )
}

export default contactTable