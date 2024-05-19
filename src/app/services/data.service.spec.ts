import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './covid.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all departments', () => {
    const dummyData = [{ nom_territorio: 'Territory1', a_o: 2020, cantidad_dosis_aplicadas: 1000 }];
    
    service.getAllDepartamentos().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should retrieve filtered departments', () => {
    const dummyData = [{ nom_territorio: 'Territory1', a_o: 2020, cantidad_dosis_aplicadas: 1000 }];
    const departamento = 'Territory1';

    service.getDepartamentos(departamento).subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?departamento=${departamento}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
