import axios from "axios";

export default {
  // Gets graphs
  // getGraphs: function(data) {
  //   return axios.post("/api/graphs", data);
  analyze: function (data) {
    console.log("analyze client API", data);

    //If on local use localhost... if not use /api/graphs
    // return axios.post("http://localhost:5000/api/graphs", data);
    return axios.post("/api/graphs/analyze", data);
  },
  cantusFirmusSuite: (data) => {
    console.log("CFsuite clientAPI", data)
    return axios.post("api/graphs/cantusSuite", data)
  }
};
