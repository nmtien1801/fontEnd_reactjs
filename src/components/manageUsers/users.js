import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";

const Users = (props) => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPage, setTotalPage] = useState(0);

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

  return (
    <div className="container">
      <div className="manage-user-container">
        <div className="user-header">
          <div className="title">
            <h3>user header</h3>
          </div>
          <div className="actions">
            <button className="btn btn-success">refesh</button>
            <button className="btn btn-primary">add new user</button>
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
  );
};

export default Users;