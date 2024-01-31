import {
  useEffect,
  useState,
  forwardRef, // để dùng hook useImperativeHandle
  useRef,
  useImperativeHandle,
} from "react";
import { fetchAllRoles, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);
  useEffect(() => {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    //useImperativeHandle chỉ dùng func truyền thống và không cần asynch
    // dùng này thay vì phải fetch lại data mỗi khi thêm và xoá
    fetchListRoleAgain() {
      getAllRoles();
    },
  }));

  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <div className="user-body">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Url</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listRoles && listRoles.length ? (
              <>
                {listRoles.map((item, index) => {
                  return (
                    <tr key={`row-${index}`}>
                      {/* <td>{(currentPage - 1) * currentLimit + index + 1}</td> */}
                      <td>{item.id}</td>
                      <td>{item.url}</td>
                      <td>{item.description}</td>

                      <td>
                        {/* <span
                          title="Edit"
                          className="edit me-3"
                          onClick={() => {
                            handleEditUser(item);
                          }}
                        >
                          <i className="fa fa-pencil"></i>
                        </span> */}
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => {
                            handleDeleteRole(item);
                          }}
                        >
                          <i className="fa fa-trash-o delete"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan={4}>not found roles</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
});

export default TableRole;
