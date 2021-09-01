document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = (url) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.setRequestHeader('Content-type', 'application/json');
            request.addEventListener('readystatechange', () => {
                if (request.readyState === 4 && request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    // console.log('data: ', data);
                    // Здесь выводится data
                    resolve(data);
                } else {
                    reject('Произошла ошибка');
                }
            });
            request.send();
        })
    }
    
    const outputCar = (data) => {
        console.log(data);
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    };
    
    select.addEventListener('change', () => {
        getData('./cars.json')
        // тут then не запускает функцию почемуто а сама data undefined
        .then(outputCar)
        .catch(err => output.innerHTML = err)
    });

});