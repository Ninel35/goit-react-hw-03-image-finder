import { Component } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { getAllImages } from "api/allImages";
import { Loader } from "./Loader";


export class App extends Component {
  state = {
    images: null,
    filter: "",
    page: 1,
    isLoading: false,
    error: ''

  }

  componentDidMount() {
       this.getImages()
  }

  componentDidUpdate(_, prevState) {
    if (this.state.filter !== prevState.filter || prevState.page !== this.state.page) {
      this.getImages()
    }
  }

  getImages = async () => {
    try {
      this.setState({isLoading: true})
    const response = await getAllImages(this.state.filter)
    this.setState({images: response.hits})
  
} catch (error) {
  this.setState({error: error.message})
    } finally {
      this.setState({isLoading: false})
      
}

  
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      filter: evt.target.elements.search.value
    })
  }

  render() {
    const {isLoading, error} = this.state
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {error && <h2>{error}</h2>}
        
        <ImageGallery images={this.state.images} />
      </>
    
    )
  }
 
};
