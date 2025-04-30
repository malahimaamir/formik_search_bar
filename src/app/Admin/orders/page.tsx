"use client";
import React, { useState } from 'react';

const initialOrders = [
  {
    id: 1,
    status: 'Dispatched',
    deliveryDate: 'Tomorrow',
    time: '7am - 7pm',
    products: ['Camera', 'Headphones']
  },
  {
    id: 2,
    status: 'Delivered on 23 June',
    products: ['Huawei P20 Pro 128GB Smartphone', 'Microsoft Keyboard Cover for Surface Go']
  },
  {
    id: 3,
    status: 'Delivered on 15 December, 2016',
    products: ['Bosch Serie 2 Electric Single Oven']
  }
];

const Button = ({ children, onClick, variant }: { children: React.ReactNode, onClick?: () => void, variant?: string }) => {
  const baseStyle = "px-4 py-2 rounded font-medium text-sm";
  const styles: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    add: "bg-green-600 text-white hover:bg-green-700"
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${styles[variant || "default"]} transition`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const handleDelete = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleAddOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      status: 'New order',
      products: ['New Product']
    };
    setOrders([newOrder, ...orders]);
  };

  const handleSortOrders = (order: 'newest' | 'oldest') => {
    setSortOrder(order);
    if (order === 'newest') {
      setOrders([...orders].sort((a, b) => b.id - a.id));
    } else {
      setOrders([...orders].sort((a, b) => a.id - b.id));
    }
  };

  const handleEditOrder = (id: number) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: 'Edited Order' } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Order History</h1>
        <div className="flex gap-2">
          <Button variant="add" onClick={handleAddOrder}>Add Order</Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSortOrders('newest')}>Newest Orders</Button>
            <Button variant="outline" onClick={() => handleSortOrders('oldest')}>Oldest Orders</Button>
          </div>
        </div>
      </div>

      {orders.map(order => (
        <Card key={order.id} className="mb-6">
          <CardContent className="p-4">
            <div className="mb-2 text-lg font-semibold">{order.status}</div>
            <ul className="mb-4 list-disc list-inside">
              {order.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Track order</Button>
              <Button variant="outline">View order details</Button>
              <Button variant="outline">Get invoice</Button>
              <Button variant="outline" onClick={() => handleEditOrder(order.id)}>Edit order</Button>
              <Button variant="destructive" onClick={() => handleDelete(order.id)}>Delete order</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
