import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreInitializationService } from 'src/shared/services';

describe('AppComponent', () => {
  let componentUnderTest: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let storeInitializationService: StoreInitializationService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [AppComponent],
        providers: [
          { provide: StoreInitializationService, useValue: {} },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    componentUnderTest = fixture.componentInstance;

    storeInitializationService = TestBed.inject(StoreInitializationService);
    storeInitializationService.initializeStore = jasmine.createSpy('initializeStore');
  });

  it('should create an instance of the component', () => {
    // Arrange
    // Act
    // Assert
    expect(componentUnderTest).toBeTruthy();
  });

  describe('template', () => {
    it('should render the header', async () => {
      // Arrange
      // Act
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      const header = fixture.debugElement.query(By.css('.header'));

      // Assert
      expect(header).toBeTruthy();
    });
  });
});
