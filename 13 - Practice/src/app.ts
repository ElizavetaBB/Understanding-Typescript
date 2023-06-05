// Code goes here!
import axios from 'axios';

let form = document.querySelector("form")! as HTMLFormElement;
let inputAddress = document.getElementById("address")! as HTMLInputElement;

const YANDEX_API_KEY = '';
declare let ymaps: any;

let myMap: any;

type YandexGeoCodingResponse = {
    response: {
        GeoObjectCollection: { 
            featureMember : [{
                GeoObject: { 
                    Point : { pos : string}
                }
            }]
        }
    }
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    let enteredAddress = inputAddress.value;
    // send to Yandex API

    axios.get<YandexGeoCodingResponse>(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&geocode=${encodeURI(enteredAddress)}&format=json`
    ).then(response => {
        let coordinates = response.data
            .response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos! as string;
        let coordinatesSplitted = coordinates.split(' ');

        if (myMap) {
            myMap.destroy();
        }
        
        myMap = new ymaps.Map(document.getElementById('map')!, {
            center: [coordinatesSplitted[1], coordinatesSplitted[0]],
            zoom: 15
        });
        
        let myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [coordinatesSplitted[1], coordinatesSplitted[0]]
            },
        });

        myMap.geoObjects.add(myGeoObject);
    }).catch(err => {
        console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);