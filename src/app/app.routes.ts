import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TrocaDevolucaoComponent } from './pages/troca-devolucao/troca-devolucao.component';
import { FreteComponent } from './pages/frete/frete.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { TermosusoComponent } from './pages/termosuso/termosuso.component';
import { PerguntasComponent } from './pages/perguntas/perguntas.component';
import { SobreComponent } from './pages/sobre/sobre.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Lala Store VIP' },
  { path: 'catalogo/:brand/:catalog', component: CatalogComponent, title: 'Lala Store VIP' },
  { path: 'produto/:id', component: ProductDetailComponent, title: 'Lala Store VIP' },
  { path: 'carrinho', component: CartComponent, title: 'Lala Store VIP' },
  { path: 'admin', component: AdminComponent, title: 'Lala Store VIP' },
  { path: 'troca-devolucao', component: TrocaDevolucaoComponent, title: 'Lala Store VIP'},
  { path: 'termosuso', component: TermosusoComponent, title: 'Lala Store VIP'},
  { path: 'frete', component: FreteComponent, title: 'Lala Store VIP'},
  { path: 'pagamento', component: PagamentoComponent, title: 'Lala Store VIP'},
  { path: 'perguntas', component: PerguntasComponent, title: 'Lala Store VIP'},
  { path: 'sobre', component: SobreComponent, title: 'Lala Store VIP'},
  { path: '**', redirectTo: '' }
];