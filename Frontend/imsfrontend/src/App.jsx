import { useEffect, useState } from "react";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "./api/imsApi";

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", quantity: "", price: "" });
  const [editing, setEditing] = useState(false);

  // Load products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getAllProducts();
    setProducts(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateProduct(form.id, form);
    } else {
      await addProduct(form);
    }
    setForm({ id: "", name: "", quantity: "", price: "" });
    setEditing(false);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Inventory Management</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow-md w-full max-w-md mb-6"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="w-full max-w-2xl">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t text-center">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.quantity}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
