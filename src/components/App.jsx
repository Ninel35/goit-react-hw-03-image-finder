import { Component } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { getAllImages } from "api/allImages";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { MyModal } from "./Modal";


export class App extends Component {
  state = {
    images: null,
    filter: "",
    page: 1,
    isLoading: false,
    error: '',
    loadMore: true,
    largeImg: '',
    tags: '',
    isShownModal: false
  }

  componentDidMount() {
     this.getImages()
  }

  openModal = (largeImg, tags) => {
    this.setState({ isShownModal: true, largeImg, tags })
  }

  closeModal = () => {
    this.setState({ isShownModal: false, largeImg: '', tags: '' })
  }
  
  componentDidUpdate(_, prevState) {
    if (this.state.filter !== prevState.filter || prevState.page !== this.state.page ){
      this.getImages()
    } 
  }
  

  getImages = async () => {
    try {
      this.setState({ isLoading: true })
      const response = await getAllImages(this.state.filter, this.state.page);
      console.log(response)
      this.setState((prev) => {
        return {
          images: prev.images ? [...prev.images, ...response.hits] : response.hits,
           loadMore: this.state.page < Math.ceil(response.totalHits / 12 )
        }
      }
      );
  
    } catch (error) {
      this.setState({ error: error.message })
    } finally {
      this.setState({ isLoading: false })
      
    }
  };
  
  handleLoadMore = () => {
    this.setState((prev)=>({page: prev.page +1}))
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      filter: evt.target.elements.search.value
    })
  }

  render() {
    const {isLoading, error, loadMore} = this.state
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {error && <h2>{error}</h2>}
        
        <ImageGallery >
          {this.state.images && this.state.images.map((elem) => <ImageGalleryItem key={elem.id} webformatURL={elem.webformatURL} alt={elem.tags} openModal={()=> this.openModal(elem.largeImageURL, elem.tags) } />)}
        </ImageGallery>
        <MyModal modalIsOpen={this.state.isShownModal}
          closeModal={this.closeModal}
          largeImg={this.state.largeImg}
        tags={this.state.tags}/>
        {loadMore && <Button handleLoadMore={this.handleLoadMore} />}
      </>
    
    )
  }
 
};
