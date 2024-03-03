"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useRLStore from "../../lib/store";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Product from "../../ui/dashboard/products/product";
import styles from "../../ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [isUserSearching, setUserSearching] = useState(false);
  const start = (Number(currentPage) - 1) * 100;
  const end = start + 100;
  const { properties, getProperties, setActiveProperty } = useRLStore(
    (state) => state
  );

  const entries = Array.isArray(properties) // Assuming "type" can also be "property"
    ? isUserSearching
      ? searchResults.slice(start, end)
      : properties.slice(start, end)
    : [];
  // Array.isArray(properties) ? properties.slice(start, end) : [];

  const handlePagination = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleViewProperty = (id) => {
    setActiveProperty(id);
    router.push("/dashboard/property/property");
  };

  const handleSearch = (searchQuery) => {
    // Filter the data based on the search query
    if (searchQuery !== "") setUserSearching(true);

    const filteredResults = properties?.filter(
      (item) =>
        item.pro_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." onSearch={handleSearch} />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <div className={styles.properties}>
        {entries?.map((property, index) => (
          <div
            key={index}
            className={styles.single}
            onClick={() => handleViewProperty(property.property_id)}
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
