import "./role.scss";
import { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const Role = (props) => {
  const [listChild, setListChild] = useState({
    child1: { url: "a", description: "ds" },
  });

  useEffect(() => {
    Object.entries(listChild).map(
      ([key, value]) => {
        console.log(">>>>check list child: ", key, value); // search: js loop through object react
      }

      // <div key={key}>{value}</div>
    );
  }, []);

  const handleOneChangeInput = (nameVal, key, value) => {
    let _listChilds = _.cloneDeep(listChild);
    _listChilds[key][nameVal] = value;
    setListChild(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChild);
    _listChilds[`child-${uuidv4()}`] = { url: "", description: "" };
    setListChild(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChild);
    delete _listChilds[key]; // search: object delete key
    setListChild(_listChilds);
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="row mt-3">
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
                      className="form-control"
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
              <button className="btn btn-warning mt-3">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
