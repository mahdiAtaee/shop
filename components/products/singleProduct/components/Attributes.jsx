/* eslint-disable react/prop-types */
import React from 'react'

const Attributes = ({ attributes }) => {
    return (
        <div
            className="tab-pane fade"
            id="ui"
            role="tabpanel"
            aria-labelledby="ui-tab"
        >
            {attributes.map((attribute, index) => (
                <div key={index}>
                    <h5>{attribute.title}</h5>

                    <div className="table-responsive" >
                        <table className="table table-striped table-bordered">
                            <tbody>
                                {attribute.attributes.map((attr) => (
                                    <tr key={index}>
                                        <td>{attr.title}</td>
                                        <td>{attr.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            ))}
        </div>

    )
}

export default Attributes