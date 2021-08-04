import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentLocation: any = { "Key": "215854", "LocalizedName": "Tel Aviv" }
  APIKey: string = "G7ZH1DS9QSDXTJ8aLx92w3IradEch7vb"


  constructor(private http: HttpClient) { }


  fiveDayForecast(idCity: number, isCelsius): Observable<any> {
    return this.http.get<any>("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + idCity + "?apikey=" + this.APIKey + "&language=en-us&metric=" + isCelsius)
  }

  autoComplete(city: string): Observable<any> {
    return this.http.get<any>("https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + this.APIKey + "&q=" + city)
  }

  currentWeather(id: number): Observable<any> {
    return this.http.get<any>("http://dataservice.accuweather.com/currentconditions/v1/" + id + "?apikey=" + this.APIKey + "&language=en-us&details=true")
  }

}
