
import { ImageGalleryItem } from "components/ImageGalleryItem";

export const ImageGallery = ({images}) => {
    
        return (
            <ul className="gallery">
                {images && images.map((elem) => <ImageGalleryItem key={elem.id} webformatURL={elem.webformatURL} largeImageURL={elem.largeImageURL} />)}
            </ul>
        )
    
}