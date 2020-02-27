import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from "../models/location";
import { Report } from "../models/report";
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
  report: Report;
  currentTitle: string;
  currentType: string;
  currentSummary: string;
  currentCreated: number;
  currentWheelChair = false;
  currentChild = false;
  currentCheap = false;
  currentFree = false;
  currentBookInAdvance = false;
  currentThumbnail: string;
  currentLatitude: number;
  currentLongitude: number;
  currentParagraphs: string[];
  currentImageURLs: string[];
  currentReportID: string;

  constructor(private db: AngularFirestore) {
    this.dbRef = db;
  }

  async onSaveLocation() {
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
    this.currentParagraphs = this.form.value.paragraphs.split(/\n/);
    this.currentImageURLs = this.form.value.imageURLs.split(/\s/);

    this.report = {
      paragraphs: this.currentParagraphs,
      slideshowURLs: this.currentImageURLs
    };

    const reportJSON = JSON.parse(JSON.stringify(this.report));
    
    const docRef = await this.dbRef
      .collection("reports")
      .add(reportJSON);

    this.currentReportID = docRef.id;

    this.model = {
      name: this.currentTitle,
      placeType: this.currentType,
      summary: this.currentSummary,
      yearOpened: this.currentCreated,
      wheelChairAccessible: this.currentWheelChair,
      childFriendly: this.currentChild,
      cheapEntry: this.currentCheap,
      freeEntry: this.currentFree,
      bookInAdvance: this.currentBookInAdvance,
      thumbnail: this.currentThumbnail,
      latitude: this.currentLatitude,
      longitude: this.currentLongitude,
      likes: 0,
      reportID: this.currentReportID
    };

    const locationJSON = JSON.parse(JSON.stringify(this.model));

    await this.dbRef
      .collection("locations")
      .add(locationJSON);

    alert(`Yay you added ${this.currentTitle} with report ID: ${this.currentReportID} !`);


    this.form.reset();
    this.currentWheelChair = false;
    this.currentChild = false;
    this.currentCheap = false;
    this.currentFree = false;
    this.currentBookInAdvance = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          this.noWhitespaceValidator
        ]
      }),
      summary: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(20),
          this.noWhitespaceValidator
        ]
      }),
      type: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          this.noWhitespaceValidator
        ]
      }),
      created: new FormControl(null, {
        validators: [Validators.required]
      }),
      thumbnail: new FormControl(null, {
        validators: [Validators.required, this.noWhitespaceValidator]
      }),
      paragraphs: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(20),
          this.noWhitespaceValidator
        ]
      }),
      imageURLs: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          this.noWhitespaceValidator
        ]
      }),
      latitude: new FormControl(null, {
        validators: [Validators.required, this.noWhitespaceValidator]
      }),
      longitude: new FormControl(null, {
        validators: [Validators.required, this.noWhitespaceValidator]
      })
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
