import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Markerposition from "./Markerposition"
import "leaflet/dist/leaflet.css";
import arrow from "./images/icon-arrow.svg" ;
import background from "./images/pattern-bg-desktop.png" ;


function App() {
  const [address, setAddress] = useState({
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      city: "Mountain View",
      lat: 37.38605,
      lng: -122.08385,
      postalCode: "94035",
      timezone: "-07:00",
      geonameId: 5375480,
    },
    domains: [
      "21vek-dev.by",
      "abbsmartsocieties.com",
      "afroonet-fastjet.co.zw",
      "amadhal.com",
      "centralrealtiesltd.com",
    ],
    as: { asn: 15169, name: "GOOGLE", route: "8.8.8.0/24", domain: "https://about.google/intl/en/", type: "Content" },
    isp: "Google LLC",
  });
  const[ipAddress, setIpAddress] = useState("")
  const checkIpAddress =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
const checkDomain =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

  useEffect(()=>{
    try{
      const getInitialData = async()=>{
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=192.212.174.101`)
        

        const data = await res.json()
        setAddress(data)
        console.log("address" + address)
        console.log("data"+data)

      }

      getInitialData()
    }    
    catch(error){
      console.trace(error)
    }
    
  },[])

  async function getEnteredAddress(){
      const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&${checkIpAddress.test(ipAddress) ? `ipAddress=${ipAddress}`: checkDomain.test(ipAddress) ?` domain=${ipAddress}` : " "}`)

        const data = await res.json()
        setAddress(data)
  }

  function handleSubmit(e){
    e.preventDefault()
    getEnteredAddress()
    setIpAddress("")
  }

  return (
    <>
      <section>
        <div class="absolute -z-10">
          <img src={background} alt="" className="w-full h-80 object-cover" />
        </div>
        <article className="p-8">
          <h1 className="text-2xl lg:text-3xl text-center text-white font-bold mb-8">IP Address Tracker</h1>

          <form onSubmit= {handleSubmit} autoComplete="off" className="flex justify-center max-w-xl mx-auto">
            <input type="text" name="ipaddress" id="ipaddress" placeholder="Search for any IP Address or domain" required
            className="py-2 px-4 rounded-l-lg w-full"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value) }/>
            
            <button type="submit"  className="bg-black py-3.5 px-4 hover:opacity-60 rounded-r-lg">
              <img src={arrow} alt=""/>
            </button>
          </form>
        </article>

        {address && <>
          <article className="bg-white rounded-lg shadow p-8 mz-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl xl:mx-auto text-center md:text-left lg:-mb-16 relative"
        style={{zIndex:10000}}>

          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Ip Address</h2>

            <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">{address.ip}</p>
          </div>

          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Location</h2>

            <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">{address.location.city},{address.location.region}</p>
          </div>

          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">TimeZone</h2>

            <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl"> UTC {address.location.timezone}</p>
          </div>

          <div className="">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">ISP</h2>

            <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">{address.isp}</p>
          </div>
        </article>
        </>
        }

        <MapContainer
                  center={[address.location.lat, address.location.lng]} 
                      zoom={13} 
                      scrollWheelZoom={true}
                      style={{height:"700px", width: "100vw" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markerposition address={address} />
        </MapContainer>
      </section>
    </>
  );
}
export default App;
