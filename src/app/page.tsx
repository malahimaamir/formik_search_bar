"use client";
import { useFormik } from "formik";
import { Product } from "./types";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      searchResults.forEach((product: Product) => {
        preloadImage(product.thumbnail);
        product.images.forEach((image: string) => preloadImage(image));
      });
    }
  }, [searchResults]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/search?q=${values.search}`
        );

        setSearchResults(res.data.products);
        setHasSearched(true);
        toast.success(
          `Found ${res.data.products.length} result(s) for "${values.search}"`
        );
      } catch {
        toast.error("Failed to fetch product. Try again.");
      }
    },
  });

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">
            Product Search
          </h1>

          <form onSubmit={formik.handleSubmit} className="mb-6">
            <input
              type="text"
              name="search"
              onChange={formik.handleChange}
              value={formik.values.search}
              placeholder="Search product..."
              className="border border-gray-300 p-2 rounded w-full"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          {!hasSearched && (
            <div className="text-gray-500 text-sm text-center italic">
              💡 Try searching: <span className="font-semibold">iPhone</span>,{" "}
              <span className="font-semibold">perfume</span>,{" "}
              <span className="font-semibold">laptop</span>,{" "}
              <span className="font-semibold">monitor</span>,{" "}
              <span className="font-semibold">headphones</span>...
            </div>
          )}

          {hasSearched && (
            <>
              {searchResults.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {searchResults.map((product: Product) => (
                    <li
                      key={product.id}
                      className="border rounded p-4 shadow bg-gray-50"
                    >
                      <LazyLoadImage
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-52 object-cover rounded mb-3"
                        effect="blur"
                        loading="lazy"
                      />

                      <h2 className="font-bold text-xl text-blue-700">
                        {product.title}
                      </h2>
                      <p className="text-gray-700 mb-2">
                        {product.description}
                      </p>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          <strong>Brand:</strong> {product.brand}
                        </p>
                        <p>
                          <strong>Category:</strong> {product.category}
                        </p>
                        <p>
                          <strong>Price:</strong> ${product.price}
                        </p>
                        <p>
                          <strong>Discount:</strong>{" "}
                          {product.discountPercentage}%
                        </p>
                        <p>
                          <strong>Stock Available:</strong> {product.stock}
                        </p>
                        <p>
                          <strong>Rating:</strong> ⭐ {product.rating}
                        </p>
                      </div>

                      <div className="mt-3">
                        <p className="font-semibold text-sm mb-1">Gallery:</p>
                        <div className="flex overflow-x-auto gap-2">
                          {product.images.map((img: string, index: number) => (
                            <LazyLoadImage
                              key={index}
                              src={img}
                              alt={`Image ${index + 1}`}
                              className="h-24 w-24 object-cover rounded border"
                              effect="blur"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-red-500">No products found.</p>
              )}
            </>
          )}
        </div>

        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default Home;
