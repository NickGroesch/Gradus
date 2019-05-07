import axios from "axios";

export default {
  // Gets graphs
  // getGraphs: function(data) {
  //   return axios.post("/api/graphs", data);
  analyze: function (data) {
    console.log(data);

    //If on local use localhost... if not use /api/graphs
    // on local
    return axios.post("http://localhost:5000/api/graphs", data);
    // to master
    // return axios.post("/api/graphs", data);
  },
  findAll: function () {

    return axios.get("http://localhost:5000/api/database");

  }
};
