import {Component} from "react" 
import "./index.css" 

class Home extends Component{ 
    state = {
          userInput:"inthandham",
          setTracks:[]
        };
       

      componentDidMount(){
        this.getTracks()
      } 


      getTracks=async ()=>{ 
        const {userInput}=this.state 
        let data = await fetch(`https://v1.nocodeapi.com/deepthi11priya/spotify/EaBHsoOrjbptxBPe/search?q=${userInput}&type=track`) 
        console.log(data)
        let response = await data.json() 
        console.log(response)
        let tracksData = await response.tracks.items 
        console.log(tracksData)
        this.setState({setTracks:tracksData})

      }  

      onChangeInput=(event)=>{  
        const inputValue = event.target.value 
        this.setState({userInput:inputValue})


      } 


      onSubmitSong = async(event)=>{ 
        event.preventDefault() 
        
        this.getTracks()

      }
    
      
    
      render() {
        const {setTracks} = this.state;
        console.log(setTracks)
        return (
          <div style={{ textAlign: "center", padding: "20px" }} className="bg-container">
            
            <nav className="navbar navbar-expand-lg "> 
              
            <div className="container-fluid bg-nav-styling">
              <form className="d-flex " role="search" onSubmit={this.onSubmitSong}>
              <div>
            <img src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1744877462/WhatsApp_Image_2025-04-17_at_13.38.18_6a98adb5_gqmhnz.jpg"  className="logo-styling" alt="logo" />
            </div>
                  <input className="form-control me-2 search-input" type="search" placeholder="Search for songs or artists..." aria-label="Search" onChange={this.onChangeInput} />
                  <button className="btn btn-outline-success search-btn" type="submit">Search</button>
                 </form>
               </div>
               
              </nav>
            <div className="row songs-container m-5 "> 
              {setTracks.map((each) => {
                return ( 
                  <div className="col py-2 " key={each.album.id} >
                  <div className="card" style={{ width: "18rem"}}   >
                    <img src={each.album.images[0].url} className="rounded" alt="song-image" />
                   <div className="card-body">
                   <h5 className="card-title">{each.name}</h5>
                   <p className="card-text">Artist: {each.artists[0].name}</p>
                   <audio src={each.preview_url} controls className="w-100"></audio>
                   </div>
                    </div>
                    </div>
                  
                )
                
              })
            }
              
            </div> 
           
          
          </div>
        );
      }

    }



export default Home  
