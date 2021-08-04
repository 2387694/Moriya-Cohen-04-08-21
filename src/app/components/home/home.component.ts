import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  note: string
  currentLocation: any = {}
  forecast5day: any = {}
  searchCity: string
  listCity = []
  currentCityFavorite = false
  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.currentLocation = this.weatherService.currentLocation
    this.loadWether(true)
    this.isFavorite()
  }

  // loading weather forecast for the next 5 days
  loadWether(isCelsius) {
    this.weatherService.fiveDayForecast(this.currentLocation.Key, isCelsius).subscribe(
      data => {
        this.forecast5day = data
      }
      , err => {
        this.note = "Sorry, we could not find the weather. Please try again later"
      }
    )
  }

  // finds the same cities as in the search
  findCites() {
    if (!(this.searchCity[this.searchCity.length - 1] <= 'Z' && this.searchCity[this.searchCity.length - 1] >= 'A' || this.searchCity[this.searchCity.length - 1] >= 'a' && this.searchCity[this.searchCity.length - 1] <= 'z' || this.searchCity[this.searchCity.length - 1] == " "))
      this.searchCity = this.searchCity.substring(0, this.searchCity.length - 1);
    this.weatherService.autoComplete(this.searchCity).subscribe(
      data => {
        this.listCity = data;
      }
      , err => this.note = "Sorry, we were unable to find the cities. Please try again later"
    )
  }

  // city selection
  selectCity(item) {
    debugger
    this.listCity = []
    this.searchCity = item.LocalizedName
    this.currentLocation = item
    this.loadWether(true)
    this.isFavorite()
  }

  // remove this city from favorites
  removeFavorite() {
    document.cookie = this.currentLocation.LocalizedName + "=" + "0";
    this.currentCityFavorite = false
  }

  // add this city to favorites
  addFavorite() {
    debugger
    document.cookie = this.currentLocation.LocalizedName + "=" + this.currentLocation.Key;
    this.currentCityFavorite = true
  }

  // Check if the city you want to view exists in favorites
  isFavorite() {
    debugger
    let favoriteCity = document.cookie.split(";")
    if (favoriteCity == [""]) {
      this.currentCityFavorite = false
      return
    }
    for (let i = 0; i < favoriteCity.length; i++) {
      if (((favoriteCity[i].split("="))[0]).trim() == (this.currentLocation.LocalizedName).trim()) {
        if ((favoriteCity[i].split("="))[1] == this.currentLocation.Key)
          this.currentCityFavorite = true
        else
          this.currentCityFavorite = false
        return;
      }
    }
    this.currentCityFavorite = false
  }




}
