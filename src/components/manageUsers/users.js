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
  const [isDataInPage, setIsDataInPage] = useState(true);
  // Modal user update/create
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("");
  const [dataModalUser, setDataModalUser] = useState({});

  // nhược điểm của useEffec là luôn đồng bộ
  useEffect(() => {
    fetchUser();
    // in ra cookies nhận được từ BE
    let c = document.cookie
      .split(";")
      .reduce(
        (ac, cv, i) =>
          Object.assign(ac, { [cv.split("=")[0]]: cv.split("=")[1] }),
        {}
      );

    console.log(c);
  }, [currentPage]);

  const fetchUser = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res && res.EC === 0) {
      setTotalPage(res.DT.totalPage);
      setListUser(res.DT.users);
      // reset trang khi delete
      if (res.DT.users.length === 1) {
        setIsDataInPage(false);
      } else {
        setIsDataInPage(true);
      }
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
    if (res && res.EC === 0) {
      toast.success(res.EM);
      if (isDataInPage === false) {
        setCurrentPage(currentPage - 1);
      }
      await fetchUser();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.EM);
    }
  };

  const handleEditUser = (user) => {
    setActionModalUser("UPDATE");
    setDataModalUser(user);
    setIsShowModalUser(true);
  };

  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUser();
  };

  const handleRefresh = async () => {
    await fetchUser();
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage Users</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleRefresh();
                }}
              >
                <i className="fa fa-refresh refresh"></i>refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setActionModalUser("CREATE");
                  setIsShowModalUser(true);
                }}
              >
                <i className="fa fa-plus-circle"></i>
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
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.userName}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <span
                              title="Edit"
                              className="edit me-3"
                              onClick={() => {
                                handleEditUser(item);
                              }}
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              title="Delete"
                              className="delete"
                              onClick={() => {
                                handleDeleteUser(item);
                              }}
                            >
                              <i className="fa fa-trash-o"></i>
                            </span>
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
        onHideModalUser={onHideModalUser}
        action={actionModalUser}
        dataModal={dataModalUser}
      />
    </>
  );
};

export default Users;
