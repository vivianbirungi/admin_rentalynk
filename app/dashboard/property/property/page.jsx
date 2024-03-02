"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import api from "../../../lib/properties";
import useRLStore from "../../../lib/store";
import { getImages } from "../../../lib/utilties";
import styles from "../../../ui/dashboard/products/singleProduct/singleProduct.module.css";

const SingleProductPage = () => {
  const router = useRouter();

  const activeProperty = useRLStore((state) => state.activeProperty);
  const images = getImages(activeProperty?.images, activeProperty?.property_id);

  const deleteProperty = async () => {
    try {
      const results = await api.deletePropertyApi(activeProperty?.property_id);
      router.push("/dashboard/property");
      alert("Property has been deleted");
    } catch (error) {
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {images.map((image) => (
          <div className={styles.mediaElement}>
            {image ? (
              <Image
                src={image}
                height={250}
                width={250}
                style={{ marginRight: 10, aspectRatio: 1, borderRadius: 10 }}
              />
            ) : (
              <Image
                src={
                  "https://www.rentalynk.com/assets/images/rentalynk_tenants.jpg"
                }
                height={150}
                width={150}
              />
            )}
          </div>
        ))}
      </div>
      <br />

      <div className="section prodDetails">
        <div>
          <h2>{activeProperty?.pro_title}</h2>
          <p>{`${activeProperty?.pro_type} in ${activeProperty?.location_name}`}</p>
        </div>

        <div>
          <button className="btnDelete" onClick={deleteProperty}>
            Delete
          </button>
        </div>
      </div>

      <div className="section section_row stats">
        <div>
          {activeProperty?.subscription_active ? (
            <AiFillCheckCircle color="teal" />
          ) : (
            <AiFillCloseCircle color="red" size={30} />
          )}
          <small>Subscription Active</small>
        </div>

        <div>
          {activeProperty?.multiple_units ? (
            <AiFillCheckCircle color="teal" />
          ) : (
            <AiFillCloseCircle color="red" />
          )}
          <small>Has Multiple Units</small>
        </div>

        <div>
          {activeProperty?.isRentedOut ? (
            <AiFillCheckCircle color="teal" />
          ) : (
            <AiFillCloseCircle color="red" />
          )}
          <small>Property Rented Out</small>
        </div>

        <div>
          {activeProperty?.deleted ? (
            <AiFillCheckCircle color="red" />
          ) : (
            <AiFillCloseCircle color="teal" />
          )}
          <small>Property Unlisted</small>
        </div>
      </div>

      <div className="section">
        <h4>Landlord Details</h4>
        <br />
        <p>{activeProperty?.full_name}</p>
        <small>
          Email :{" "}
          <b>{` ${activeProperty?.country_code}${activeProperty?.phone}`}</b>
        </small>
        <br />
        <small>
          Phone: <b>{activeProperty?.email}</b>
        </small>
      </div>

      <div className="section">
        <h4>Description</h4>
        <br />
        <p>{activeProperty?.description}</p>
      </div>

      <div className="section">
        <h4>Amenities</h4>
        <br />
        <div className="section_row">
          {activeProperty?.amenities.split(",").map((amenity) => (
            <span>
              <small style={{ color: "teal" }}>{amenity}</small>
            </span>
          ))}
        </div>
      </div>

      <div className="section">
        <h4>Prices and Units</h4>
        <br />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            flexDirection: "row",
          }}
        >
          {activeProperty?.units.map((unit) => (
            <div className="unit_price" style={{ flex: 1 }}>
              <small>{unit?.unit_name}</small>
              <br />

              <small style={{ color: "teal" }}>
                <b>{`${unit?.rent_fees} ${unit?.currency}`}</b>
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
