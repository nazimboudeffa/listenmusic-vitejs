import { useState, useEffect } from 'react'
import axios from 'axios';

const Search = () => {

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    useEffect(() => {
        let token = window.localStorage.getItem("token")
        setToken(token)
    }, [])

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        console.log(data)
        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id} className='flex flex-col'>
                {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
                <a href={artist.uri} className="rounded bg-black text-white">Listen</a>
            </div>
        ))
    }

    return (
        <>
        <form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)} className='border border-black rounded'/>
        <button type={"submit"} className='rounded-lg text-green-500 bg-black'>Search</button>
        </form>
        <section>
           <div className="grid grid-cols-4 gap-4">
           {renderArtists()}
           </div>
        </section>
        </>
    )
}

export default Search