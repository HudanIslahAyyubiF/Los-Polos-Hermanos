import React from "react";
import Header from "../components/Header";
import { fetch_api } from "../utils/auth";
import { getStatus } from "../utils/auth";

const Transaksi = () => {
  const [data, setData] = React.useState([]);
  const [coffee, setCoffee] = React.useState([]);

  const status = getStatus();
  if (!status.isLoggedIn) window.location.href ="/login";

  React.useEffect(() => {
    fetch_api("/coffee")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setCoffee(res.data);
      });
    fetch_api("/order")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data.reverse());
        else alert("Failed fetching data");
      });
  }, []);

  return (
    <React.Fragment>
      <Header title="Riwayat Pembelian" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pembeli
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tipe Order
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Detail
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.order_date}</td>
                        <td className="px-6 py-4">{item.customer_name}</td>
                        <td className="px-6 py-4">{item.order_type}</td>
                        <td className="px-6 py-4">
                          <ul className="list-disc">
                            {item.order_detail.map(
                              (order: any, index: number) => {
                                return (
                                  <li key={index}>
                                    {(coffee?.find((x:any)=> order.coffee_id == x.id) as any)?.name} ({order.quantity
})
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </td>
                        <td className="text-center">
                          {item.order_detail.reduce(
                            (a: any, b: any) => a + b.price,
                            0
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Transaksi;
