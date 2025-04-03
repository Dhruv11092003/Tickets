import "./index.css";

const ResolvedTicketList = (props) => {
  const { ticket } = props;
  console.log(ticket)
  const { status } = ticket;
  return (
    <li className="ticket-list-item">

      <div>
        <h5>Title</h5>
        <p>{status}</p>

      </div>
    </li>
  );
};

export default ResolvedTicketList;
