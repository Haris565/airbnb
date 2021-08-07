import ReactMapGL from 'react-map-gl';
import { Marker, Popup } from 'react-map-gl';
import {useState, useEffect} from 'react'
import { getCenter } from 'geolib';
import { SearchIcon, HomeIcon} from '@heroicons/react/solid'

function Maps({searchResult}) {

    const coordinates = searchResult.map((result)=>({
        longitude: result.long,
        latitude: result.lat
      }))


    const center = getCenter(coordinates)

    const [viewport, setviewport] = useState({
        width:"100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
    })

    const [loc, setLoc] = useState({})



    return (
        
        
        <ReactMapGL
            mapStyle="mapbox://styles/haris12345/cks1jpw3a3c2o17qo51pcxjyj"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport)=>setviewport(nextViewport)}
        >
            {searchResult.map ((result,index) => {
                return (
                    <div key={index}>
                        <Marker
                            longitude={result.long}
                            latitude={result.lat}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            {loc?.long === result.long ? (
                                <Popup
                                    onClose={()=>setLoc({})}
                                    closeOnClick={true}
                                    
                                    longitude={result.long}
                                    latitude={result.lat}
                                    
                                >
                                    {result.title}
                                </Popup>
                            ): ( null )}
                            <p role='img' aria-label='push-pin' onClick={()=>setLoc(result)}>
                                <HomeIcon className='h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 animate-bounce' />
                            </p>
                            
                   

                        </Marker>
                    </div>
                    
                )
            })}
            
        </ReactMapGL>

          
    )
}

export default Maps
