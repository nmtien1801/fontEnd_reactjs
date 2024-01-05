import { useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./modalDelete";
import ModalUser from "./modalUser";
import "./users.scss";

const Users = (props) => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPage, setTotalPage] = useState();
  // Modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  // Modal user
  const [isShowModalUser, setIsShowModalUser] = useState(false);

  // nhược điểm của useEffec là luôn đồng bộ
  useEffect(() => {
    fetchUser();
  }, [currentPage]);

  const fetchUser = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res && res.data && res.data.EC === 0) {
      setTotalPage(res.data.DT.totalPage);
      setListUser(res.data.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1); //đây là hàm bất đồng bộ chạy ss với await
    // await fetchUser(+event.selected + 1);
  };

  const handleDeleteUser = (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
  };

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    console.log(">>>check res user delete: ", res);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      await fetchUser();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleEditUser = (user) => {
    setDataModal(user);
    setIsShowModalUser(true);
  };

  const onHideModalUser = () => {
    setIsShowModalUser(false);
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title">
              <h3>user header</h3>
            </div>
            <div className="actions">
              <button className="btn btn-success">refesh</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                }}
              >
                add new user
              </button>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">userName</th>
                  <th scope="col">Group</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length ? (
                  <>
                    {listUser.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>{index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.userName}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <button
                              className="btn btn-warning me-3"
                              onClick={() => {
                                handleEditUser(item);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteUser(item);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>not found user</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {totalPage > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />

      <ModalUser
        show={isShowModalUser}
        title="create new user"
        onHideModalUser={onHideModalUser}
        fetchUser={fetchUser}
      />
    </>
  );
};

export default Users;
