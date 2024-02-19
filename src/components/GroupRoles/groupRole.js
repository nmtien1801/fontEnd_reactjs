import { useEffect, useState } from "react";
import "./groupRole.scss";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import {
  fetchAllRoles,
  fetchRoleByGroup,
  assignRoleToGroup,
} from "../../services/roleService";
import _ from "lodash"; // CRUD in arr

const GroupRole = () => {
  const [userGroup, setUserGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [listRoles, setListRoles] = useState([]);
  // merge 2 bảng listRoles với selectGroup của role đó
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

  useEffect(() => {
    getGroup();
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroup(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnChangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      // getRoleByGroup
      let data = await fetchRoleByGroup(value);

      if (data && +data.EC === 0) {
        // console.log(">>>>check list role: ", listRoles);
        // console.log(">>>>check group role: ", data.DT.Roles);
        let rs = buildDataByGroup(data.DT.Roles, listRoles);
        setAssignRolesByGroup(rs);
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  const buildDataByGroup = (groupRoles, allRoles) => {
    let rs = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {}; // tạo mới object
        object.id = role.id;
        object.url = role.url;
        object.description = role.description;
        object.isAssigned = false; // thêm vào object vừa tạo

        // nếu role chọn có trong allRoles thì -> True
        if (groupRoles && groupRoles.length > 0) {
          // vòng some -> true or false
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }
        rs.push(object);
      });
    }
    return rs;
  };

  const onChangeHandleSelect = (value) => {
    // console.log(">>check click change option id: ", value);
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    // search: js find array and update value
    let foundIndex = assignRolesByGroup.findIndex(
      (item) => +item.id === +value
    );
    // trả về -1 nếu không có dấu +
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned =
        !_assignRolesByGroup[foundIndex].isAssigned;
    }

    setAssignRolesByGroup(_assignRolesByGroup);
  };

  // delete - create role click
  const buildDataToSave = () => {
    let rs = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    // tìm những option được click
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    // chuyển data tới BE có dạng groupId, roleId (/assign-to-group)
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupID: +selectGroup, roleID: +item.id };
      return data;
    });
    rs.groupId = selectGroup;
    rs.groupRoles = finalGroupRoles;
    return rs;
  };

  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRoleToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className=" group-role-container">
      <div className="container">
        <div className="mt-3">
          <h4>Group Roles: </h4>
          <div className="assign-group-role">
            Select group
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="GroupSelect">
                Group (<span className="red">*</span>) :
              </label>
              <select
                id="GroupSelect"
                className="form-select"
                onChange={(event) => {
                  handleOnChangeGroup(event.target.value);
                }}
              >
                <option value="">Please select your group</option>
                {userGroup &&
                  userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <hr />
            {selectGroup && (
              <div className="roles">
                <h5>Assign Role</h5>
                {assignRolesByGroup &&
                  assignRolesByGroup.length > 0 &&
                  assignRolesByGroup.map((item, index) => {
                    return (
                      // gán động id và for để không chọn select đầu tiên mãi
                      <div className="form-check" key={`listRole-${index}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`listRole-${index}`}
                          checked={item.isAssigned}
                          onChange={(event) => {
                            onChangeHandleSelect(event.target.value);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`listRole-${index}`}
                        >
                          {item.url}
                        </label>
                      </div>
                    );
                  })}
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
