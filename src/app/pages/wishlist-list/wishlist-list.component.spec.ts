import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WishlistListComponent } from './wishlist-list.component'

describe('WishlistListComponent', () => {
  let component: WishlistListComponent
  let fixture: ComponentFixture<WishlistListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistListComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(WishlistListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
