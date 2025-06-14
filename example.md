# Rule: Domain models must extend Serializable

## Description

All models in `domain/{module}/models` must extend `Serializable` from `ts-serializable` to ensure consistent serialization/deserialization.

Applies to @\*model.ts

```ts
// ✅ Good
export class School extends Serializable {
  @JsonProperty()
  id: string;

  @JsonProperty()
  name: string;
}

// ❌ Bad
export class School {
  id: string;
  name: string;
}
```

---

# Rule: Repository interfaces must be abstract classes returning Observables

## Description

Repository interfaces in `domain/{module}/repositories` must be defined as abstract classes with methods returning Observable<T>.

Applies to @\*Repository.ts

```ts
// ✅ Good
export abstract class OrderRepository {
  abstract getAll(): Observable<Order[]>;
  abstract getById(id: string): Observable<Order | null>;
  abstract create(order: CreateOrderDTO): Observable<Order>;
}

// ❌ Bad
export interface OrderRepository {
  getAll(): Promise<Order[]>;
}
```

---

# Rule: Service implementations must use DI decorators

## Description

Services in `infra/{module}/services` must:

- Implement a domain repository interface
- Use `@injectable()` decorator from tsyringe
- Follow the naming convention: `[Entity].service.repository.ts`

Applies to @\*.service.repository.ts

```ts
// ✅ Good
@injectable()
export class OrderServiceRepository implements OrderRepository {
  constructor(@inject("HttpClient") private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return from(this.http.get("/orders")).pipe(
      map((response) => response.data.map((item) => new Order().fromJSON(item)))
    );
  }
}

// ❌ Bad
export class OrderService implements OrderRepository {
  private http = new HttpClient();

  async getAll() {
    return await this.http.get("/orders");
  }
}
```

---

# Rule: infra hooks must use TanStack Query patterns

## Description

Hooks in `infra/{module}/hooks` must:

- Use TanStack Query hooks (`useQuery`, `useMutation`, `useQueryClient`)
- Resolve use cases with `container.resolve()`
- Handle query invalidation properly
- Follow consistent naming convention `use[Action][Entity]`

Applies to @use\*.ts

```ts
// ✅ Good
export const useGetOrders = () => {
  const useCase = container.resolve(GetOrdersUseCase);

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => lastValueFrom(useCase.execute()),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const useCase = container.resolve(CreateOrderUseCase);

  return useMutation({
    mutationFn: (order: CreateOrderDTO) =>
      lastValueFrom(useCase.execute(order)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// ❌ Bad
export const useOrderActions = () => {
  const getOrders = () => fetch("/api/orders");
  const createOrder = (order) =>
    fetch("/api/orders", { method: "POST", body: JSON.stringify(order) });

  return { getOrders, createOrder };
};
```

---

# Rule: One hook per use case

## Description

Each use case must have a dedicated hook with a single responsibility:

- Query hooks should use `useQuery`
- Mutation hooks should use `useMutation`
- The hook must resolve exactly one use case
- The hook name must follow the format `use[Action][Entity]`

Applies to @use\*.ts

```ts
// ✅ Good
export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  const useCase = container.resolve(CreateRestaurantUseCase);

  return useMutation({
    mutationFn: (input: CreateRestaurantDTO) =>
      lastValueFrom(useCase.execute(input)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

// ❌ Bad (contains logic for multiple use cases)
export const useRestaurantActions = () => {
  const createUseCase = container.resolve(CreateRestaurantUseCase);
  const updateUseCase = container.resolve(UpdateRestaurantUseCase);

  const create = useMutation({ mutationFn: createUseCase.execute });
  const update = useMutation({ mutationFn: updateUseCase.execute });

  return { create, update };
};
```

---

# Rule: Modular infra folder structure

## Description

Each module under `infra/` must maintain its own folder structure:

- `infra/{module}/services/` for repository implementations
- `infra/{module}/hooks/` for TanStack Query hooks
- `infra/{module}/mocks/` for mock implementations

File organization must mirror the domain structure, with consistent naming patterns.

Applies to infra folder

```
// ✅ Good
infra/
  restaurant/
    services/
      restaurant.service.repository.ts
    hooks/
      use_get_restaurants.ts
      use_create_restaurant.ts
    mocks/
      restaurant.mock.repository.ts
  order/
    services/
      order.service.repository.ts
    hooks/
      use_get_orders.ts
      use_create_order.ts
    mocks/
      order.mock.repository.ts

// ❌ Bad
infra/
  services/
    restaurant_service.ts
    order_service.ts
  hooks/
    restaurant_hooks.ts
    order_hooks.ts
```

---

# Rule: Presentation layer organization

## Description

The `presentation/` layer must follow this structure:

- `components/` for reusable UI components
- `pages/authenticate/` for protected routes
- `pages/unauthenticate/` for public routes
- `hooks/` for UI-specific hooks
- `libs/` for UI utilities and helpers
- `assets/` for static resources

Applies to presentation folder

```
// ✅ Good
presentation/
  components/
    Button/
    Card/
  pages/
    authenticate/
      RestaurantsPage/
      OrdersPage/
    unauthenticate/
      LoginPage/
      RegisterPage/
  hooks/
    use_form.ts
    use_navigation.ts
  libs/
    formatters.ts
  assets/
    icons/
    images/

// ❌ Bad
presentation/
  RestaurantsPage.tsx
  OrdersPage.tsx
  Button.tsx
  Card.tsx
```

---

# Rule: Mock repositories must follow naming convention

## Description

Mock repositories in `infra/{module}/mocks` must:

- Implement the same domain repository interface as their service counterparts
- Follow the naming convention: `[Entity].mock.repository.ts`
- Be used for testing and development environments

Applies to @\*.mock.repository.ts

```ts
// ✅ Good
@injectable()
export class OrderMockRepository implements OrderRepository {
  private orders: Order[] = [
    new Order().fromJSON({ id: "1", name: "Test Order", total: 100 }),
    new Order().fromJSON({ id: "2", name: "Another Order", total: 200 }),
  ];

  getAll(): Observable<Order[]> {
    return of(this.orders);
  }

  getById(id: string): Observable<Order | null> {
    const order = this.orders.find((o) => o.id === id);
    return of(order || null);
  }
}

// ❌ Bad
export class MockOrderRepo {
  data = [{ id: "1", name: "Test" }];

  async getAll() {
    return this.data;
  }
}
```

---

# Rule: Routes must use lazy loading

## Description

All pages in `routes.tsx` must use React's `lazy()` for code splitting:

- Each page must be loaded lazily
- Route definitions must include authentication status
- Routes must be organized by feature/module

Applies to @routes.tsx

```tsx
// ✅ Good
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "presentation/layouts/auth_layout";
import PublicLayout from "presentation/layouts/public_layout";

// Lazy-loaded pages
const LoginPage = lazy(
  () => import("presentation/pages/unauthenticate/login_page")
);
const RegisterPage = lazy(
  () => import("presentation/pages/unauthenticate/register_page")
);
const RestaurantsPage = lazy(
  () => import("presentation/pages/authenticate/restaurants_page")
);
const OrdersPage = lazy(
  () => import("presentation/pages/authenticate/orders_page")
);

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/restaurants", element: <RestaurantsPage /> },
      { path: "/orders", element: <OrdersPage /> },
    ],
  },
]);

// ❌ Bad
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login_page";
import RestaurantsPage from "../pages/restaurants_page";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/restaurants", element: <RestaurantsPage /> },
]);
```

---

# Rule: Use cases must follow DI pattern

## Description

Use cases in `domain/{module}/usecases` must:

- Use the `@injectable()` and `@registry()` decorators
- Register corresponding service repository implementation
- Accept dependencies via constructor injection with `@inject`
- Follow a single responsibility pattern
- Return Promise<T> or Observable<T>

Applies to @\*UseCase.ts

```ts
// ✅ Good
@injectable()
@registry([
  {
    token: "AcademicAttendanceRepository",
    useClass: AcademicAttendanceServiceRepository,
  },
])
export class CreateAcademicAttendanceUseCase {
  constructor(
    @inject("AcademicAttendanceRepository")
    private readonly repository: AcademicAttendanceRepository
  ) {}

  execute(params: Partial<AcademicAttendance>): Promise<AcademicAttendance> {
    return this.repository.create(params);
  }
}

// ❌ Bad
export class RestaurantUseCase {
  private repository = new RestaurantService();

  create(restaurant) {
    return this.repository.create(restaurant);
  }

  update(id, data) {
    return this.repository.update(id, data);
  }
}
```

---

# Rule: Consistent file naming convention

## Description

Use consistent naming patterns across the project:

- `snake_case` for all file names
- `PascalCase` for classes, interfaces, types, and React components
- `camelCase` for variables, functions, and methods
- Files should be named after their primary export

Applies to all files

```
// ✅ Good
// File: order_repository.ts
export abstract class OrderRepository { ... }

// File: use_create_order.ts
export const useCreateOrder = () => { ... }

// File: order_page.tsx
export default function OrderPage() { ... }

// ❌ Bad
// File: OrderRepository.ts
export abstract class OrderRepository { ... }

// File: createOrder.ts
export const useCreateOrder = () => { ... }

// File: Orders.tsx
export default function OrderPage() { ... }
```

---

# Rule: DTOs must be defined in domain layer

## Description

Data Transfer Objects (DTOs) must be:

- Defined in `domain/{module}/dtos/`
- Used to validate and transform data
- Named with descriptive action prefixes

Applies to @\*DTO.ts

```ts
// ✅ Good
// File: domain/restaurant/dtos/create_restaurant_dto.ts
export class CreateRestaurantDTO {
  name: string;
  address: string;
  contactPhone: string;

  static validate(data: unknown): data is CreateRestaurantDTO {
    // Validation logic
    return true;
  }
}

// ❌ Bad
// File: infra/restaurant/types.ts
export type RestaurantInput = {
  name: string;
  address: string;
  phone: string;
};
```

---

# Rule: Observables must be consistently handled

## Description

When working with Observables:

- Use appropriate RxJS operators
- Convert to Promise only at the boundary (infra hooks)
- Use `lastValueFrom` instead of `.toPromise()`
- Handle errors appropriately

Applies to all files using Observables

```ts
// ✅ Good
// In service
getOrders(): Observable<Order[]> {
  return this.http.get('/orders').pipe(
    map(response => response.data.map(item => new Order().fromJSON(item))),
    catchError(error => {
      console.error('Failed to fetch orders', error);
      return of([]);
    })
  );
}

// In hook
export const useGetOrders = () => {
  const useCase = container.resolve(GetOrdersUseCase);

  return useQuery({
    queryKey: ['orders'],
    queryFn: () => lastValueFrom(useCase.execute()),
  });
};

// ❌ Bad
// In service
async getOrders() {
  try {
    const response = await this.http.get('/orders');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// In hook
export const useGetOrders = () => {
  const useCase = container.resolve(GetOrdersUseCase);

  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => useCase.execute().toPromise(),
  });
};

```
