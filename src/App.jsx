import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import NavBar from './components/NavBar';

function App() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || "http://127.0.0.1:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [playListFR, setPlayListFR] = useState([])
  const [playListDZ, setPlayListDZ] = useState([])

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      // getToken()


      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

      if (token) {
          getPlayList(token, "FR").then(playList => setPlayListFR(playList))
          getPlayList(token, "DZ").then(playList => setPlayListDZ(playList))
      }

  }, [])

  const getPlayList = async (token, country) => {
        const {data} = await axios.get("https://api.spotify.com/v1/browse/featured-playlists?country="+country, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return data.playlists.items
    }

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

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
          <header className='mx-auto'>

              <h1>Spotify React</h1>
              {!token ?
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} className='h-10 w-32 rounded-lg hover:text-black hover:bg-green-500 bg-black text-green-500 mt-5'>Login to Spotify</a>
                  : <button onClick={logout} className='h-10 w-32 rounded-lg hover:text-black hover:bg-green-500 bg-black text-green-500'>Logout</button>}

              {token ?
                  <form onSubmit={searchArtists}>
                      <input type="text" onChange={e => setSearchKey(e.target.value)} className='border border-black rounded'/>
                      <button type={"submit"} className='rounded-lg text-green-500 bg-black'>Search</button>
                  </form>

                  : <h2>Login before searching</h2>
              }

          </header>
          <section>
            <div className="grid grid-cols-4 gap-4">
              {renderArtists()}
            </div>
          </section>
          <section>
          <div className='text-2xl'>FRANCE</div>
            <div className="grid grid-cols-4 gap-4">
                {playListFR.map(playList => (
                    <div key={playList.id} className='flex flex-col'>
                        {playList.images.length ? <img width={"100%"} src={playList.images[0].url} alt=""/> : <div>No Image</div>}
                        {playList.name}
                        <a href={playList.uri} className="rounded bg-black text-white">Listen</a>
                    </div>
                ))}
            </div>
          </section>
          <section>
            <div className='text-2xl'>ALGERIA</div>
            <div className="grid grid-cols-4 gap-4">
                {playListDZ.map(playList => (
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

export default App
