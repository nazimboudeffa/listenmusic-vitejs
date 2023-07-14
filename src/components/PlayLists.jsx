import { useEffect } from "react";

const PlayLists = (playlists) => {

    useEffect(() => {
        console.log(playlists)
    }, [playlists])
    
    return (
        <>
        <section>
          <div className='text-2xl'>DZ</div>
          <div className="grid grid-cols-4 gap-4">
              {playlists? playlists.map(playList => (
                  <div key={playList.id} className='flex flex-col'>
                      {playList.images.length ? <img width={"100%"} src={playList.images[0].url} alt=""/> : <div>No Image</div>}
                      {playList.name}
                      <a href={playList.uri} className="rounded bg-black text-white">Listen</a>
                  </div>
              )) : <div>Not found</div>}
          </div>
        </section>
        </>
    );
}

export default PlayLists;