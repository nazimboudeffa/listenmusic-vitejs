import { useState, useEffect } from "react";
import axios from 'axios'

const HitParade = () => {
    const [token, setToken] = useState("")
    const [playLists, setPlayLists] = useState([])
    const [songs, setSongs] = useState([])
    const [selectedItemCountry, setSelectedItemCountry] = useState("default")
    const [selectedItemPlayList, setSelectedItemPlayList] = useState("default")

    useEffect(() => {
        let token = window.localStorage.getItem("token")
        setToken(token)
    }, [])

    const getPlayLists = async (token, country) => {
        const {data} = await axios.get("https://api.spotify.com/v1/browse/featured-playlists?country="+country, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data.playlists.items)
        return data.playlists.items
    }

    const getSongsFromPlayList = async (token, playListId) => {
        const {data} = await axios.get("https://api.spotify.com/v1/playlists/"+playListId+"/tracks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return data.items
    }

    const handleChangeCountry = (e) => {
        setSelectedItemCountry(e.target.value)
        getPlayLists(token, e.target.value).then(playLists => setPlayLists(playLists))
      }

    const handleChangePlayList = (e) => {
        setSelectedItemPlayList(e.target.value)
        getSongsFromPlayList(token, e.target.value).then(songs => {let sortedSongs = songs.sort((a, b) => b.track.popularity - a.track.popularity); setSongs(sortedSongs)})
    }

    return (
        <section>
            <select className="w-full border border-gray-300 rounded px-2 py-1 mb-5"  name="country" value={selectedItemCountry} onChange={(e)=>handleChangeCountry(e)}>
                <option value="default">Select country</option>
                <option value="DZ">Algeria</option>
                <option value="FR">France</option>
            </select>
            <select className="w-full border border-gray-300 rounded px-2 py-1 mb-5"  name="order" value={selectedItemPlayList} onChange={(e)=>handleChangePlayList(e)}>
                <option value="default">Select playlist</option>
                {playLists.map(playList => (
                    <option key={playList.id} value={playList.id}>{playList.name}</option>
                ))}
            </select>
            <div>
                <table className="text-sm sm:w-7/12 w-full max-w mx-auto">
                    <thead className="text-xs text-gray-700 uppercase border-b">
                        <tr>
                            <th className="px-1 py-3 w-0 font-medium">Album</th>
                            <th className="px-1 py-3 w-0 font-medium">Name</th>
                            <th className="px-1 py-3 w-0 font-medium">Popularity</th>
                            <th className="px-1 py-3 w-0 font-medium">Listen</th>
                        </tr>
                    </thead>
                    <tbody>
                {songs.map(song => (
                    <tr key={song.track.id}>
                        <td className="px-6 py-4">{song.track.album.name}</td>
                        <td className="px-6 py-4">{song.track.name}</td>
                        <td className="px-6 py-4">{song.track.popularity}</td>
                        <td className="px-6 py-4"><a href={song.track.uri}>Listen</a></td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HitParade;
