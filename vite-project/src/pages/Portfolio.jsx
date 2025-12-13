import { useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import styled from 'styled-components';
import Banner from '../components/banners/Banner';
import peinture from '../assets/images/peinture.jpg';
import banc2 from '../assets/images/banc2.jpg';
import pot from '../assets/images/pot.jpg';

const PortfolioContainer = styled.div`
  min-height: 70vh;
  padding: 4rem 2rem;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const GalleryGrid = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    height: 350px;
  }
`;

const ModalCarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ModalImageItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalImage = styled.img`
  width: 100%;
  max-width: 1000px;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
`;

// Exemple d'images - vous pouvez remplacer ces imports par vos propres photos
// Ajoutez plus d'images pour avoir 10-15 photos visibles
const portfolioImages = [
  { id: 1, src: peinture, alt: 'Peinture' },
  { id: 2, src: banc2, alt: 'Banc' },
  { id: 3, src: pot, alt: 'Pot' },
  { id: 4, src: peinture, alt: 'Peinture 2' },
  { id: 5, src: banc2, alt: 'Banc 2' },
  { id: 6, src: pot, alt: 'Pot 2' },
  { id: 7, src: peinture, alt: 'Peinture 3' },
  { id: 8, src: banc2, alt: 'Banc 3' },
  { id: 9, src: pot, alt: 'Pot 3' },
  { id: 10, src: peinture, alt: 'Peinture 4' },
  { id: 11, src: banc2, alt: 'Banc 4' },
  { id: 12, src: pot, alt: 'Pot 4' },
  { id: 13, src: peinture, alt: 'Peinture 5' },
  { id: 14, src: banc2, alt: 'Banc 5' },
  { id: 15, src: pot, alt: 'Pot 5' },
  // Ajoutez plus d'images ici
];

const itemTemplate = (image) => {
  return (
    <ModalImageItem>
      <ModalImage src={image.src} alt={image.alt} />
    </ModalImageItem>
  );
};

function Portfolio() {
  const [visible, setVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [carouselPage, setCarouselPage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setCarouselPage(index);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handlePageChange = (e) => {
    setCarouselPage(e.page);
  };

  return (
    <>
      <Banner title="Portfolio" />
      <PortfolioContainer>
        <GalleryGrid>
          {portfolioImages.map((image, index) => (
            <GalleryImage
              key={image.id}
              src={image.src}
              alt={image.alt}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </GalleryGrid>
      </PortfolioContainer>

      <Dialog
        visible={visible}
        onHide={handleClose}
        style={{ width: '95vw', maxWidth: '1200px' }}
        header="Portfolio"
        modal
        className="portfolio-dialog"
      >
        <ModalCarouselContainer>
          <Carousel
            value={portfolioImages}
            numVisible={1}
            numScroll={1}
            itemTemplate={itemTemplate}
            circular
            showIndicators
            showNavigators
            page={carouselPage}
            onPageChange={handlePageChange}
          />
        </ModalCarouselContainer>
      </Dialog>
    </>
  );
}

export default Portfolio;
