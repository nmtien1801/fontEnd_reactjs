import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Detail extends React.Component {
  state = {
    user: {},
  };
  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      const id = this.props.match.params.id;
      const res = await axios.get(`https://reqres.in/api/users/${id}`);
      this.setState({
        user: res && res.data && res.data.data ? res.data.data : {},
      });
      console.log("check props: ", this.props);
    }
  }

  handleBack = () => {
    this.props.history.push(`/about`);
  };
  render() {
    const { user } = this.state;
    const isEmtyObj = Object.keys(user).length === 0;
    return (
      <>
        {isEmtyObj === false ? (
          <div>
            <img src={user.avatar} />
          </div>
        ) : (
          <div>2</div>
        )}

        <button
          onClick={() => {
            this.handleBack();
          }}
          type="button"
        >
          back
        </button>
      </>
    );
  }
}
export default withRouter(Detail);
