import "./role.scss";
import { useEffect, useState, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createNewRole } from "../../services/roleService";
import TableRole from "./tableRole";

const Role = (props) => {
  const childRef = useRef();
  const dataChildDefault = {
    url: "",
    description: "",
    isValidUrl: true,
  };
  const [listChild, setListChild] = useState({
    child1: dataChildDefault,
  });

  const handleOneChangeInput = (nameVal, key, value) => {
    let _listChilds = _.cloneDeep(listChild);
    _listChilds[key][nameVal] = value;
    if (value && nameVal === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChild(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChild);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChild(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChild);
    delete _listChilds[key]; // search: object delete key
    setListChild(_listChilds);
  };

  // persist: write data xuống DB
  // setup lại data không chứa isvalid trong obj
  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChild);
    let result = [];
    // search: js loop through object react
    Object.entries(listChild).map(([key, value], index) => {
      result.push({
        url: value.url,
        description: value.description,
      });
    });
    return result;
  };

  //search: sequelize bulk create
  const handleSave = async () => {
    let check = true;
    // search: js object entries break
    let inValidObj = Object.entries(listChild).find(([key, value], index) => {
      return value && !value.url; // value => !value.url
    });
    // console.log(">>>check valid role: ", inValidObj);
    if (!inValidObj) {
      // call api
      let roleData = buildDataToPersist();
      let res = await createNewRole(roleData);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        childRef.current.fetchListRoleAgain();
      } else {
        toast.error(res.EM);
      }
    } else {
      // error
      toast.error("input Url must not be empty");
      let _listChilds = _.cloneDeep(listChild);
      const keyCol = inValidObj[0];
      _listChilds[keyCol]["isValidUrl"] = false;
      setListChild(_listChilds);
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="adding-role row mt-3">
          <div className="title-role">
            <h4>Add a new role...</h4>
          </div>
          <div className="row role-parent">
            {Object.entries(listChild).map(([key, value], index) => {
              return (
                <div className="row role-child " key={`child-${key}`}>
                  {/* dùng `` thì phải bỏ vào {} của react */}
                  <div className={`col-12 col-md-5 form-group ${key}`}>
                    <label>URL: </label>
                    <input
                      type="text"
                      className={
                        value.isValidUrl
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      value={value.url}
                      onChange={(event) => {
                        handleOneChangeInput("url", key, event.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-5 form group">
                    <label>Description: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={value.description}
                      onChange={(event) => {
                        handleOneChangeInput(
                          "description",
                          key,
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className="col-2 mt-4 actions">
                    <i
                      className="fa fa-plus-circle add"
                      onClick={() => {
                        handleAddNewInput();
                      }}
                    ></i>
                    {index >= 1 && (
                      <i
                        className="fa fa-trash-o delete"
                        onClick={(event) => {
                          handleDeleteInput(key);
                        }}
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}
            <div>
              <button
                className="btn btn-warning mt-3"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3 table-role">
          <h4>List Current Roles</h4>
          <TableRole ref={childRef} />
        </div>
      </div>
    </div>
  );
};

export default Role;
