import React from 'react';

const Dado = (props) => {
    const dadoImg = {
        1: '/dado/one.png',
        2: '/dado/two.png',
        3: '/dado/three.png',
        4: '/dado/four.png',
        5: '/dado/five.png',
        6: '/dado/six.png'
    }
    return (
        <div>            
            <img src={dadoImg[props.value]} alt="dado" />
        </div>
    );
};

export default Dado;