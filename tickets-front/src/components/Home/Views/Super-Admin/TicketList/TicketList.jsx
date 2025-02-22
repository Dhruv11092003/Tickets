import "./index.css"

const TicketList=(props)=>{
const {ticket}=props
const {title}=ticket
    return(
        <li className="ticket-list-item">
            <div >
            <h5>Title</h5>
            <p>{title}</p>
            </div>
        </li>
    )
}

export default TicketList