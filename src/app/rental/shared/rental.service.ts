import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { Rental } from "./rental.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RentalService {
  constructor(private htpp: HttpClient) {}
  public getRentalById(rentalId: string): Observable<any> {
    // return new Observable<Rental>(observable => {});
    return this.htpp.get("/api/v1/rentals/" + rentalId);
  }
  public getRentals(): Observable<any> {
    //return new Observable<Rental[]>(observable => {});
    return this.htpp.get("/api/v1/rentals");
  }
}
