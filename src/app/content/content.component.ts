import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import "firebase/firestore";

AOS.init();

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
  locations: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.locations = db.collection("locations").valueChanges();
    console.log(this.locations);
  }

  ngOnInit(): void {}
}