import "./index.css";

const ResolvedTicketList = (props) => {
  const { ticket } = props;
  console.log(ticket);
  return (
    <li className="ticket-list-item">
      <div className="ticket-info-container">
        <div>
          <h5>Title</h5>
          <p>{ticket.title}</p>
        </div>
        <div>
          <h5>Status</h5>
          <p>{ticket.status}</p>
        </div>
        <div>
          <h5>Raised by</h5>
          <p>{ticket.raisedBy?.userId}</p>
        </div>
        <div>
          <h5>Organisation Name</h5>
          <p>{ticket.org_name}</p>
        </div>
        <div>
          <h5>Resolved by</h5>
          <p>{ticket.assignedTo.name}</p>
        </div>
        
      </div>
    </li>
  );
};

export default ResolvedTicketList;
