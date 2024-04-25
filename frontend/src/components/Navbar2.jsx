export default function Navbar2({setdisplay}) {
    return (
        <div className="Navbar">
            <h1>Navbar2</h1>
            <p onClick={() => setdisplay(2)}>drawing</p>
            <p onClick={() => setdisplay(1)}>report</p>
        </div>
    )
}