import axios from "axios";

export default {
  // Gets graphs
  // getGraphs: function(data) {
  //   return axios.post("/api/graphs", data);
  analyze: function (data) {
    return axios.post("http://localhost:5000/api/graphs", data);
  }
};
