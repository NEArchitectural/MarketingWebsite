import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Location } from "../models/location";
import "firebase/firestore";

@Component({
  selector: "app-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.scss"]
})
export class AddLocationComponent implements OnInit {
  form: FormGroup;
  dbRef: AngularFirestore;
  model: Location;
  currentTitle: string;
  currentType: string;
  currentSummary: string;
  currentCreated: Date;
  currentWheelChair = false;
  currentChild = false;
  currentCheap = false;
  currentFree = false;
  currentThumbnail: string;
  currentLatitude: number;
  currentLongitude: number;

  constructor(private db: AngularFirestore) {
    // TODO: Get all form data and create new location
    this.dbRef = db;
  }

  onSaveLocation() {
    if (this.form.invalid) {
      return;
    }
    this.currentTitle = this.form.value.title;
    this.currentType = this.form.value.type;
    this.currentSummary = this.form.value.summary;
    this.currentCreated = this.form.value.created;
    this.currentThumbnail = this.form.value.thumbnail;
    this.currentLatitude = this.form.value.latitude;
    this.currentLongitude = this.form.value.longitude;

    this.model = {
      name: this.currentTitle,
      placeType: this.currentType,
      summary: this.currentSummary,
      createdAt: this.currentCreated,
      wheelChairAccessible: this.currentWheelChair,
      childFriendly: this.currentChild,
      cheapEntry: this.currentCheap,
      freeEntry: this.currentFree,
      thumbnail: this.currentThumbnail,
      latitude: this.currentLatitude,
      longitude: this.currentLongitude
    };

    const param = JSON.parse(JSON.stringify(this.model));
    this.dbRef
      .collection("locations")
      .add(param)
      .then(_ => alert("Yay, you just added " + this.currentTitle));
    this.form.reset();
    this.currentWheelChair = false;
    this.currentChild = false;
    this.currentCheap = false;
    this.currentFree = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      summary: new FormControl(null, { validators: [Validators.required] }),
      type: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      created: new FormControl(new Date(), {
        validators: [Validators.required]
      }),
      thumbnail: new FormControl(null, { validators: [Validators.required] }),
      latitude: new FormControl(null, { validators: [Validators.required] }),
      longitude: new FormControl(null, { validators: [Validators.required] })
    });
  }
}
