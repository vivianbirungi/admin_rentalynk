import Image from "next/image";
import styles from "./products.module.css";
import { getImages } from "../../../lib/utilties";
import useRLStore from "../../../lib/store";

const Property = ({ productData }) => {
  const setActiveProperty = useRLStore((state) => state.setActiveProperty);
  const images = getImages(productData?.images, productData?.property_id);

  return (
    <div
      className={styles.propertyContainer}
      onClick={() => {
        setActiveProperty(productData.property_id);
      }}
    >
      {images.length > 0 ? (
        <Image
          className={styles.productImage}
          src={images[0]}
          width={180}
          height={200}
          alt="productImage"
          style={{ marginRight: 10, aspectRatio: 1, borderRadius: 5 }}
        />
      ) : (
        <Image
          className={styles.productImage}
          src={"https://www.rentalynk.com/assets/images/rentalynk_tenants.jpg"}
          width={180}
          height={200}
          alt="productImage"
          style={{ marginRight: 10, aspectRatio: 1, borderRadius: 5 }}
        />
      )}

      <div className={styles.content}>
        <div className={styles.productDetail}>
          <small>{productData?.pro_type}</small>
          <p className={styles.header}>{productData?.pro_title}</p>
          <small className={styles.price}>
            {productData?.total_units} Units
          </small>
          <br />
          <small className={styles.owner}>By {productData?.full_name}</small>
        </div>
        <div>
          <p>
            {productData?.subscription_active === "Y" ? (
              <small>Active</small>
            ) : (
              <small>Inactive</small>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Property;
