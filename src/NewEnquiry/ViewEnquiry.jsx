import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllContacts } from "../services/contactService";

export default class ViewEnquiry extends React.Component {
  state = {
    contacts: [],
    loading: true,
    notice: null,
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalSelectValue: ""
  };

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    this.setState({ loading: true });
    getAllContacts().then((res) => {
        const rows = res.data || [];
        const totalPages = Math.max(1, Math.ceil(rows.length / this.state.pageSize));
        this.setState({ contacts: rows, loading: false, totalPages, totalSelectValue: "" });

      }).catch((err) => {
        this.setState({
          loading: false,
          notice: { type: "danger", text: err.message || "Failed to load contacts" }
        });
      });
  };

  handlePageChange = (page) => {
    if (page >= 1 && page <= this.state.totalPages) {
      this.setState({ currentPage: page });
    }
  };

  handlePageSizeChange = (e) => {
    const pageSize = parseInt(e.target.value, 10) || 5;
    const totalPages = Math.max(1, Math.ceil(this.state.contacts.length / pageSize));
    this.setState({ pageSize, currentPage: 1, totalPages, totalSelectValue: "" });
  };

  handleTotalSelectChange = (e) => {
    const page = parseInt(e.target.value, 10);
    if (!isNaN(page)) {
      this.handlePageChange(page);
      this.setState({ totalSelectValue: "" });
    }
  };

  generatePageSizes = (total) => {
    const steps = [5, 10, 20, 50, 100];
    let sizes = [];
    steps.forEach((size) => { if (size < total) sizes.push(size); });
    let next = steps[steps.length - 1];
    while (next < total) { next *= 2; if (next < total) sizes.push(next); }
    sizes.push(total);
    return sizes;
  };

  renderList() {
    const { contacts, loading, currentPage, pageSize, totalPages, totalSelectValue } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedContacts = contacts.slice(startIndex, startIndex + pageSize);

    return (
      <div className="container mt-6" style={{ backgroundColor: "teal", color: "white", maxWidth: "100%", overflowX: "auto" }}>
        <h3 className="text-center mb-4 text-white">All Enquiries</h3>
        {loading && <div className="text-center py-3">Loading…</div>}

        {!loading && (
          <>
            <table className="table table-bordered table-hover text-center align-middle"
              style={{ backgroundColor: "teal", color: "white", minWidth: "1000px" }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "20%" }}>Email</th>
                  <th style={{ width: "20%" }}>Subject</th>
                  <th style={{ width: "40%" }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4">No Enquiries found</td>
                  </tr>
                )}
                {paginatedContacts.map((c, index) => (
                  <tr key={c.id} style={{ backgroundColor: index % 2 === 0 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}}>
                    <td>{startIndex + index + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.subject}</td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{c.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>

         
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="d-flex align-items-center mb-2">
                <label className="me-2">Show</label>
                <select className="form-select form-select-sm w-auto"
                  value={pageSize} onChange={this.handlePageSizeChange}>
                  {this.generatePageSizes(contacts.length).map((size) => (
                    <option key={size} value={size}>
                      {size === contacts.length ? "All" : size}
                    </option>
                  ))}
                </select>
                <label className="ms-2">entries</label>
              </div>

              <div className="d-flex align-items-center gap-2 mb-2">
                <button className="btn btn-dark btn-sm"
                  onClick={() => this.handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}>
                  ← Prev
                </button>

                <span className="border px-3 py-1 rounded bg-white text-dark fw-bold">
                   {currentPage}
                </span>

                <button className="btn btn-dark btn-sm"
                  onClick={() => this.handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}>
                  Next →
                </button>
              </div>

              <div className="mb-2">
                <label className="me-2">Total</label>
                <select className="form-select form-select-sm d-inline-block w-auto"
                  onChange={this.handleTotalSelectChange} value={totalSelectValue}>
                  <option value="" disabled>
                    Total Page ({totalPages})
                  </option>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  render() {
    const { notice } = this.state;

    return (
      <>
        {notice && (
          <div className={`alert alert-${notice.type} text-center m-3`}>
            {notice.text}
          </div>
        )}
        {this.renderList()}
      </>
    );
  }
}
