document.querySelector('.busca').addEventListener('submit', async(event)=>{
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if(input !== ''){
        clearInfo(); 
        showWarnning('carregando..')
       let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ba892ac12b53b249f4a7734cf9003006&units=metric&lang=pt`;   

       let results= await fetch(url); // faz a requisição e espera o resultado
       let json = await results.json(); // pega o resultado e transfoema em json

       if(json.cod === 200){
           showInfor({
               name: json.name,
               country: json.sys.country,
               temp: json.main.temp,
               tempIcon: json.weather[0].icon,
               windSpeed: json.wind.speed,
               windAngle: json.wind.deg
           }); 
       } else {
           clearInfo();
           showWarnning("Não encontramos essa Localização.");
       }
    } 
})
 function showInfor(json){ 
      showWarnning('');

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
     document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

     document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block';
      
 }
 function clearInfo(){
     showWarnning('');
     document.querySelector('.resultado').style.display = 'none';
    
 }
function showWarnning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}