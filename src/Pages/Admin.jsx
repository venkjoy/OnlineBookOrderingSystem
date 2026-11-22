import { useState } from "react";
import { useProducts } from "../context/ProductContext";

function AdminPage() {
  const { products, addProduct, deleteProduct } = useProducts();

  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    price: "",
    img: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(newProduct);

    setNewProduct({
      title: "",
      category: "",
      price: "",
      img: "",
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Form */}
      <form className="space-y-4 mb-10" onSubmit={handleSubmit}>
        <input
          className="border p-3 w-full"
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />

        <input
          className="border p-3 w-full"
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          required
        />

        <input
          className="border p-3 w-full"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />

        <input
          className="border p-3 w-full"
          type="text"
          placeholder="Image URL"
          value={newProduct.img}
          onChange={(e) =>
            setNewProduct({ ...newProduct, img: e.target.value })
          }
          required
        />

        <button className="bg-green-600 text-white p-3 rounded">
          Add Product
        </button>
      </form>

      {/* List of Products */}
      <h2 className="text-xl font-bold mb-4">All Products</h2>

      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="p-4 border rounded shadow">
            <img src={p.img} className="w-full h-40 object-cover rounded" />
            <h3 className="font-bold mt-2">{p.title}</h3>
            <p>{p.category}</p>
            <p className="text-green-600 font-bold">₹{p.price}</p>

            <button
              onClick={() => deleteProduct(p.id)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
