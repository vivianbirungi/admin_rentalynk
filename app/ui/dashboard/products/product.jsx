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
          style={{ marginRight: 10, aspectRatio: 1, borderRadius: 10 }}
        />
      ) : (
        <Image
          className={styles.productImage}
          src={"https://www.rentalynk.com/assets/images/rentalynk_tenants.jpg"}
          width={180}
          height={200}
          alt="productImage"
          style={{ marginRight: 10, aspectRatio: 1, borderRadius: 10 }}
        />
      )}

      <div className={styles.content}>
        <div className={styles.productDetail}>
          <small style={{ textTransform: "uppercase", fontSize:12 }}>
            {productData?.pro_type}
          </small>
          <p className={styles.header} style={{ textTransform: "capitalize" }}>
            {productData?.pro_title}
          </p>
          <span className={styles.owner}>{productData?.full_name}</span>
          <span className={styles.price}>{productData?.total_units} Units</span>
        </div>
        <div>
          <p>
            {productData?.subscription_active === "Y" ? (
              <span style={{ color: "lime", fontWeight: "bold", fontSize: 13 }}>
                Active
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold", fontSize: 13 }}>
                Inactive
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Property;
