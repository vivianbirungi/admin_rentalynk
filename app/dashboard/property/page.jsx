"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useRLStore from "../../lib/store";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Product from "../../ui/dashboard/products/product";
import styles from "../../ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const start = (Number(currentPage) - 1) * 100;

  const end = start + 100;

  const { properties, getProperties } = useRLStore((state) => state);

  const entries = Array.isArray(properties) ? properties.slice(start, end) : [];

  const handlePagination = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    getProperties();
  }, []);
  const handleViewUser = (id) => {
    setActiveProperty(id);
    router.push("/dashboard/property/property");
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      {/* {JSON.stringify(entries)} */}
      <div className={styles.properties}>
        {entries.map((property) => (
          <div
            className={styles.single}
            onClick={() => handleViewUser(property.property_id)}
          >
            <Product productData={property} />
          </div>
        ))}
      </div>

      <Pagination
        arrayLength={properties.data?.length}
        currentPage={currentPage}
        handleClick={handlePagination}
        perpage={100}
      />
    </div>
  );
};

export default Products;
