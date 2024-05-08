import React, { ChangeEvent } from "react";
import List from "../components/List";
import { Link } from "react-router-dom";
import { P } from "../components/Text";
import { fetch_api } from "../utils/auth";

const Cart = () => {
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [form, setForm] = React.useState({
    customer_name: "",
    table_number: "",
    order_type: "", // Tambahkan initial state untuk order_type
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  async function getCart() {
    const storage = localStorage.getItem("cart");

    const cart = storage ? JSON.parse(storage) : [];
    setCount(cart);
  }

  function syncData() {
    fetch_api("/coffee/")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setData(res.data.reverse());
        } else alert("Failed fetching data");
      });
  }


  function updatePrice() {
    const priceTotal = count.reduce(
      (a, b: any) =>
        a + (data.find((item: any) => b.id == item.id) as any)?.price * b.count,
      0
    );
    console.log(data);
    setTotal(priceTotal);
  }
  React.useEffect(() => {
    updatePrice();
  }, [count, data]);
  React.useEffect(() => {
    getCart();
    syncData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  
  async function checkout() {
    const token = localStorage.getItem("token"); // assuming the token is stored in local storage
    console.log("Token:", token); // Tambahkan ini untuk memeriksa token
  
    if (count.length === 0) return alert("Cart can't be empty");
    if (form.order_type === "") return alert("Please select order type");
  
    const body = {
      customer_name: form.customer_name,
      order_type: form.order_type,
      order_date: new Date().toLocaleDateString().replace(/\//g, "-"),
      order_detail: count
        .filter((x: any) => x.count > 0)
        .map((item: any) => {
          const food = data.find((x: any) => x.id == item.id) as any;
          return {
            coffee_id: item.id,
            price: item.count * food.price,
            quantity: item.count,
          };
        }),
    };
  
    const res = await fetch_api("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // include the token in the Authorization header
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  
    if (res.status) {
      localStorage.setItem("cart", "[]");
      alert("Order success");
      window.location.href = "/";
    } else alert(res.message);
  }
  return (
    <React.Fragment>
      <Link to="/" className="font-semibold text-lg m-12 hover:text-gray-700">
        &lt; Kembali
      </Link>
      <div className="flex justify-center min-h-full px-8">
        <List count={count} setCount={setCount} data={data} />
        <div className="border border-separate  w-1/3 p-8">
          <div className="mb-4 flex justify-between gap-2 mt-4">
            <label
              className="block text-gray-700 text-sm font-bold  whitespace-nowrap"
              htmlFor="customer_name"
            >
              Nama Pembeli:
            </label>
            <input
              className="max-w-[300px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customer_name"
              type="text"
              placeholder="Nama"
              name="customer_name"
              onChange={handleChange}
            />
          </div>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded mb-4"
            value={form.order_type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setForm({ ...form, order_type: e.target.value })
            }
          >
            <option value="">Pilih Jenis Pesanan</option>
            <option value="Dine In">Dine In</option>
            <option value="Take Away">Take Away</option>
          </select>
          <div className="border-b border-separate border-black"></div>
          <div className="w-full flex justify-between mt-8">
            <P>Items ({count.reduce((a, b: any) => a + b.count, 0)})</P>
            <P>{formatter.format(total)}</P>
          </div>
          <div className="w-full flex justify-between mt-8 font-bold">
            <P>Total</P>
            <P>{formatter.format(total)}</P>
          </div>
          <button
            className="px-3 py-2 rounded-md bg-green-500 text-white mt-4 w-full"
            type="button"
            onClick={() => checkout()}
          >
            Bayar di kasir
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
