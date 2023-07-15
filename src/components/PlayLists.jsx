import { useState, useEffect } from "react";
import axios from 'axios'

const PlayLists = () => {

    const [playLists, setPlayLists] = useState([])
    const [token, setToken] = useState("")
  
    useEffect(() => {
      let token = window.localStorage.getItem("token")
      setToken(token)
      if (token) {
        getPlayLists(token, "DZ").then(playLists => setPlayLists(playLists))
      }
    }, [])
  
  
    const getPlayLists = async (token, country) => {
        const {data} = await axios.get("https://api.spotify.com/v1/browse/featured-playlists?country="+country, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return data.playlists.items
    }
  
    const [selectedItem, setSelectedItem] = useState("DZ")
  
    const handleChangeCountry = (e) => {
      setSelectedItem(e.target.value)
      getPlayLists(token, e.target.value).then(playLists => setPlayLists(playLists))
    }
    
    return (
        <>
        <section>
          <select className="w-full border border-gray-300 rounded px-2 py-1 mb-5"  name="country" value={selectedItem} onChange={(e)=>handleChangeCountry(e)}>
                <option value="DZ">Algeria</option>
                <option value="FR">France</option>
          </select>
          <div className="grid grid-cols-4 gap-4">
              {playLists.map(playList => (
                  <div key={playList.id} className='flex flex-col'>
                      {playList.images.length ? <img width={"100%"} src={playList.images[0].url} alt=""/> : <div>No Image</div>}
                      {playList.name}
                      <a href={playList.uri} className="rounded bg-black text-white">Listen</a>
                  </div>
              ))}
          </div>
        </section>
        </>
    );
}

export default PlayLists;