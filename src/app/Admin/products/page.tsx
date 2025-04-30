"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";



// Update the Product interface to reflect the correct type for dimensions
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  tags: string[];
  weight?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };  // Updated dimensions type
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: string[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>(""); // <-- Add this line

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        const allProducts = res.data.products;
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 8);
        setProducts(randomProducts);
        const randomIndex = Math.floor(Math.random() * randomProducts.length);
        setSelectedProduct(randomProducts[randomIndex]);
        setSelectedImage(randomProducts[randomIndex].images[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!selectedProduct) {
    return (
      <div className="text-center mt-20 text-blue-800">Loading products...</div>
    );
  }

  return (
    <div className="bg-white text-blue-900 font-sans">
      {/* Page Header */}
      <header className="bg-blue-700 text-white py-4 mb-8 shadow">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Products</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 px-4">
        {/* Sidebar Thumbnails */}
        <div className="col-span-2 space-y-4 overflow-y-auto max-h-[500px]">
          {selectedProduct.images.map((img, i) => (
            <div
              key={i}
              className="border rounded-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Main Product Image */}
        <div className="col-span-5">
          <img
            src={selectedImage}
            alt="Main Product"
            className="rounded-lg w-full h-auto"
          />
        </div>

        {/* Product Info */}
        <div className="col-span-5 space-y-4">
          <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
          <p className="text-xl font-semibold text-blue-700">
            ${selectedProduct.price.toFixed(2)}
          </p>
          <div className="text-sm">Color: Default</div>

          <div className="flex gap-2 mt-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`border px-3 py-1 rounded ${
                  selectedSize === size
                    ? "bg-blue-700 text-white"
                    : "border-blue-700 hover:bg-blue-100"
                }`}
                onClick={() => setSelectedSize(size)} // <-- Use setSelectedSize
              >
                {size}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
              Add to Bag
            </button>
          </div>

          {/* Product Details Section */}
          <div className="mt-8 border-t pt-4 space-y-1 text-sm text-gray-700">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">
              Product Details
            </h3>
            <p>
              <strong>Title:</strong> {selectedProduct.title}
            </p>
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Discount:</strong> {selectedProduct.discountPercentage}%
            </p>
            <p>
              <strong>Rating:</strong> {selectedProduct.rating}
            </p>
            <p>
              <strong>Stock:</strong> {selectedProduct.stock}
            </p>
            <p>
              <strong>Tags:</strong> {selectedProduct.tags?.join(", ")}
            </p>
            <p>
              <strong>Brand:</strong> {selectedProduct.brand}
            </p>
            <p>
              <strong>Weight:</strong> {selectedProduct.weight} kg
            </p>
            {/* Fixed dimensions */}
            {selectedProduct.dimensions && (
              <p>
                <strong>Dimensions:</strong> {selectedProduct.dimensions.width} x{" "}
                {selectedProduct.dimensions.height} x{" "}
                {selectedProduct.dimensions.depth} cm
              </p>
            )}
            <p>
              <strong>Warranty:</strong> {selectedProduct.warrantyInformation}
            </p>
            <p>
              <strong>Shipping:</strong> {selectedProduct.shippingInformation}
            </p>
            <p>
              <strong>Availability:</strong> {selectedProduct.availabilityStatus}
            </p>
            <p>
              <strong>Reviews:</strong> {selectedProduct.reviews?.length} total
            </p>
          </div>
        </div>
      </div>

      {/* Other Products */}
      <div className="mt-12 max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-bold mb-4">Other Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 hover:shadow-lg cursor-pointer"
              onClick={() => {
                setSelectedProduct(p);
                setSelectedImage(p.images[0]);
                setSelectedSize(""); // <-- Reset size when selecting new product
              }}
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="rounded h-32 w-full object-cover mb-2"
              />
              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-sm text-blue-700">${p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
