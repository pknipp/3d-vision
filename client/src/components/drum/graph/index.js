import React from "react";
import Bar from "./Bar";
import Number from "./Number";
import Button from "../../Button.js";
const Graph = ({KE, PE, E, Ei, handleToggle, toggle, info}) => {
    let Efac = (Ei) ? Ei : (PE) ? PE : 1;
    return (
        <div className="graph container">
            <div className="title">
                <h3>
                    <span>Energies (arbitrary units)</span>
                    <Button onClick={handleToggle} name="energy" toggle={toggle} />
                </h3>
            </div>
            <span className="energy info"><i>{toggle ? info : null}</i></span>
            <div className="title ke">kinetic (KE)</div>
            <div className="title pe">potential (PE)</div>
            <div className="title e">total (KE + PE)</div>
            <div className="title ei">initial</div>
            <Number key="nke" e={"ke"} E={KE} Efac={Efac} />
            <Number key="npe" e={"pe"} E={PE} Efac={Efac} />
            <Number key="ne"  e={"e"}  E={E}  Efac={Efac} />
            <Number key="nei" e={"ei"} E={Ei} Efac={Efac} />
            <Bar key="bke" e={"ke"} E={KE} Efac={Efac} />
            <Bar key="bpe" e={"pe"} E={PE} Efac={Efac} />
            <Bar key="be"  e={"e"}  E={E}  Efac={Efac} />
            <Bar key="bei" e={"ei"} E={Ei} Efac={Efac} />
        </div>
    )
}

export default Graph;
