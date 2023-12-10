import { Component } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { getAllImages } from "api/allImages";


export class App extends Component {
  state = {
    images: null,
    filter: ""
  }

  componentDidMount() {
       this.getImages()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.filter !== prevState.filter) {
      this.getImages()
    }
  }

  getImages = async () => {
    const response = await getAllImages(this.state.filter)
    this.setState({
      images: response.hits
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      filter: evt.target.elements.search.value
    })
  }

  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
      </>
    
    )
  }
 
};
