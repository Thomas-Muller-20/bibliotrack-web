import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WishlistEditComponent } from './wishlist-edit.component'

describe('WishlistEditComponent', () => {
  let component: WishlistEditComponent
  let fixture: ComponentFixture<WishlistEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistEditComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(WishlistEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
