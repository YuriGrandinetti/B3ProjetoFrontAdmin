import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefasAdminComponent } from './tarefas-admin.component';

describe('TarefasAdminComponent', () => {
  let component: TarefasAdminComponent;
  let fixture: ComponentFixture<TarefasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
