import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { LineOfBusiness } from '../LineOfBusiness';
import { RecentQuote } from '../RecentQuote';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-popular-quotes',
  templateUrl: './popular-quotes.component.html',
  styleUrls: ['./popular-quotes.component.css']
})
export class PopularQuotesComponent implements OnInit {
  // Object to save the results of the query in recentQuotes table.
  recentQuotes: RecentQuote[] = [];
  // Object to save the results of the query in linesOfBusiness table.
  linesOfBusiness: LineOfBusiness[] = [];

  // Array that contains the id, number of times quoted, and name of all linesOfBusiness.
  quoteSortedArray: [number, number, string][] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) { }

  ngOnInit() {
    this.getSortedLinesOfBusiness();
  }

  // Gets all linesOfBusiness, and sorts them by how many times they are quoted.
  getSortedLinesOfBusiness(): void {
    // Keeps track of times the lineOfBusiness has been quoted.
    let counter = 0;
    // Array used to join the results of the linesOfBusiness and recentQuotes tables, 
    // using the linesOfBusiness id.
    let quoteArray: [number, number, string][] = [];
    // Map to calculate the number of times a lineOfBusiness has been quoted. 
    let quoteMap = new Map();
    // Map of the linesOfBusiness for joining with quoteMap.
    let lineOfBusinessMap = new Map();


    //Source for nested subscribe: https://stackoverflow.com/q/64822065
    // Nested requests to get data from the linesOfBusiness and recentQuotes tables. 
    this.lineOfBusinessService.getRecentQuotes()
    .subscribe(recentQuotes => {
      this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => {

        /// GET QUOTES INTO MAP.

        this.recentQuotes = recentQuotes;
        console.log(`recentQuotes: "${this.recentQuotes}"`);
        
        // Save quotes into quoteMap and count the number of times it has been quoted.
        this.recentQuotes.forEach(quote => {
          //If it is a quote not in quoteMap...
          if(quoteMap.has(quote.lineOfBusiness) == false){
            //... save quote in quoteMap.
            quoteMap.set(quote.lineOfBusiness, 1);
          }
          else{
            //If it is in QuoteMap, get number of times it has been quoted.
            counter = quoteMap.get(quote.lineOfBusiness);
            // Add one to the counter and update the quoteMap element.
            counter += 1;
            console.log(`For id "${quote.lineOfBusiness}", counter is now: "${counter}"`);
            quoteMap.set(quote.lineOfBusiness, counter);
          }
        });
        console.log("quoteMap: ")
        console.log(quoteMap);



        /// GET LINES OF BUSINESS INTO MAP.

        this.linesOfBusiness = linesOfBusiness;
          this.linesOfBusiness.forEach(lineOfBusiness => {
            // Save linesOfBusiness in lineOfBusinessMap.
            lineOfBusinessMap.set(lineOfBusiness.id, lineOfBusiness.name);
          }) 
        console.log("lineOfBusinessMap:")
        console.log(lineOfBusinessMap);
        
        quoteMap.forEach((quoteValue: number, quoteID: number) => {
          console.log(quoteValue, quoteID);
          //Join both lineOfBusiness and recenQuote Maps through the lineOfBusiness key.
          quoteArray.push([quoteID, quoteValue, lineOfBusinessMap.get(quoteID)]);

        });
        console.log("quoteArray: ");
        console.log(quoteArray);

        // Source for sorting function: https://stackoverflow.com/a/21689268
        // Sort quoteArray in descending order and save it to the global quoteSortedArray.
        this.quoteSortedArray = quoteArray.sort((element1, element2,)=>{
          if(element1[1] < element2[1]){
            return 1;
          }
          if (element1[1] > element2[1]) {
            return -1;
          }

          return 0;

        // After sorting, only get the top two linesOfBusiness to show as links in the html.
        }).splice(0,2);

        console.log(this.quoteSortedArray);
      
      });
    });

  }

}
