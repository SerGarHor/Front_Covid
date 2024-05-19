import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/covid.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataService: DataService;
  const dummyData = [{ nom_territorio: 'Territory1', a_o: 2020, cantidad_dosis_aplicadas: 1000 }];

  beforeEach(async () => {
    const dataServiceMock = {
      getAllDepartamentos: jest.fn().mockReturnValue(of(dummyData)),
      getDepartamentos: jest.fn().mockReturnValue(of(dummyData))
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: DataService, useValue: dataServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load all departments on init', () => {
    expect(component.departamentos.length).toBe(1);
    expect(component.departamentos).toEqual(dummyData);
  });

  it('should filter departments based on input', () => {
    component.departamentoInput = 'Territory1';
    component.buscarDepartamentos();
    fixture.detectChanges();

    expect(dataService.getDepartamentos).toHaveBeenCalledWith('Territory1');
    expect(component.departamentos.length).toBe(1);
    expect(component.departamentos).toEqual(dummyData);
  });
});
