
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';



@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})


export class EditTrip implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';
  TripData: any;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}


    ngOnInit() : void{
      this.submitted = true;

      if (this.editForm.invalid) {
        return;
      }
      }

      get f() {
        return this.editForm.controls;
      }


      onSubmit(): void {
        this.submitted = true;

        if (this.editForm.invalid) {
          return;
      }


      

      

      console.log(this.editForm.value);

  // call your update service here if needed



// Retrieve stashed trip ID
      let tripCode = localStorage.getItem("tripCode");
      if (!tripCode) {
        alert("Something wrong, couldn't find where I stashed tripCode!");
        this.router.navigate(['']);
        return;
      }
      console.log('EditTripComponent::ngOnInit');
      console.log('tripcode:' + tripCode);

      this.editForm = this.formBuilder.group({
        _id: [],
        code: [tripCode, Validators.required],
        name: ['', Validators.required],
        length: ['', Validators.required],
        start: ['', Validators.required],
        resort: ['', Validators.required],
        perPerson: ['', Validators.required],
        image: ['', Validators.required],
        description: ['', Validators.required]
      })
      this.TripData.getTrip(tripCode)
        .subscribe({
          next: (value: any) => {
            this.trip = value;
            // Populate our record into the form
            this.editForm.patchValue(value[0]);
            if(!value)
            {
            this.message = 'No Trip Retrieved!';
            }
            else{
              this.message = 'Trip: ' + tripCode + ' retrieved';
            }
            console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }
}


