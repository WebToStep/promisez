const output = document.createElement('div');

const getData = (url) => {
   return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url)
      request.addEventListener('readystatechange', () => {
         if (request.readyState !== 4) {
            return;
         }
         if (request.status === 200){
            const response = JSON.parse(request.responseText);
            resolve(response);
         }else{
            reject(request.responseText);
         }
      })
      request.send();
   });
}
const outputPhotos = (data) => {
   document.body.append(output)
   data.forEach((item) => {
      output.insertAdjacentHTML('beforebegin', 
      `<h4>${item.title}</h4>
      <img src="${item.thumbnailUrl}">`);
   })
   // console.log(data)
}
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos'

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
      twoImg = getData('https://jsonplaceholder.typicode.com/photos/2'),
      elevenImg = getData('https://jsonplaceholder.typicode.com/photos/50');


      Promise.all([oneImg, twoImg, elevenImg])
.then(outputPhotos)
.catch(err => console.error(err));      
//       Promise.race([oneImg, twoImg])
// .then(outputPhotos)
// .catch(err => console.error(err));      
// twoImg.then(outputPhotos).catch(err => console.error(err));      
// getData(urlPhotos)
// .then(outputPhotos)
// .catch(err => console.error(err));