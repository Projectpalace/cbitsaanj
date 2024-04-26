export default function Navbar2({setdisplay}) {
    return (
        <div className="Navbar">
            <button onClick={() => setdisplay(2)}>Patients List</button>
        </div>
    )
}