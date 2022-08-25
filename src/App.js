import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  function saatDiKlik(e) {
    e.preventDefault();
    setMessage("");
    if (!activity) {
      return setMessage("Jangan Kosong !!!");
    }

    if (edit.id) {
      const updateTodo = {
        ...edit,
        activity,
      };

      const editFindIndex = todos.findIndex((todo) => {
        return todo.id === edit.id;
      });

      const updateTodos = [...todos];
      updateTodos[editFindIndex] = updateTodo;
      setTodos(updateTodos);

      return cancelHandler();
    }

    setTodos([
      ...todos,
      { id: generateId(), activity: activity, status: false },
    ]);
    setActivity("");
  }

  function generateId() {
    return Date.now();
  }
  function hapusTodos(itemId) {
    const filterTodos = todos.filter((todo) => {
      return itemId !== todo.id;
    });

    setTodos(filterTodos);
    if (edit.id) cancelHandler();
  }

  function editTodos(ids) {
    if (ids.status === true) return;
    setActivity(ids.activity);
    setEdit(ids);
  }

  function cancelHandler() {
    setActivity("");
    setEdit({});
  }

  function ceklistHandler(cek) {
    const updatedCeklist = {
      ...cek,
      status: cek.status ? false : true,
    };
    const editFindIndex = todos.findIndex((currentTodo) => {
      return currentTodo.id === cek.id;
    });

    const updateTodos = [...todos];
    updateTodos[editFindIndex] = updatedCeklist;
    setTodos(updateTodos);
  }

  return (
    <div className="flex flex-col items-center bg-[#17181f] text-white h-screen font-roboto">
      <h1 className="my-4 font-bold text-2xl">Kegiatan Hari Ini</h1>
      {message && <div className="mb-4">{message}</div>}
      <form onSubmit={saatDiKlik}>
        <input
          className="bg-[#17181f] border-2 border-[#20212c] rounded-2xl py-1 px-2"
          type="text"
          value={activity}
          onChange={(e) => {
            setActivity(e.target.value);
          }}
        ></input>
        <button type="submit">
          {edit.id && edit.status !== true ? (
            <p className="mx-4 text-black bg-[#D63691] py-1 px-2 rounded-2xl">
              Simpan Perubahan
            </p>
          ) : (
            <div className="ml-4 flex items-center bg-[#D63691] text-black py-1 px-2 rounded-2xl">
              Add <IoMdAdd className="ml-1" />
            </div>
          )}
        </button>
        {edit.id && edit.status !== true && (
          <button
            className="text-black bg-[#D63691] py-1 px-2 rounded-2xl"
            onClick={cancelHandler}
          >
            Cancel Edit
          </button>
        )}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((item) => {
            return (
              <li
                key={item.id}
                className="mt-4 flex bg-[#20212c] py-3 px-5 rounded-2xl justify-between"
              >
                <input
                  className="mr-2"
                  type="checkbox"
                  onChange={() => ceklistHandler(item)}
                  checked={item.status}
                ></input>
                {item.activity}
                {item.status ? (
                  <p className="mx-2 text-[#D63691]">Selesai</p>
                ) : (
                  <p className="mx-4">Belum Selesai</p>
                )}
                <button
                  className="flex items-center mr-2"
                  onClick={() => editTodos(item)}
                >
                  <TbEdit /> Edit
                </button>
                <button
                  className="flex items-center"
                  onClick={() => hapusTodos(item.id)}
                >
                  <MdDeleteOutline />
                  Hapus
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <i className="mt-4">Tidak ada todo</i>
      )}
    </div>
  );
}

export default App;
