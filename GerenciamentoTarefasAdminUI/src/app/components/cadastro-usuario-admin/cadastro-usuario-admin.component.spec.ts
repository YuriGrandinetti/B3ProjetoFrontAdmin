import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUsuarioAdminComponent } from './cadastro-usuario-admin.component';

describe('CadastroUsuarioAdminComponent', () => {
  let component: CadastroUsuarioAdminComponent;
  let fixture: ComponentFixture<CadastroUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUsuarioAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
