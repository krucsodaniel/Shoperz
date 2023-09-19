import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let componentUnderTest: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    componentUnderTest = fixture.componentInstance;
  });

  it('should create an instance of the component', () => {
    // Arrange
    // Act
    // Assert
    expect(componentUnderTest).toBeTruthy();
  });

  describe('template', () => {
    it('should render the navigation bar', async () => {
      // Arrange
      // Act
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      const navbar = fixture.debugElement.query(By.css('.navbar'));

      // Assert
      expect(navbar).toBeTruthy();
    });

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
