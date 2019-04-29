import axios from "axios";

export default {
  // Gets graphs
  getGraphs: function(data) {
    return axios.post("/api/graphs", data);
  }
};
