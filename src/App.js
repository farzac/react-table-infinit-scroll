import React from "react";
import { render } from "react-dom";
import autobind from "autobind";
import {Waypoint} from "react-waypoint";
import { makeData } from "./Utils";
import _ from "lodash";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const DATA = makeData(10000);
const PAGE_SIZE = 100;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pageSize: 1,
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    this.loadMore();
  }



  loadMore() {
    this.setState({ loading: true });
    console.log("going to API for data...");

    setTimeout(() => {
      console.log("got data from API...");
      this.setState(prevState => {
        const currData = prevState.data;
        const page = currData.length / PAGE_SIZE;
        //const page = 100
        const addData = DATA.slice(
          currData.length,
          //currData,
          //1,
          currData.length + PAGE_SIZE
          //currData + PAGE_SIZE
          //1000 + PAGE_SIZE
        );
        //const newData = [...currData, ...addData];
        const newData = 100;
        console.log("page", page, "total", newData.length);

        return {
          data: newData,
          pageSize: newData.length,
          loading: false
        };
      });
    }, Math.random() * 1500);
  }



  render() {
    const { data } = [] //this.state;
    //const { data } = this.state;
    const moreBtn = <button onClick={this.loadMore}>Load</button>;

    return (
      <div>
        {moreBtn}
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: "ID",
                  id: "id",
                  accessor: "index"
                },
              {
                Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                },
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          showPagination={false}
          pageSize={this.state.pageSize}
          loading={this.state.loading}
          // defaultPageSize={100}
          // pageSizeOptions={[1000]}
          // style={{
          //   height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
          // }}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <em>Sub Component!</em>
              </div>
            );
          }}
        />
        <Waypoint
          onEnter={this.loadMore}
          // onLeave={() => console.log('on leave')}
          bottomOffset="-200px"
        />
        {moreBtn}
      </div>
    );
  }
}
