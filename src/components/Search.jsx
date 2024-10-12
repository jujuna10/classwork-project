import React, { useEffect, useState } from 'react';
import search from '../assets/glass.png';

export default function Search() {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState("")

    const handleSearchToggle = () => {
        setIsVisible(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const filter = data.filter(item => 
        item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.description.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.price.toString().includes(inputValue)
    )

    const api = "https://fakestoreapi.com/products"
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api)
            const result = await response.json()
            setData(result);
        }
        fetchData()
    }, [])

    return (
        <div className='relative'>
            <img src={search} onClick={handleSearchToggle} alt="search" className='w-[50px] absolute left-[90%] cursor-pointer ' />
            {isVisible && (
                <div className="bg-blue-700 p-[20px]">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-[20px] items-start'>
                        <input type="text" name="name" value={inputValue} placeholder='film name' onChange={handleChange} className='bg-blue-700 text-white border border-gray-300 rounded-md p-2' />
                    </form>
                </div>
            )}
            <div className='grid grid-cols-4 gap-y-[50px]'>
                {filter.length > 0 ? (
                    filter.map((item) => (
                        <div key={item.id} className='bg-[rgb(175,221,230)] w-[390px] m-[20px] rounded-[20px] p-[20px] flex flex-col justify-between gap-[20px]'>
                            <div>
                                <h3 className='font-bold'>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>{item.price} ლ</p>
                            </div>
                            <button className='duration-900 hover:bg-black hover:text-white w-[100px] hover:rounded-[10px]'>Add to cart</button>
                        </div>
                    ))
                ) : (
                    <div className='bg-[rgb(175,221,230)] w-[250px] m-[20px] rounded-[20px] p-[20px] flex flex-col gap-[20px]'>
                        {inputValue && <p>not found</p>}
                    </div>
                )}
            </div>
        </div>
    )
}
