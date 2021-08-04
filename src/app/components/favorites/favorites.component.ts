import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  arrFavorites = []

  constructor(private router:Router, private weatherService: WeatherService) { }


  ngOnInit() {

    // Add to arrFavorites the favorite cities
    let favoriteCity = document.cookie.split(';')
    for (let i = 0; i < favoriteCity.length; i++)
      if ((favoriteCity[i].split("="))[1] != "0") {
        this.weatherService.currentWeather(+favoriteCity[i].split("=")[1]).subscribe(
          data => {
            data[0].City = favoriteCity[i].split("=")[0]
            data[0].KeyCity = favoriteCity[i].split("=")[1]
            this.arrFavorites.push(data[0])
          },
        )
      }
  }

  // view the weather forecast for the selected city on the home page 
  showInHome(item){
    this.weatherService.currentLocation={"Key": item.KeyCity ,  "LocalizedName": item.City }
    this.router.navigate(['/Nav/Home'])
  }

}
