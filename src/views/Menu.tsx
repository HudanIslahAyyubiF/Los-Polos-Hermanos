import React from "react";
import Header from "../components/Header";
import { API_URL, fetch_api } from "../utils/auth";
import Modal from "../components/Modal";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const [modalData, setModalData] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  function syncData() {
    fetch_api("/coffee/?search" + search)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data.reverse());
        else alert("Failed fetching data");
      });
  }

  React.useEffect(() => {
    syncData();
  }, [search]);

  async function deleteMenu(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    const req = await fetch_api("/coffee/" + id, { method: "DELETE" }).then(
      (res) => res.json()
    );

    if (req.status) {
      alert("Sukses delete data");
      syncData();
    } else {
      alert("Gagal menghapus menu");
    }
  }

  return (
    <React.Fragment>
      <Header title="Los Polos Hermanos Cafe" />
      <main>
        {showModal && <Modal setIsOpenModal={setShowModal} data={modalData} />}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="relative overflow-x-auto">
              <button
                onClick={() => {
                  setModalData(null);
                  setShowModal(true);
                }}
                className="py-2 px-4 mb-6 rounded-md bg-green-500 text-white hover:bg-green-600 "
              >
                Tambah
              </button>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Menu
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gambar
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ukuran
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Harga
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .map((item: any, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 "
                        >
                          <td className="px-6 py-4">{item.name}</td>
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <img
                              src={`${API_URL}/uploaded/${item.image}`}
                              className="w-24"
                              alt="Image"
                            />
                          </td>
                          <td className="px-6 py-4">{item.size}</td>
                          <td className="px-6 py-4">{item.price}</td>
                          <td className="px-6 py-4 flex gap-2">
                            <button
                              onClick={() => {
                                setModalData(item);
                                setShowModal(true);
                              }}
                              className="py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteMenu(item.id)}
                              className="py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                              Hapus
                            </button>
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

export default Home;
