import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash"; // react hook not merge state

const ModalUser = (props) => {
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  // const [sex, setSex] = useState("");
  // const [group, setGroup] = useState("");

  const defaultUserData = {
    email: "",
    phone: "",
    userName: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const validInputsDefault = {
    email: true,
    phone: true,
    userName: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(validInputsDefault);
  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    getGroup();
  }, []);
  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.data.EC === 0) {
      setUserGroup(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData); // sao chép lại userData
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidInput = () => {
    // create user
    setValidInput(validInputsDefault);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    let regex = /\S+@\S+\.\S+/;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]] || (!regex.test(userData[arr[i]]) && !userData[arr[i]])) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);

        toast.error(`empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = () => {
    checkValidInput();
  };

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        onHide={props.handleClose}
        animation={true}
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row ">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address (<span className="red">*</span>) :
              </label>
              <input
                className={
                  validInput.email ? "form-control " : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "email");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>) :
              </label>
              <input
                className={
                  validInput.phone ? "form-control " : "form-control is-invalid"
                }
                type="number"
                value={userData.phone}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "phone");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                User name (<span className="red">*</span>) :
              </label>
              <input
                className={
                  validInput.userName
                    ? "form-control "
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.userName}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "userName");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red">*</span>) :
              </label>
              <input
                className={
                  validInput.password
                    ? "form-control "
                    : "form-control is-invalid"
                }
                type="password"
                value={userData.password}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "password");
                }}
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className={
                  validInput.address
                    ? "form-control "
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.address}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "address");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="GenderSelect">Gender :</label>
              <select
                id="GenderSelect"
                className="form-select"
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "sex");
                }}
              >
                <option defaultValue={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="GroupSelect">
                Group (<span className="red">*</span>) :
              </label>
              <select
                id="GroupSelect"
                className="form-select"
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "group");
                }}
              >
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmUser();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
