import React from 'react';

export default class Copyright extends React.Component {
    render() {
        var Year = new Date().getFullYear(+1);
        return(
            <div className="f-copyright">
                <div className="container">┬ęCopyright {Year} Vote ME</div>
            </div>
        );
    }
}