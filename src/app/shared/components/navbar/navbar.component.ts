import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
interface Item {
  label: string;
  routerLink: string;
}
@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public isOpenNavbar = signal<boolean>(false);

  public menuItem = signal<Item[]>([
    {
      label: 'Medicamentos',
      routerLink: 'medicamentos',
    },
    {
      label: 'Citas',
      routerLink: 'citas',
    },
    {
      label: 'Perfil',
      routerLink: 'perfil',
    },
  ]);

  toggleMenu(): void {
    this.isOpenNavbar.set(!this.isOpenNavbar());
  }
}
