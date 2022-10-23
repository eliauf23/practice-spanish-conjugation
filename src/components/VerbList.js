import { useState, useEffect } from 'react';

function VerbList(props) {

    const { verbList, setVerbList, addVerb, removeVerb } = props;

    return (
        <div>
            {verbList !== null ? (
                verbList.map((verb, index) => {
                    return (
                        <div key={index}>
                            <p>{verb}</p>
                            <button onClick={() => removeVerb(index)}>Remove
                            <i class="icon-close">X</i>
                            </button>
                        </div>
                    )

                })
            ): <div></div>}
        </div>

    );
}

export default App;
