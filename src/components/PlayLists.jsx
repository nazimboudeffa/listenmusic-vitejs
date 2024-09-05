import { useState, useEffect } from "react";
import axios from 'axios'

const PlayLists = () => {

    const [playLists, setPlayLists] = useState([])
    const [token, setToken] = useState("")
  
    useEffect(() => {
      let token = window.localStorage.getItem("token")
      setToken(token)
      if (token) {
        getPlayLists(token, "fr_FR").then(playLists => setPlayLists(playLists))
      }
    }, [])
  
  
    const getPlayLists = async (token, country) => {
        const {data} = await axios.get("https://api.spotify.com/v1/browse/featured-playlists?locale="+country, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return data.playlists.items
    }
    
    return (
        <>
        <section>
          <h1>Featured Playlists</h1>
          <div className="grid grid-cols-4 gap-4">
              {playLists.map(playList => (
                  <div key={playList.id} className='flex flex-col'>
                      {playList.images.length ? <img width={"100%"} src={playList.images[0].url} alt=""/> : <div>No Image</div>}
                      {playList.name}
                      <a href={playList.external_urls.spotify} className="rounded bg-black text-white">Click to listen</a>
                  </div>
              ))}
          </div>
        </section>
        </>
    );
}

export default PlayLists;