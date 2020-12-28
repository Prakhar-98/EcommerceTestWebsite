import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Output() public price = new EventEmitter<{max:number, min:number}>(); 
  @Output()
  sortChanged: EventEmitter<number> =new EventEmitter<number>();
  minimumPrice:number;
  maximumPrice:number;
  sortValue:number;
  constructor() { }

  ngOnInit(): void {
    this.minimumPrice=0;
    this.maximumPrice=1000000;
  }
  filterPrice()
  {
    this.price.emit({max:this.maximumPrice,min:this.minimumPrice});
  }
  sort()
  {
    this.sortChanged.emit(this.sortValue);
  }

}