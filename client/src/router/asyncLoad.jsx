import React from 'react'
import Loadable from 'react-loadable';

const Loading = () => {
    return(
        <div>加载中...</div>
    )
};


const asyncLoad = (importComponent) => {
    return Loadable({
        loader: importComponent,
        loading: Loading
    })
};

export default asyncLoad;
