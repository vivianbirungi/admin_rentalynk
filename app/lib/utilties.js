const URL = 'https://api.rentalynk.com/properties';

export const getImages = (image, property_id) => {
  if (image?.length > 0) {
    const images = image?.split(',');
    return images.map((img) => {
      return `${URL}/${property_id}/${img}`;
    });
  } else {
    return [];
  }
};
